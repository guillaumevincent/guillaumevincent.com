---
layout: post
title: Coder en français ou coder en anglais ?
author: gvincent
lang: fr
tags: réflexion
---
<div style="float: right; margin-left:10px;"><img src="https://lh6.googleusercontent.com/-pxgLFrsiEd8/Trw4MPbB27I/AAAAAAAABcU/1kZJ2cYQSzQ/s800/476-150x150.jpg"></div>


Gros débat même au sein des développeurs de mon entreprise, faut-il coder en anglais ou en français?
Je ne sais pas si la question a de sens dans la mesure ou le contexte définit souvent la langue du code.
Mais si j'ai le choix, je pense que le code doit être en anglais pour les raisons suivantes :

<!--more-->

* les propriétés du langage sont difficiles à traduire, 
Les GET SET en java par exemple, entraine du franglais ou un code à rallonge.

* j'envisage de faire de l'offshore ou d'agrandir mon équipe.
Votre futur sous traitant ou votre prochaine recrue sera peut être étrangère. Reprendre une partie
de votre code sans le comprendre serait une catastrophe, une perte d'argent et de temps énorme.

* j'évite le franglais,
setCarColor est mieux que setCouleurVoiture non ? Quand il s'agit d'un mot difficile à traduire, ou bien impossible à traduire, alors je l'utilise tel quel. Exemple un objet DICOM propre au médical. DICOM n'a pas de traduction. Dans ce cas j'utilise l'agrégation de termes qui n'apparait pas comme du franglais et qui garde tout son sens (dicomObject, dicomFile, dicomName, etc…).

* les accents rajoutent des problèmes.
Il faut faire attention à l'encodage et certains langages n'acceptent pas les accents. validerMessageSupprime (au lieu de validerMessageSupprimé) devient moins clair que confirmDeletedMessage.

* le client veut voir le code, et en anglais il ne comprendra rien.
C'est la seule raison qui selon moi peut justifier l'utilisation du français dans le code. Mais j'aurai tendance à dire: chacun son métier. Toute la difficulté est de comprendre le langage du client (en termes métiers) et de le retranscrire dans notre langage. Il est très rare que le client mettent le nez dans le code. Et pour les quelques fois ou le client voudra une explication sur le code, un développeur sera en mesure de le faire.

* je ne réinvente pas la roue. Beaucoup de fonctions, d'api, de librairies existent en anglais, sont écrites et documentées en anglais. Je me vois mal lorsque je récupère un morceau de code, le traduire en français. Je le réutilise tel quel.

* je demande de l'aide, j'utilise stackoverflow. Et oui cela parait bête mais j'utilise de moins en moins les forums d'aide en français. Copier coller sur un forum anglais du code en français avec des questions en anglais entraine moins de réponses que si je fais l'effort de traduire. Essayez vous verrez. Depuis que je sais ça, et parce que j'utilise souvent ces médias, je m'efforce de réaliser un code propre en anglais qui ne nécessite pas de refactoring quand je veux demander de l'aide.

* quand ma fonctionnalité métier devient une valeur ajoutée.
C'est assez facile de comprendre qu'un code en français est plus facilement compréhensible par le client qu'un code en anglais. Mais des fois, un morceau de code est réutilisé dans tous nos programmes. C'est intéressant de capitaliser ce code, pour en extraire une API et de la réutiliser ensuite. Et si on réfléchit « business », si on veut vendre cette API par la suite, en français ça risque d'être difficile. Et même si on fait de l'open source, la communauté anglophone est bien plus importante que la communauté française. J'obtiendrai plus de contributions si je code en anglais.

Je pense qu'il y a d'autres raisons, qui se valent plus ou moins. Mais ce sont pour moi les plus importantes.

En même temps que j'écris ce billet, Evernote m'indique « Synchronisation Terminée : une note téléversée ». 
C'est un signe  codons en anglais.

Edit: Pour avoir un autre son de cloche, je vous invite à lire <a href="http://fabien.bezagu.free.fr/index.php?2008/01/23/7-ecrire-le-code-dans-sa-langue-maternelle">ce post</a> de Fabien Bezagu
