---
layout: post
title: Write Antifragile & Domain-Driven tests with Outside-in diamond
author: gvincent
lang: fr
tags: ddd tdd tests antifragile
---
Hier j'ai vu une vidéo intitulée [Write Antifragile & Domain-Driven tests with Outside-in diamond](https://www.youtube.com/watch?v=djdMp9i04Sc) de Thomas PIERRAIN.

Thomas parle des tests et du développement piloté par les tests (TDD). Thomas a une approche intéressante des tests. Il préfère avoir plus de tests d'acceptation (gros grain) que de tests unitaires. La construction de l'application se fait donc de manière progressive de l'extérieur vers l'intérieur (`outside-in`). En opposition à la technique souvent rencontré d'`inside-out` où les tests commencent de l'intérieur de l'application vers l'extérieur.

Après des années à faire du TDD, il a remarqué qu'une approche `inside-out` avec beaucoup de tests unitaires (ceux de la base de la pyramide de tests) étaient fragiles, insuffisants et difficiles à mettre en place. Et que faire de l'`outside-in` réduisait concidérablement ces problèmes. En discutant avec Thomas il m'a aussi dit qu'il préfère la dynamique/le workflow `outside-in` pour écrire ses tests. Ca lui permet de ne jamais rien coder qui ne soit directement concerné par un besoin exprimé (dans un test). L'`outside-in` permet en effet de suivre le principe YAGNI (you ain’t gonna need it).

## Le coeur du métier et les adapters

J'aime bien quand je développe une application un peu complexe avoir le code important détaché du reste. Le coeur de l'application (l'hexagone dans l'architecture hexagonale) n'a pas connaissance de ce qu'il se passe à l'extérieur. Par exemple il ne sait pas qui l'appelle ni comment.

    class Hexagone(){
        function trouver_reponse_universelle(heure){
            ....
        }
    }

Tester mon hexagone est très facile

    // Arrange
    hexagone = Hexagone()
    // Act
    heure = maintenant()
    reponse = hexagone.trouver_reponse_universelle(heure)
    // Assert
    assert reponse == 42


Le métier de mon application se trouve dans `trouver_reponse_universelle`. Seulement l'utilisateur final de notre application de consomme jamais `trouver_reponse_universelle` directement. Si vous construisez une API REST par exemple vous allez avoir un controlleur HTTP qui va venir utiliser un hexagone et appeler votre méthode `trouver_reponse_universelle`.

    class ControlleurHTTP{

        function constructor(hexagone){
            this.hexagone = hexagone
        }

        function trouver_reponse_universelle(donnees){
            heure = donnees.heur
            reponse = this.hexagone.trouver_reponse_universelle(heure)
            return ok_200(reponse)
        }
    }
    

## Plusieurs problèmes

Dans sa présentation Thomas utilise l'`outside-in` pour tester son hexagone. Mais à la différence de ce que je vois souvent, Thomas prend le parti de tester avec les adapters de production. Par exemple Thomas va tester le controlleur HTTP directement.


    // Arrange
    hexagone = Hexagone()
    controlleur_http = ControlleurHTTP(hexagone)
    // Act
    donnees = {"heure": maintenant()}
    reponse = await controlleur_http.trouver_reponse_universelle(donnees)
    // Assert
    assert reponse.status_code == 200
    assert reponse.data == 42
  

Ce test utilise le controlleur de production. Ce test d'acceptance est presque aussi rapide que le test unitaire précédent. A la seule différence qu'il teste aussi le controlleur. Il valide que l'on récupère et utilise le DTO correctement.

On réduit les angles morts. L'erreur sur la ligne `heure = donnees.heur` est volontaire et n'aurait été attrapée que par le deuxième test.

Pour finir en commençant par le test d'acceptance, on évite de tester les détails d'implémentations. Nos tests sont plus robustes (`Antifragile`) car ils changent moins. Vous ne modifiez pas tout le temps vos API ?

## La fausse double boucle de GooS

Dans le livre Growing Object-Oriented Software Guided by Tests, Steve Freeman et Nat Pryce parlent de la double boucle quand ils pratiquent le développement piloté par les tests.

Ils commencent par un test d'acceptance rouge, suivit d'une série de tests unitaires en boucle TDD (rouge, vert, refactor) pour arriver à faire passer le premier test d'acceptance au vert.

Thomas dans sa pratique n'utilise pas tout le temps la deuxième série de tests unitaires. Il va utiliser des tests unitaires pour découvrir une solution. Mais que si c'est nécessaire. C’est à dire s’il rencontre une difficulté lors du code d’implementation, ou s’il lui faut plus de 10-20 mn pour coder celle-ci. Et à la fin, il peut même supprimer les tests unitaires. Un peu comme la construction d'une ouverture dans votre maison. Vous allez soutenir le toit (tests unitaires) le temps de solidifier la structure (tests d'acceptances) et une fois que le béton est sec, enlever les poteaux de soutient (supprimer les tests unitaires).


## Tests DDD

Dans sa pratique du Domain Driven Design, Thomas porte une attention particulière à l'écriture d'un code explicite qui utilise les termes du métier. De manière intéressante, il introduit des raccourcis dans ses tests pour créer son contexte de test en utilisant des concepts métiers.

Il montre l'exemple de la création d'un hexagone qui calcule la disponibilité de chambre d'hotel (version simplifié).

    ContruireUnHexagone()
    .AvecLesHotelsAffiliés(bellagioHotel, unAutreHotelAvecTousLesTypesDeChambre)
    .AvecLesHotelsComplets(unAutreHotelAvecTousLesTypesDeChambre)

Sweet !

Même les assertions sont encapsulés dans des fonctions

    reponse = controlleur.recuperer_chambres_dispo(...)
    VerifieChambresCorrespondentAuxCriteres(reponse, belagio.types_de_chambre, belagio.ville, ...)


## Conclusion

J'ai beaucoup aimé la présentation de Thomas. La partie sur la création des tests m'a beaucoup plu. Je rencontre les même difficultés dans la création de mes contextes de tests qui sont beaucoup trop gros. Faire ressortir le métier, de manière explicite est une technique que je vais essayer.

Dans sa présentation Thomas ne montre pas d'exemple pour les adapters de droite, les adapters d'infrastructures ou de base de données. J'ai du mal à voir techniquement comment je pourrais venir utiliser les adapters de production et stuber que les entrées sorties.

Comme à chaque fois ça dépend du contexte. Mais j'aime beaucoup avoir des tests de mon hexagone qui utilisent la base de données avec un faux adapter en mémoire.


    // Arrange
    base_de_donnée_en_mémoire = BaseDeDonnéeEnMémoire()
    hexagone = Hexagone(base_de_donnée_en_mémoire)
    // Act
    hexagone.faire_quelque_chose(...)
    // Assert
    assert hexagone....

Maintenant il est important de rajouter des tests doubles pour s'assurer que l'adapter de test se comporte comme l'adapter de production. Dans les fait je ne suis pas sur que je le fasse tout le temps. Donc une solution pourrait être d'utiliser une version en mémoire d'une base de données et d'utiliser l'adapteur de base de données de production. Un peu de tuyauterie de tests pour moi à l'avenir !


## Ressources

 * [Presentation de Thomas](https://www.youtube.com/watch?v=djdMp9i04Sc)
 * [TDD, Where Did It All Go Wrong](https://www.youtube.com/watch?v=EZ05e7EMOLM)