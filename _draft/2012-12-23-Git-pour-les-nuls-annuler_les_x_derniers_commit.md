---
layout: post
lang: fr
title: Git pour les nuls
author: gvincent
---

<h1>Git pour les nuls: Annuler les X derniers commits</h1>
<p>
Pour mes projets personnels j'utilise trois environnements de travail :
un environnement de développement sur lequel je viens tester des fonctionnalités 
un environnement de recette où je valide les modifications développées
un environnement de production

A la fin de chaque itération lors du développement de mon logiciel je produit une version améliorée de mon logiciel. Cette version que j'appelle souvent release-vX.X est toujours précédée d'une mise en recette pour valider que mon code ne va pas tout détruire en production.
Je me retrouve souvent dans l'obligation de faire des corrections mineures pour des erreurs de typographie ou des erreurs de configurations la plus part du temps.

Et dans mon cas je ne veux pas merger en production tous ces commits inutiles.
Il existe trois solutions sous Git pour "squash" les X derniers commits ou en français pour "écraser" les X derniers commits pour qu'ils n'en fassent plus qu'un:
</p>
<pre>
<code data-language="BashSessionLexer">
git rebase 
git merge --squash
git reset
</code>
</pre>
<p>
Je préfère la solution git reset plus intuitive à mon goût.
Premièrement on s'assure que notre environnement de travail ne comporte pas de modifications en cours:
</p>
<pre>
<code data-language="BashSessionLexer">
git status
# On branch master
nothing to commit, working directory clean
</code>
</pre>
<p>
Ensuite j'effectue un rebase pour écraser X commits. Dans mon exemple je veux me re-placer au niveau du tag soit 4 commits avant.
Je tappe donc la commande suivante:
</p>
<code data-language="BashSessionLexer">
git reset --soft HEAD~4
git commit -m "release v1.0"
</code>
</pre>













<h1>Git pour les nuls: Récupérer une branche distante</h1>
<p>Git est un outil de gestion de version, très puissant, extremement rapide et qui souffre d'une certaine complexité. Mais c'est cette complexité qui en fait ça force !</p>

<blockquote>Je ne m’attendais pas vraiment à ce que quiconque utilise Git parce que c’est tellement dur à utiliser, mais finalement cela s’est révélé être son principal attrait.
</blockquote>
#####Linus Torvalds

<p>
Ici je ne vais pas vous apprendre à créer un dépôt, ni même vous expliquer en détail le fonctionnement de git. Je vais juste vous aidez à comprendre <b>git rebase</b> et vous donner deux trois billes pour vous en sortir avec git.
<br>
J'intègre donc cette équipe de 3 développeurs :
<br>
<img src="https://lh3.googleusercontent.com/-OGfsg0M9MyE/UGMbm2Pw-II/AAAAAAAAH8g/VWRmr3i2oc0/s800/sarah.png">
<img src="https://lh5.googleusercontent.com/-6k81stu0mnQ/UGMbm-HiHqI/AAAAAAAAH8Y/5WoN1a8FLcg/s800/john.png">
<img src="https://lh4.googleusercontent.com/-V2CtKPOWTVI/UGMbm8pZMII/AAAAAAAAH8c/FTjHhJfHa0I/s800/bob.png">
<img src="https://lh5.googleusercontent.com/-ibZHrcf55aI/Trw4MFWgaFI/AAAAAAAABcM/IH_av_P8kjo/s144/162758_497024237864_704472864_5947491_7590183_n.jpg" width="124">
<br>
Sarah, John, Bob et moi.
<br>
Nous travaillons tous les quatre sur l'édition d'un site web et je rejoins l'équipe.
<br>
La première chose que l'on me demande de faire est de récupérer le code du projet. Notre projet est hébergé sur Github, j'ai les accès en lecture et en écriture au dépôt distant du code (dépot distant intitulé par défaut <b>origin</b>)
<br>
</p>

<pre>
<code data-language="BashSessionLexer">
git clone git@github.com:okiwi/atbdx.git atbdx
Cloning into 'atbdx'...
</code>
</pre>
<p>
Je viens de récupérer la branche principale du projet (commande: <b>clone</b>) sur mon poste et j'ai mis mon environnement de travail dans le dossier atbdx. Une seule branche a été clonée, la branche principale (par défaut cette branche s'appelle <b>master</b>).
Pour voir l'ensemble des branches du projet, vous pouvez tapper la commande suivante
</p>

<pre>
<code data-language="BashSessionLexer">
git branch
* master
</code>
</pre>
<p>
git branch m'indique que je n'ai sur mon poste en local qu'une seule branche intitulé master. Par défaut clone ne copie pas toutes les branches sur mon poste. Je dois lui préciser de récupérer une branche particulière depuis le dépôt distant. 
</p>

<pre>
<code data-language="BashSessionLexer">
git checkout -b dev origin/dev
Branch dev set up to track remote branch dev from origin.
Switched to a new branch 'dev'

git branch
* dev
  master
</code>
</pre>
<p>
<b>git checkout -b dev origin/dev</b> : créé moi une nouvelle branche locale intitulé dev qui est une copie d'une branche distante du dépôt origin. Et place toi sur la branche dev.
<br>
Première victoire, j'ai récupéré depuis le dépôt distant origin la branche de développement, et je peux maintenant travailler en local.
</p>




