---
layout: post
title: Copier le contenu d'une liste en python
author: gvincent
lang: fr
tags: astuce python
---

Quand j'ai commencé à coder en python, j'ai passé un peu de temps sur des problèmes de copies de listes.
Je veux trouver un moyen simple de copier le contenu d'une liste dans une autre et pas leurs références.



```console
$ python
Python 2.7.2+ (default, Oct  4 2011, 20:06:09)
...
>>> a = ["1", "2", "3"]
>>> b = a
>>> a[2] = "4"
>>> b[2]
'4'
```


b\[2] me retourne la valeur 4 alors que je voulais la valeur 2. Quand je fais b = a je copie les **références**.
L'objet liste \["1","2","3"] n'est pas dupliquée en mémoire.
Pour être sur, il suffit de lancer la commande id( ) qui donne l'id de l'objet passé en paramètre.


```console
>>> id(a) == id(b)
true
```


b et a pointent vers le même objet liste.

J'ai cherché une manière « pythonique » de copier le contenu d'une liste dans une autre.
Et j'aime beaucoup la manière suivante :


```console
b = list(a)
```


list() est le constructeur d'une liste. La fonction vient créer une nouvelle liste avec la séquence passée en paramètre. Elle construit une nouvelle liste.


```console
>>> id(a) == id(b)
false
```


Avant j'utilisais b = a\[:] que je trouve moins explicite que b = list(a)


