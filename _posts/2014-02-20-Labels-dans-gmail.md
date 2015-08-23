---
layout: post
title: Les labels dans Gmail
author: gvincent
lang: fr
tags: gmail productivité
---
Gmail de Google est l'un des services de messagerie les plus populaires sur le Web.
Voici un billet très rapide pour présenter mon utilisation des "labels" dans Gmail.

<!--more-->

Gmail utilise des labels au lieu de dossiers pour organiser vos emails. Un label est l'équivalent un hashtag sur twitter.
Son seul but est de faciliter vos futures recherches.

![label in gmail](https://lh3.googleusercontent.com/-AcDxhgkemKE/UwXRJIxHvyI/AAAAAAAAOgc/kH2k4-OrvQs/w958-h355-no/Capture+d%2527e%25CC%2581cran+2014-02-20+10.50.51.png){:.center .img-responsive}

J'ai 15 labels. Le reste je le cache.

  * **inbox**
  * **sent mail**
  * **trash**
  * akema
  * akemail
  * **billing**
  * **family**
  * **friends**
  * **house**
  * okiwi
  * **photos**
  * **sports**
  * tedx
  * **travel**
  * **work**

3 labels appartiennent à Gmail (inbox, sent mail et trash),
8 labels permanents que j'ai créés (billing, family, friends, house, photos, sports, travel, work). Permanent parce que ce
sont les labels que j'ai depuis le début de mon utilisation de Gmail.
Et 4 labels projets (Akema, Akemail, Okiwi et Tedx) qui correspondent à des projets importants qui nécessitent un label à eux seuls


Mon objectif, traiter les emails rentrant pour avoir plus aucun email dans ma boite de réception (Inbox Zero Mail).
Voici le traitement de chacun de mes emails:

Si mon email ne possède pas de label alors c'est :
  * un spam. Je me désabonne du service quand le lien de désinscription est disponible, et je déclare le mail comme spam.
  * une règle manquante. Je crée une règle de traitement automatique de mon email pour lui affecter un label.
  * dans des cas très rares (règle trop spécifique), je ne fais rien

Ensuite:
  * je garde mon email dans ma boite de réception tant que je n'ai pas répondu ou effectué ce que je devais faire
  * je m'autorise de temps en temps à rajouter une coche verte ou un point d'exclamation rouge quand le mail est important.
  * j'archive ou je supprime mon email.


Maintenant je ne perds plus de temps sur mes emails. Beaucoup sont traités très rapidement.
Mes spams partent directement dans ma boite à spam (30 emails la semaine dernière).
Mais je cache son affichage, je ne vais donc plus voir ce qu'il s'y passe.


J'ai beaucoup de filtre (50 environ), certains sont obsolètes mais je les laisse.
Beaucoup consistent à appliquer un label au mail.

![filter gmail](https://lh6.googleusercontent.com/-TfdA7G2OP-M/UwXcsYDbYpI/AAAAAAAAOgw/fVQVJXD5Kdo/w338-h47-no/Capture+d%2527e%25CC%2581cran+2014-02-20+11.44.11.png){:.center .img-responsive}

Et grâce à cette technique je retrouve un email très très facilement, je n'ai qu'à préciser à Gmail
les labels de l'email que je recherche et quelques mots-clefs.

Exemple: pour chercher une facture EDF pour mon appartement

    label:billing label:house edf

![edf gmail](https://lh6.googleusercontent.com/-hzRvm8CAntM/UwXf3SkcwyI/AAAAAAAAOhQ/f_tHSe_kfyU/w661-h289-no/Capture+d%2527e%25CC%2581cran+2014-02-20+11.57.59.png){:.center .img-responsive}

Pour rechercher une facture EDF sur le mois de décembre 2013:

    after:2013/11/01 before:2014/01/01 label:billing label:house edf

![edf gmail decembre](https://lh5.googleusercontent.com/-gOuAPLmFQCQ/UwXiFwh0wAI/AAAAAAAAOhg/c6N3seEfhTg/w676-h189-no/Capture+d%2527e%25CC%2581cran+2014-02-20+12.07.32.png){:.center .img-responsive}

Ensuite il suffit d'apprendre par coeur les commandes de la [recherche avancée](https://support.google.com/mail/answer/7190) dans Gmail.
L'auto-complétion des recherches est simplement magnifique.
J'utilise très souvent :

    has:attachment
    from:
    has:red-bang
    after:
    before:

Il ne me manque que les filtres sur les emails envoyés, pour obtenir 100% de mes emails avec une étiquette. Gmail si tu m'entends ;)
