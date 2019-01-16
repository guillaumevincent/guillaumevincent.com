---
layout: post
lang: fr
title: Git pour les nuls - Récupérer une branche distante
author: gvincent
tags: git remote
---


Git est un outil de gestion de version, très puissant, extremement rapide et qui souffre d'une certaine complexité.
Mais c'est cette complexité qui en fait ça force !

> Je ne m'attendais pas vraiment à ce que quiconque utilise Git parce que c'est tellement dur à utiliser,
> mais finalement cela s'est révélé être son principal attrait - **Linus Torvalds**



Ici je ne vais pas vous apprendre à créer un dépôt, ni même vous expliquer en détail le fonctionnement de git.
Je vais juste vous aidez à comprendre **git rebase** et vous donner deux trois billes pour vous en sortir avec cette commande.


J'intègre donc cette équipe de 3 développeurs :

![team](/images/posts/team.png){:.img-responsive}

Sarah, John, Bob et moi.

Nous travaillons tous les quatre sur l'édition d'un site web et je rejoins l'équipe.

La première chose que l'on me demande de faire est de récupérer le code du projet.
Notre projet est hébergé sur Github, j'ai les accès en lecture et en écriture au dépôt distant du code
(dépot distant intitulé par défaut **origin**)

```console
$ git clone git@github.com:okiwi/atbdx.git atbdx
Cloning into 'atbdx'...
```

Je viens de récupérer la branche principale du projet (commande: **clone**) sur mon poste et j'ai mis mon environnement de travail dans le dossier atbdx. Une seule branche a été clonée, la branche principale (par défaut cette branche s'appelle **master**).
Pour voir l'ensemble des branches du projet, vous pouvez tapper la commande suivante

```console
$ git branch
* master
```


git branch m'indique que je n'ai sur mon poste en local qu'une seule branche intitulé **master**.
Par défaut clone ne copie pas toutes les branches sur mon poste.
Je dois lui préciser de récupérer une branche particulière depuis le dépôt distant.


```console
$ git checkout -b dev origin/dev
Branch dev set up to track remote branch dev from origin.
Switched to a new branch 'dev'

$ git branch
* dev
master
```


**git checkout -b dev origin/dev** : créé moi une nouvelle branche locale intitulé dev qui est une copie d'une branche distante du dépôt origin.
Et place toi sur cette branche.


Première victoire, j'ai récupéré depuis le dépôt distant origin la branche de développement,
et je peux maintenant travailler en local.





