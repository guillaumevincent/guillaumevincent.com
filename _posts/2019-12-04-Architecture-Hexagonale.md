---
layout: post
title: Architecture-Hexagonale
author: gvincent
lang: fr
tags: architecture hexagonale ddd
---

Bon on va pas se le cacher, dès qu'on recherche des informations sur l'architecture hexagonale, on trouve toutes les présentations de la terre mais très peu de code. On trouve beaucoup de resources en anglais, et avouez le, comprendre un nouveau concept avec des nouveaux termes c'est pas facile. Du moins c'est dans cette situation où je me suis retrouvé il n'y a pas si longtemps. J'ai lu (beaucoup trop), j'ai mangé et vu des tonnes de vidéos et j'ai appris des trucs. Cet article c'est un peu la synthese de ce que j'ai compris, pour les débutants, avec du code, et sans toute les difficultés liés à la langue et au concept (enfin je l'espère).

# Un peu de contexte

Pour l'histoire, vous montez une entreprise avec un copain. Vous etes en charge de la partie technique et vous devez fournir un service de gestion de Planning pour le BTP. Vous avez entendu parlé des bienfaits de l'architecture hexagonale quand vous changez souvent d'idée. Vous associez la future reussite de votre entreprise à sa résiliance, au fait de pouvoir couvrir des nouveaux besoins rapidement, dès que possible.

Vous prenez une décision importante, vous n'allez pas prendre le gros framework que vous connaissez par coeur car vous vous souvenez que l'ajout de nouvelles fonctionnalités au bout de 4 mois de code c'est douloureux. Vous allez essayé l'architecture hexagonale. C'est parti!

Votre mission pour les prochaines semaines:

- implementer un service HTTP qui permet de gérer le planning d'une entreprise. CRUD (Create Read Update Delete) de chantiers avec des équipes associées aux chantiers.

# On commence

Bon je vous vois venir, vous avez pensé base de données non? Vous connaissez bien Postgresql en plus, alors ça tombe bien, ça sera Postgresql. Il y a de grande chance pour qu'en effet vous enregistrez des chantiers et des équipes associés à une entreprise quelque part. Vous allez peut etre utiliser une base de données, mais pour l'instant on ne sait pas grand chose. Il serait bien de reculer le moment où l'on devra prendre des décisions importantes. Plus on retarde la décision, plus on aura emmagasiné des informations, meilleure la décision sera.

Bon l'architecture hexagonale permet ça, nous allons découpler/séparer la persistence/la base de données de notre code qui gère le planning.

Vous décidez de créer le logiciel en Typescript. C'est la première décision technique que vous devez prendre: le language du **coeur de votre application**. Le coeur de votre application, c'est qu'on appelle l'hexagone. C'est la partie de votre application qui vaut de l'or, votre sauce secrete. Bon pour l'instant du CRUD c'est pas franchement une sauce secrete. Mais vous planifiez d'ajouter très rapidement une fonctionnalité d'alertes sur votre planning.

L'hexagone, le coeur il est en typescript. Il est au centre de votre application. Il ne sait pas, et il ne saura jamais quelle base de données ou système de persistance vous allez utiliser. Pourtant c'est bien lui qui va appeler les fonctions pour sauvegarder des informations quand il en aura besoin.

Pour réussir à faire ça nous avons besoin d'un concept clef, l'injection de dépendance. Nous allons injecter la persistance au moment ou nous allons construire/instancier l'hexagone.

```ts
const entrepotDeChantiers = new EntrepotChantiers();
const planning = new Planning(entrepotDeChantiers);
```

Nous allons dans le constructeur de notre objet Planning sauvegarder cet entrepot dans une propriété entrepot de l'objet Planning:

```ts
class Planning {
  private entrepot: IEntrepotChantiers;

  constructor(entrepot: IEntrepotChantiers) {
    this.entrepot = entrepot;
  }
  ...
}
```

Depuis l'interieur de planning vous pourrez appeler l'entrepot directement avec un `this.entrepot.recupererLesChantiers(...)`. Vous avez remarqué que nous avons précisé que l'entrepot doit être du type `IEntrepotChantiers`. C'est un bon moyen de s'assurer que l'entrepot a bien les bonnes méthodes:


```ts
interface IEntrepotChantiers {
  recupererLesChantiers(): Chantier[];
}
```

Autre remarque l'entrepot est un entrepot pour les chantiers, donc il est spécialisé dans le stockage de chantiers. Les methodes publiques de cet entrepot (exposées par l'interface) ont un sens pour l'hexagone `Planning`. Vous pouvez/devez avoir des fonctions qui expriment leurs intentions comme `recupererLesChantiersSansDate()`.


```ts
class Planning {
  une_fonction_de_mon_hexagone(){
      const chantiersSansDate = this.entrepot.recupererLesChantiersSansDate()
      for (let index = 0; index < chantiersSansDate.length; index++) {
          const chantierSansDate = chantiersSansDate[index];
          ...
      }
  }
}
```

Pourquoi c'est interessant? Premièrement vous pouvez tester votre hexagone de manière découplé, sans aucune base de données, et vous concentrer sur le metier.

```ts

```