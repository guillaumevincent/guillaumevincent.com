---
layout: post
lang: fr
title: Git pour les nuls - Annuler les x derniers commit
author: gvincent
tags: git, commit
---

<img src="https://lh4.googleusercontent.com/-Y-dQtb7aNbs/UNb2LIpJi7I/AAAAAAAAIMQ/_U2_lbjs0dk/s406/git%2520rebase%2520example.png">
<p>
Pour mes projets personnels j'utilise trois environnements de travail :
<ul>
	<li>un environnement de développement sur lequel je viens tester des fonctionnalités</li>
	<li>un environnement de recette où je valide les modifications développées</li>
	<li>un environnement de production</li>
</ul>

A la fin de chaque itération lors du développement de mon logiciel je produit une version améliorée de mon logiciel. Cette version que j'appelle souvent release-vX.X est toujours précédée d'une mise en recette pour valider que mon code ne va pas tout détruire en production.
Je me retrouve souvent dans l'obligation de faire des corrections mineures pour des erreurs de typographie ou des erreurs de configurations la plus part du temps.

Et dans mon cas je ne veux pas merger en production tous ces commits inutiles.
Il existe trois solutions sous Git pour "squash" les X derniers commits ou en français pour "écraser" les X derniers commits pour qu'ils n'en fassent plus qu'un:
</p>
<pre>
<div id="social" class="wrapper clearfix">
	<ul id="social_icon">
		<li id="panel1"><a id="twitter" href="" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=600');return false;"></a></li>
		<li id="panel2"><a id="googleplus" href="" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=600');return false;"></a></li>
		<li id="panel3"><a id="facebook" href="" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=600');return false;"></a></li>
	</ul>
</div>
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
<pre>
<code data-language="BashSessionLexer">
git reset --soft HEAD~4
git commit -m "release v1.0"
</code>
</pre>
<img src="https://lh4.googleusercontent.com/-hJev3pzvxdQ/UNb2LAF160I/AAAAAAAAIMQ/O72XSWO6kTI/s826/git%2520rebase%2520example2.png">

