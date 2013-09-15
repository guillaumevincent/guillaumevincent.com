---
layout: post
title: Le double planning poker
author: gvincent
lang: fr
tags: astuce, scrum
---
J’ai longtemps mal compris le rôle du planning poker, aujourd’hui je vous propose une vision un peu novatrice de son utilisation : le double planning poker!

<!--more-->

<div style="float: right; margin:10px;"><img src="https://lh3.googleusercontent.com/-mz050MogDw4/TyPXWXcWMfI/AAAAAAAABrM/wFoLfx_cXnI/s800/images.jpg" alt="planning poker"></div>

L’intérêt du planning poker est normalement de trouver la vélocité de chaque user story du backlog produit. L’équipe SCRUM au complet se réunit et passe en revue l’ensemble des user stories pour être sûr que tout le monde est d’accord sur la difficulté de la tâche à réaliser. Généralement l’ensemble des participants possèdent un certain nombre de cartes, toutes ayant un numéro correspondant à la suite de Fibonacci (0, 1, 2, 3, 5, 8, 13, 20, 40, 100)<sup>1</sup>. Une fois la fonctionnalité expliquée, chaque participant estime l’effort nécessaire à l’équipe pour produire cette fonctionnalité. C’est un effort relatif : ce chiffre n’a pas d’unité et n’a de sens qu’en comparaison avec d’autres fonctionnalités<sup>2</sup>.

Maintenant je donne l’idée d’une deuxième utilisation possible du planning poker. Facilitons la prise de décision parfois difficile coté client et évitons le changement en excès. Le planning poker devient un outil pour prioriser les fonctionnalités du backlog produit. Equipés d’un jeu de cartes pour le planning poker, le  product owner et le client se réunissent autour d’une table et reprennent l’ensemble des user story du backlog produit. Ils cherchent à définir l’ordre de priorité des fonctionnalités. C’est très utile quand le client a du mal à spécifier son besoin et/ou que les premiers sprints sont soumis à trop de changements. Si ça gène la vélocité moyenne de l’équipe de développement (changement architecturaux, changement techniques, etc..) alors il faut freiner l’élan du client. Attention je ne dis pas qu’il faut fixer le besoin ! Mais ça permet à l’équipe de développement d’avancer et surtout au product owner d’avoir une meilleure « Vision Produit ». Je pense que l’utilisation de cette méthode est intéressante avec des clients qui ne connaissent pas bien les concepts agiles.

Pour aller plus loin :
Quel outil choisir pour un planning poker


1. La suite de Fibonacci est meilleure qu’une suite linéaire, car elle permet d’accélérer la prise de décision. En effet quand on cherche à estimer la valeur d’une fonctionnalité dans un gros projet, il est difficile d’éviter l’incertitude de l’estimation. Si vous prenez la suite linéaire suivante : 0,1,2,3,4,5,6,7,8,9,10 et que votre équipe fait ressortir une vélocité allant de 6 à 9, pour la user story une et 5 à 8, pour la user story deux alors vous serez dans l’obligation de débattre pour savoir laquelle est plus importante. Avec la suite de Fibonacci votre équipe aurait défini une vélocité de 40 et donc la décision aurait été plus rapide. De plus avec une suite de Fibonacci, la représentation d’une estimation est plus représentative de l’importance des fonctionnalités entre elle.

2. Certains chefs de projet, pour des raisons purement pratiques, convertissent ses points de vélocité en jour/homme en multipliant le chiffre par un coefficient qui leur va bien. Vous l’aurez compris la vélocité n’a pas d’unité. Elle représente un effort.

