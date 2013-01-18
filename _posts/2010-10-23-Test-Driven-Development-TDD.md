---
layout: post
title: Test Driven Development (TDD)
author: gvincent
lang: fr
---
<h1>Test Driven Development (TDD)</h1>
Dans ce tutoriel, je vous propose de comprendre le fonctionnement du TDD, appelé aussi développement piloté par les tests. J’ai essayé de le rendre le plus accessible possible. J’utilise une approche didactique, avec pas mal d’explications. Cette démarche est complétée par un deuxième tutoriel plus pratique, où je vous propose de venir essayer ce que je vous ai appris. Bonne lecture!

###Qu’est-ce que le TDD ?

C’est une pratique de développement beaucoup utilisé dans la réalisation de logiciels en informatique. C’est une méthode que les développeurs utilisent pour faire ressortir une sorte de patron de conception. TDD n’a rien avoir avec le test ou le développement à proprement parlé. C’est vraiment un motif de conception (une façon de faire) qui indique comment le développeur doit coder une application. C’est pour cette raison que le TDD est difficile à maitriser et à appréhender.
Dites ce que vous voulez, avant de le faire et ensuite assurer vous que ce que vous avez obtenu correspond bien à vos attentes. Cela permet de faire émerger de petits modèles de conception.

<blockquote><p>Un modèle de conception (appelé aussi design pattern) décrit un problème qui apparait encore et encore dans votre environnement de travail. Ensuite il explicite une solution que vous pourrez utiliser à chaque fois pour résoudre ce problème.</p></blockquote>

###Comment faire du TDD ?

C’est très facile à dire et moins facile à faire. Mais très simplement, vous réalisez un test qui échoue, un test qui définit clairement ce que vous voulez que votre code fasse. Donc je sais que je vais devoir écrire du code, donc la première chose que je dois me demander est : A quoi cela va-t-il ressembler ? Et pour mieux définir les choses on pourrait se dire : Comment je sais, que ce morceau de code que je suis en train d’écrire, fait bien ce que je veux qu’il fasse ? Vous savez que votre morceau de code fait bien ce que je veux si… et là vous listez l’ensemble des assertions possibles. Ou alors vous savez que votre objet doit être dans tel ou tel état, l’environnement autour de cet objet doit être de tel ou tel forme. L’objectif est de tester l’ensemble de ces cas. Donc vous décrivez cela dans un test formaté pour votre code. Votre code ne compile pas parce que votre fonctionnalité n’est pas implémentée. Ensuite vous réalisez le code le plus petit possible pour que votre code compile. Le test ne passe toujours pas mais votre programme compile ! Ensuite vous réalisez votre code pour que le test passe. Réalisez ce dernier avec le moins de lignes possibles, c’est important ! La dernière étape est une étape de refactoring ou l’on va chercher à améliorer son code (mise en place des commentaires, suppression des duplicatas, etc). Vous avez donc à suivre ce cheminement tout au long du développement d’une application et vous obtiendrez ce que vous souhaitez réellement. Un test après l’autre, en rajoutant toujours plus de tests à la suite.

Si on résume, vous réaliser un test qui anticipe ce que vous voulez coder. Vous vérifiez que le test échoue (et oui votre fonctionnalité n’est pas réalisée) et vous réalisez votre code pour que votre test devienne vert. Vous améliorez votre test une fois cette étape finie, pour le rendre plus élégant.

###Pourquoi le TDD ?

Là où c’est génial c’est que votre logiciel fait exactement ce que vous voulez qu’il fasse. L’architecture est volontairement plus petite, les objets ne font que ce qu’ils doivent faire. C’est l’essence même des designs patterns simples. Votre code est précis, élégant et on évite souvent des effets pervers comme la régression de code, des effets transverses comme les problèmes de maintenance, les effets de surcharge et la dette de code. J’aime bien cette métaphore qui dit que votre code n’est pas plaqué-or mais bien en or massif.

###L’architecture logicielle dans tout ça ?

Beaucoup pense qu’un logiciel développé avec TDD n’a pas besoin d’architecture. Ceci est faux et complètement idiot. L’intérêt du TDD vient du fait que l’on a besoin d’une architecture, complexe ou non, où la modularité est le maître mot. Les classes doivent comporter le moins d’interaction avec les autres. Et le TDD permet de faire évoluer son code en sûreté. Beaucoup de personnes s’entendent pour dire que l’architecture apparaît d’elle-même, il faut poser des bases simples et évolutives.

Le Test Driven Development (TDD) est le principal outil de l’artisan logiciel ! 
