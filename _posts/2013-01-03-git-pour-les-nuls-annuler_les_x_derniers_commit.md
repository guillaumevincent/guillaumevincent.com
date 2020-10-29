---
layout: post
lang: fr
title: Git pour les nuls - Annuler les x derniers commit
author: gvincent
tags: git commit
---

![10 derniers commit](/images/posts/git_rebase.png){:.img-responsive}

Pour mes projets personnels j'utilise trois environnements de travail :

- un environnement de développement sur lequel je viens tester des fonctionnalités
- un environnement de recette où je valide les modifications développées
- un environnement de production

A la fin de chaque itération lors du développement de mon logiciel je produit une version améliorée de mon
logiciel. Cette version est toujours précédée d'une mise en recette pour valider que mon code ne va pas tout
détruire en production. Je me retrouve souvent dans l'obligation de faire des corrections mineures pour des
erreurs de typographie ou des erreurs de configurations la plus part du temps.

Et dans mon cas je ne veux pas merger en production tous ces commits inutiles.
Il existe trois solutions sous Git pour "squash" les X derniers commits ou en français pour "écraser" les X derniers commits pour qu'ils n'en fassent plus qu'un:

```console
$ git rebase
$ git merge --squash
$ git reset
```

Je préfère la solution git reset plus intuitive à mon goût.
Premièrement on s'assure que notre environnement de travail ne comporte pas de modifications en cours:

```console
$ git status
# On branch master
nothing to commit, working directory clean
```

Ensuite j'effectue un rebase pour écraser X commits. Dans mon exemple je veux me re-placer au niveau du tag soit 4 commits avant.
Je tappe donc la commande suivante:

```console
$ git reset --soft HEAD~4
$ git commit -m "release v1.0"
```

![git reset](/images/posts/git_rebase2.png){:.img-responsive}
