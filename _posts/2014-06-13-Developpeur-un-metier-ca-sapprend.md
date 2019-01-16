---
layout: post
title: Développeur c’est un métier, et un métier ça s’apprend
author: gvincent
lang: fr
tags: tdd professionnalisme
---
Faire un logiciel c’est un métier, et un métier ça s’apprend ! Il faut du temps pour l’apprendre. Notre métier ne consiste pas à pondre des vues, réaliser des contrôleurs pour écrire dans des bases de données, et résoudre des bugs au débogueur. Non, ce n’est rien de tout ça !
Notre métier consiste à traduire une idée en du code. Deux choses complètement différentes.



D’après mon dictionnaire, une idée est une représentation abstraite, élaborée par la pensée, permettant d'être à l'origine d'une œuvre ou d'une invention originale.
Une idée change ! Elle évolue, elle mûrit. Pour faire correspondre mon code avec une idée, il va falloir en permanence le faire évoluer.  

Pour exagérer la métaphore, faire un logiciel c’est un peu comme tenter d’intercepter un missile balistique en plein vol !


![amélioration continue](/images/posts/amelioration_continue.png){:.img-responsive}

[image emmanuel chenu](http://emmanuelchenu.blogspot.fr/)

Comme c’est quelque chose de difficile, on va essayer plusieurs fois, on ne va pas réussir du premier coup, mais on espère qu’à chaque tentative on va se rapprocher de l’objectif. Donc dans notre métier le plus important est de pouvoir changer son code pour qu’il se rapproche de la cible (refactoring) et de s’assurer que ce changement ne casse rien (tests).

Ces concepts impliquent plusieurs choses :

 *  **un outil de gestion de version**, parce que améliorer un code à plusieurs ça demande de la synchronisation. Essaye de synchroniser ta trajectoire de ton missile en même temps que ton collègue. Si vous n'êtes pas synchronisés, si chacun effectue ces modifications en même temps, je doute que ton missile atteigne sa cible.
 *  **un IDE**. Arrête avec ton VIM ou (mettre_son_editeur_de_texte_favori). C’est bien VIM pour éditer du texte, c’est disponible sur un grand nombre de distributions. Mais pour faire du refactoring, rien de mieux qu’un IDE. Renommer une méthode, modifier des imports, trouver de la duplication, reformater ton code, extraire tes méthodes, lancer tes tests. Tu peux le faire avec VIM ? tant mieux, QUID du nouveau collègue quand il vient faire du pair programming avec toi ?
 *  **des tests** ! Tu dois impérativement t’assurer que ce que tu as réalisé, fonctionne. Quand je parle de tests, je parle de tests automatisables, réalisables par une machine. Si tu penses que tu n’as pas besoin de tests parce que tu fais du code qui fonctionne, sache qu’une, personne n’est infaillible et de deux tes collègues font peut-être plus d’erreurs que toi. **Le professionnalisme c’est de rendre son code maintenable**. Avoir un code dont le développement futur est garanti sans bug. Pour reprendre ma métaphore, le changement de paramètres dans l’algorithme de la trajectoire de ton missile doit prendre autant de temps maintenant que dans 2 ans. 

Les tests sont les éléments-clefs d’un bon logiciel. Ils permettent de donner un feedback immédiat sur ça marche, ou ça ne marche pas !
Le feedback immédiat ça implique une notion de temps. Lors du développement il est très important de savoir instantanément si ce que l’on est en train de réaliser ne casse pas ce que l’on a déjà produit. Donc ça sous-entend que l’on doit être capable de lancer les tests sur la machine de développement et pas d’attendre les résultats sur le serveur d’intégration continue.

Maintenant que tu as compris (j’espère) que les tests sont importants, parlons un peu des types de tests. On veut des tests rapides qui nous garantissent le bon fonctionnement de notre application, peu couplés au contexte. On appelle ça des tests unitaires. Tes tests selenium que tu préfères aux tests unitaires, ceux là, tu les abandonnes. Ils sont couteux en temps, et fortement couplés à ton interface. Chaque fois que tu modifies ton interface, tu dois modifier les tests, alors que le métier n’a pas forcement changé ! Par exemple tu réalises toujours le même appel à ton API, mais tu as modifié le workflow sur ta vue. En plus quand un test selenium casse, trouver l’origine du problème, c’est un peu comme chercher une fuite d’eau dans ta maison à travers le pommeau de douche! Le seul moment ou les tests selenium sont très utiles, c'est quand tu cherches à améliorer du code existant, sans test et dont les objets/fonctions sont privés et très peu accessibles.

Pour terminer quand est-ce que l’on doit réaliser les tests ?
Les tests, il y a plusieurs façons de les réaliser, avant de réaliser le code de production, ou après le code de production. D’expérience, réaliser les tests après, prends plus de temps que les réaliser avant. Son code de production est souvent moins facilement testable quand il n’est pas pensé pour être testé. Les raccourcis pris pendant le développement entrainent un temps plus long pour faire les tests ! Si tu rajoutes à ça la pression sur les épaules des développeurs pour développer plus vite, généralement les tests disparaissent, laissant un code de production sans protection !

Le développement piloté par les tests (ou TDD), est une méthode pour écrire des tests avant de réaliser son code de production. En plus de garantir que les tests sont présents, il a une particularité très méconnue: il facilite l’émergence d’architecture. Très souvent je ne sais pas comment développer une fonctionnalité. Ça m’arrive très très souvent ! TDD m’oblige à avancer un pas après l’autre. Et donc je me retrouve à trouver une solution pour mon problème beaucoup plus facilement. Comme si la solution émergeait d’elle-même. Cette décomposition du problème complexe en petites briques plus simples à réaliser peut s’obtenir sans TDD. Mais cette émergence presque évidente d'une solution me laisse toujours pantois.

Maintenant je ne force personne à utiliser TDD. Je sais quel développeur je deviens grâce aux tests et au TDD. 

Je me suis amélioré quand :

 *  j’ai passé plus de temps sur la troisième phase de TDD (refactoring) plutôt que sur le développement d’une fonctionnalité;
 *  j’ai diminué ma quantité de mocks dans mon code;
 *  j’ai passé plus de temps à améliorer le design, pour arriver à une implémentation qui me convenait !

J’ose m’imaginer qu’un bon développeur, qui fait correctement son métier, est quelqu’un qui maitrise le refactoring et le design et réalise des tests.

Alors si toi aussi tu remercies des divinités obscures pour avoir créé TDD, git, les outils jetbrains et les frameworks de tests xUnit, partage ce billet !
