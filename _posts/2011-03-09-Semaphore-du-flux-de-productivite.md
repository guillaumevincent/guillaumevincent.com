---
layout: post
title: Sémaphore du flux de productivité
author: gvincent
lang: fr
tags: réflexion
---

Rachel Davies et Liz Sedley dans le livre « Coaching Agile » parlent d’améliorer le feedback sur l’état du build.

<!--more-->

<blockquote>
If the team makes the move to using a Continuous Integration server to run the build and let them know the test results, they won’t need a build token anymore
</blockquote>

<div style="float: right; margin:10px;"><img src="https://lh3.googleusercontent.com/-kX4-Uq0Ww0c/Trw4MfU1UNI/AAAAAAAABcw/16SyR8NYb_0/s400/agile_coaching_rds.jpg"></div>


Elle précise que si l’équipe se met à utiliser un serveur d’intégration continue pour exécuter le build et l’informer du résultat des tests, elle n’aura alors plus besoin d’un objet de build (ou jeton de build). Je ne suis pas d’accord avec cette idée. Je vois deux intérêts à ce que l’équipe continue à utiliser un sémaphore d’intégration même si elle utilise un serveur d’intégration continue.

Un sémaphore est un merveilleux indicateur du flux de productivité. Dans une pratique Lean un sémaphore qui ne circule pas signale un flux discontinu. Le premier intérêt est donc de permettre à une équipe de s’arrêter et d’aider l’acteur en difficulté à venir « pousser son code ». La plus grosse difficulté pour l’équipe est de se rendre compte, d’elle-même, que le jeton n’a pas beaucoup circulé. En parler lors de la réunion journalière est une très bonne idée.

L’autre intérêt de continuer à utiliser un sémaphore d’intégration est que son utilisation, outre le fait qu’elle fasse ressortir un problème de flux, montre que l’équipe commence à s’auto-organiser. Dans un processus difficile d’équipe auto-organisée, un sémaphore bloqué pendant une journée est très révélateur d’une mauvaise communication.
Pourquoi à un moment donné, un binôme se lève et essaye d’aider un autre binôme ? Est-ce que la fonctionnalité attendue est bloquante ? Ce transfert de ressource n’est pas naturel. L’encourager par des indicateurs comme le sémaphore de build est une excellente idée.

Pour poursuivre la lecture je vous conseille ce billet d’Emmanuel CHENU: <a href="http://emmanuelchenu.blogspot.com/2009/04/lintegration-continue-est-un-systeme.html">L’Intégration continue est un système multitache</a>

