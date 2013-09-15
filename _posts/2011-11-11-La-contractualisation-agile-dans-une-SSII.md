---
layout: post
title: La contractualisation agile dans une SSII
author: gvincent
lang: fr
tags: contractualisation, SSII
---

Rien qu’en lisant le titre, je fais la grimace.
Le contrat a été inventé pour se prémunir des tentatives d’un des deux partis pour exploiter l’autre.
Et c’est un outil indispensable dans n’importe quel projet informatique.


<!--more-->

Dans ce billet j’essaye de répondre à la problématique suivante :

> Comment aujourd’hui une société de service peut-elle faire de l’agilité sur un projet au forfait avec un engagement de résultat ?

Douloureux comme problématique ! Pour simplifier le contexte, je me place dans le cas concret où un client effectue un appel d’offre et la société de service envoie une proposition technique et financière. Généralement le contrat essaye de fixer les délais, les coûts, le périmètre fonctionnel du projet. C’est pour cette raison que souvent, on s’appuie sur le cahier des charges pour valider le contrat.

Engagement de résultat implique une notion de «  terminée  » du point de vue du client. Le client attend une proposition pour réaliser « l’ensemble  » des fonctionnalités du produit décrites dans le cahier des charges. Il s’attend par la même occasion à ce que le produit final comporte aussi l’ensemble des fonctionnalités énoncées dans le besoin initial.

<center>
	<img src="https://lh4.googleusercontent.com/-508LddosWQU/Trw4QZNiYiI/AAAAAAAABdY/OJnphuBI2r4/s800/un-pilote-dans-lavion.jpg">
</center>

De plus une prestation au « forfait » nous retire toute possibilité de pilotage. L’ajustement en fonction de l’évolution du projet sur le terrain est impossible. Nous savons que nous avons les mains liées, mais nous continuons à nous engager. Le prix de la prestation augmente.

Vous l’aurez compris tout le monde est perdant!

###S’adapter au changement

L’objectif de la contractualisation est de proposer une réponse qui prenne en compte ce « changement » tout en assurant au client que ce qu’il demande sera bien réalisé !
Ne jamais s’engager sur un nombre de fonctionnalité ! Mais engagez-vous sur un volume d’unité d’oeuvre<sup>1</sup>. C’est assez simple comme idée. En fonction du cahier des charges, listez les fonctionnalités. Morceler l’ensemble de ces objectifs fonctionnels pour en extraire les users stories. Effectuez l’évaluation avec une équipe transverse du coût d’une user storie. Avec la matrice ainsi générée vous pouvez piloter votre projet de manière simple. Vous transformez le poids d’une storie en jour homme ou toute autre unité que vous utilisez.
Vous vous engagez à livrer à la fin de chaque sprint un produit fonctionnel<sup>2</sup>. Vous explicitez que le client doit en contrepartie s’engager à faire un retour d’expérience sur le produit à la même fréquence.

###Les craintes du client

<div style="float: right; margin:10px;"><img src="https://lh3.googleusercontent.com/-YnQ7QAvEjZE/Trw4NL7S8OI/AAAAAAAABco/tJk8GVaw94E/s400/client-e%25CC%2581tonne%25CC%2581.jpg" width="180"></div>

La principale crainte du client devient alors la sur-évaluation d’une storie. Les échanges et la collaboration client fournisseur prennent tout leur sens. Si ce point est très bloquant vous pouvez envisager un planning poker chez le client.
Essayer le contrat 50/50. Vous paliez ainsi aux craintes liées au retard éventuel d’un projet et aux craintes de la sur-évaluation du volume utile pour réaliser le produit. En fonction du projet vous pouvez découper le paiement du projet en X fois. Ce qui correspond à un paiement toute les *Y* itérations<sup>3</sup>.

Pour rassurer un client qui débute dans l’agilité vous pouvez rajouter ces points là  :

*   La possibilité pour un client d’arrêter les frais après n’importe Y* itérations et récupérer ce qui a déjà été réalisé.
*   A la fin de chaque sprint vous envoyez les indicateurs du suivi du projet (burdown chart, taux de couverture du code).
*   A la fin de chaque sprint chaque partie analyse la vitesse d’exécution du projet et discute sur les améliorations à apporter.

Les mentalités ne changeront pas, si nous ne changeons pas !

1. Unité d’œuvre, poids d’une User Storie ça n’a pas d’importance. L’objectif est bien de rattacher une fonctionnalité à une unité pour rendre le pilotage plus facile.
2. Oncle Bob estime que c’est la principale raison d’un échec lors de l’utilisation de l’agilité : ne pas produire de manière continue, un logiciel qui fonctionne !
3. Y = Durée du projet / ( X * Durée Itération)