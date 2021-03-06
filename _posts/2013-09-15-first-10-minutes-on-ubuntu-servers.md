---
layout: post
title: Mes 10 premières minutes sur un serveur
author: gvincent
lang: fr
tags: ubuntu serveur infrastructure
---

Quand j'installe un nouveau serveur dédié, j'utilise une petite documentation.
Je me suis dit qu'elle pourrait être utile. Je la partage donc avec vous.



### Installation des dernieres mises à jour

    sudo apt-get update
    sudo apt-get upgrade

Je renomme ma machine en éditant /etc/hostname, et je remplace le nom de l'ancienne machine.

    sudo vim /etc/hostname

Je change ou je rajoute la ligne

    127.0.0.1 NOM_DE_MA_NOUVELLE_MACHINE

dans le fichier /etc/hosts

    sudo vim /etc/hosts

Je redémarre

    sudo reboot


### Création utilisateur applicatif et accès au serveur

J'aime l'idée de créer un utilisateur dédié à une application avec des droits d'administrateur.
Souvent je me sers de cet utilisateur pour déployer et relancer mon application.
Cet utilisateur est le même quelque soit mon environnement (production, pré-production, recette).
L'accès à mon serveur n'est possible que sur le port 22 en ssh.
Les droits sudo pour cet utilisateur se font au travers d'un mot de passe long généré et sauvegardé dans [Keepassx](http://www.keepassx.org/)

Création d'un utilisateur applicatif

Pour ce tutoriel mon utilisateur s'appelle *deploy*

    sudo useradd deploy
    sudo mkdir /home/deploy
    sudo mkdir /home/deploy/.ssh
    sudo chmod 700 /home/deploy/.ssh

Libre à vous de remplacer deploy par le nom de votre choix (administrateur, deploiement, etc). J'aime l'idée de donner le nom de mon application à l'utilisateur qui lance cette application.

### Accès au serveur
Chaque développeur doit être capable de deployer l'application.
Pour limiter les droits aux développeurs, il existe un système simple qui consiste à ajouter l'ensemble des clefs ssh publiques des développeurs dans le fichier *authorized_keys* de notre utilisateur deploy.

    sudo vim /home/deploy/.ssh/authorized_keys
    chmod 400 /home/deploy/.ssh/authorized_keys
    chown deploy:deploy /home/deploy -R

l'intérêt de cette méthode, et que vous pouvez automatiser le deploiement d'un fichier maintenu à jour authorized_keys
qui vous garanti qu'aucun fantome n'a encore accès à votre application.

### Tester la connection
Depuis un autre poste dans un terminal tappez

    ssh deploy@ADRESSE_IP_DE_MON_SERVEUR

Si tout est ok alors vous pouvez ajouter un mot de passe long à votre nouvel utilisateur.

    sudo passwd deploy


### Droits administrateur
Il faut rajouter les droits sudo à notre utilisateur.

    sudo visudo

ajouter deploy  ALL=(ALL) ALL et sauvegardez (Ctrl-X, Shift-Y et taper ENTRER)

### Droits SSH
Je veux empécher les utilisateurs d'utiliser leurs mots de passe pour se connecter et interdire la connection *root*

    sudo vim /etc/ssh/sshd_config

    PermitRootLogin no
    PasswordAuthentication no

Pour que les modifications soit prises en compte, vous devez redémarer le service ssh

    sudo service ssh restart


### Configuration pour l'utilisateur

Changer le shell par défaut pour un nouvel utilisateur

    chsh -s /bin/bash deploy

Copier mon bashrc dans le home de mon utilisateur

    https://gist.github.com/guillaumevincent/b8f979d90686982ab442
