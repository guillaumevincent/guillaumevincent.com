---
layout: post
lang: fr
title: Blogofile, Ovh et Amazon
author: gvincent
tags: 
  - hébergement
  - site web
---
Quand j'ai commencé à bloguer, j'utilisais Joomla puis très vite j'ai migré sur Wordpress.
Et j'ai eu ma claque des mises à jour à effectuer tous les trois mois sous peine d'avoir des failles béantes sur mon site internet.
Début janvier 2012, j'ai cherché une solution [KISS (Keep It Simple Sir)](http://en.wikipedia.org/wiki/KISS_principle).
<!--more-->

<blockquote>
Depuis peu je suis passé sous Jekyll et Github Page
</blockquote>


Grâce à [Sébastien Douche](http://twitter.com/sdouche) lors d'une conférence sur GIT, j'ai découvert [Blogofile](http://www.blogofile.com/). Blogofile est un système qui permet de créer un site statique simplement. J'écris des billets dans mon éditeur de texte favori. Je l'enregistre dans un dossier, je lance la génération automatique de mon site et je copie l'ensemble des fichiers générés sur mon hébergeur. Pas de base de données, seulement un hébergeur.

C'est aussi en janvier que j'ai dû me réabonner chez Ovh pour un ans.
Je possédais un nom de domaine principal **vincentguillaume.fr**, un nom de domaine secondaire **rolala.fr** ainsi qu'un espace de stockage proposé par Ovh (10 go).
En calculant simplement le coût pour héberger mon site statique d'un peu plus d'1 Mo je devais débourser environ 18€HT (12€Ht d'hébergement + 6€Ht / nom de domaine).

N'utilisant aucun service mis à part l'hébergement d'Ovh, j'ai décidé de chercher un autre hébergeur sur lequel je pouvais faire pointer mes deux noms de domaine.
J'ai choisi Amazon, car c'est gratuit pour héberger jusqu'à 1Go de données.
Amazon et son service [S3 (Amazon Simple Storage Service)](http://aws.amazon.com/fr/s3/) associé permet de créer des buckets (conteneurs) et mettre ce que l'on veut dedans.
Je peux par exemple transformer un bucket en site statique, autoriser l'accès en lecture et accéder à mon site depuis internet http://www.vincentguillaume.fr.s3-website-eu-west-1.amazonaws.com/.
Ensuite je fais pointer mon nom de domaine vers mon bucket.

La technique que j'ai utilisée et qui me satisfais complètement est la suivante:

*   se rendre sur sa [console Amazon](https://console.aws.amazon.com/s3) et nommer son bucket www.votre_nom_de_domaine.fr 
**bucket name: www.vincentguillaume.fr**

*   se rendre sur Ovh et rediriger son nom de domaine vers le sous domaine www associé 
**vincentguillaume.fr redirige vers www.vincentguillaume.fr** 

*   et rediriger (avec un CNAME) le sous domaine www.nom_de_domaine.fr vers le lien du site statique d'Amazon nom_de_mon_bucket.s3-website-eu-west-1.amazonaws.com

**www.vincentguillaume.fr CNAME www.vincentguillaume.fr.s3-website-eu-west-1.amazonaws.com**


Et le tour est joué.
J'ai donc économisé 50% cette année.

La prochaine étape est de transférer sur [Amazon Route](http://aws.amazon.com/fr/route53/) mes deux noms de domaine pour centraliser encore un peu plus mes services.
Et ensuite de réaliser un petit script python, qui vient push sur github le code du blog et mettre à jour le site sur Amazon.



