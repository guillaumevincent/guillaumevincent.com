---
layout: post
lang: fr
title: Git, un puissant système de gestion de version
author: gvincent
tags: git, commit
---

Git est un outil de gestion de version, très puissant, extrêmement rapide et qui souffre d’une certaine complexité.
Mais c’est cette complexité qui en fait sa force !

> Je ne m’attendais pas vraiment à ce que quiconque utilise Git parce que c’est tellement dur à utiliser,
mais finalement cela s’est révélé être son principal attrait - Linus Torvalds

<!--more-->

<p class="bg-warning">
Disclaimer: Ce billet regroupe mes notes sur Git que j'ai créé depuis quelques années. Ce n'est ni un tutoriel,
ni une bible. Juste une sorte de fourre tout, un peu mal rangé de mes notes.
</p>



# Menu

  * [Comprendre Git](#understand_git)
    * [Un outil décentralisé](#decentralized)
  * [Récupérer une branche distante](#get_remote_branch)
  * [Annuler les x derniers commit](#x_derniers_commits)

# Comprendre Git <a name="understand_git"></a>

## Un outil décentralisé <a name="decentralized"></a>

Git est un **outil de gestion décentralisé**. Cela signifie qu'une copie du code source d'une application est
située à plein d'endroits différents (sur les postes des développeurs, sur un serveur distant, etc).

> Chacun, sur son poste, possède **tout** le code source de l'application

Git va introduire cette notion de dépot de code distant et dépot de code local:

  * **repository** = dépot de code = un endroit où on met son code
  * **local repository** = **local** = dépot de code local, sur son poste
  * **remote** = éloigné = correspond à un dépot de code distant, sur un serveur


# Nettoie ton bordel <a name="x_derniers_commits"></a>

