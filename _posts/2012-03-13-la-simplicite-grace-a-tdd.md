---
layout: post
lang: fr
title: La simplicité grace à TDD
author: gvincent
tags: tdd simplicité
---

Le développement piloté par les tests est un merveilleux moyen pour s'assurer que le code que nous réalisons fait
exactement ce que l'on veut qu'il fasse.
TDD permet d'aller plus loin; Il oblige le développeur à faire les choses simplement...



Récemment j'ai lu un magnifique billet de Ronald E. Jeffries intitulé [« But We Need a Database … Don't We? »](http://xprogramming.com/articles/but-we-need-a-database-dont-we/) sur lequel je me suis grandement inspiré pour expliquer cette idée.

Le contexte est le suivant: vous êtes programmeur et vous devez réaliser une application de fidélisation de client pour un marchant de café. Chaque fois qu'un client achète quelque chose dans le magasin, on enregistre tous ses achats, et dès qu'il achète 5 produits, le 6ème est gratuit. Les clients sont enregistrés avec un numéro de membre unique.

Je vais essayer de montrer que l'utilisation du développement piloté par les tests apporte de la simplicité dans la construction de mon application.
Le code qui va suivre est en python parce que le langage est relativement facile à comprendre.

Bon mettons nous à écrire notre premier test. Disons qu'ici notre premier test pourrait vérifier que lorsqu'un membre achète un produit à X €, le prix du produit qui lui est retourné est bien X € (ou 0 € si le client achète son 6ème produit):

```python
import unittest

class TestsApplicationMagasinDeCafe(unittest.TestCase):

    def test_facturation_produit(self):
        membre = Membre()
        montant_produit = membre.facture(10)
        self.assertEqual(montant_produit, 10)

if __name__ == '__main__':
    unittest.main()
```


L'interpréteur va gueuler parce qu'il ne sait pas ce qu'est un Membre et la méthode facture n'existe pas. Nous ajoutons ce code pour supprimer l'erreur de compilation:


```python
class Membre(object):
    def facture(self, montant):
        pass
```


Mon test est rouge, je le fais donc passer au vert


```python
    def facture(self, montant):
        return 10
```


Si je change le montant du produit facturé, notre test est de nouveau rouge.


```python
    def test_facturation_produit(self):
        membre = Membre( )
        montant_produit = member.facture(10)
        self.assertEqual(montant_produit, 10)
        montant_produit = member.facture(5)
        self.assertEqual(montant_produit, 5)
```


Erreur que je corrige en modifiant notre méthode facture:


```python
    def facture(self, montant):
        return montant
```


Modifions le test pour s'assurer que lorsque j'achète 6 produits le 6ème est gratuit. 


```python
    def test_facturation_produit(self):
        membre = Membre( )
        for i in range(5):
            montant_produit = member.facture(10)
            self.assertEqual(montant_produit, 10)
        montant_produit = membre.facture(5) 
        self.assertEqual(montant_produit, 0)
```


Notre dernier test échoue. Si vous avez suivi, facture retourne 5 et pas 0. Nous avons besoin d'enregistrer le nombre d'achats, et de tester quand cet enregistrement vaut 6 pour retourner 0.


```python
 class Membre(object):

    def __init__(self):
        self._nombre_dachats = 0

    def facture(self, montant):
        self._nombre_dachats += 1
        if self._nombre_dachats != 6:
            return montant
        else:
            return 0
```


Beaucoup de modification en une seule fois. Vous pouvez lancer vos tests et vérifier que l'ajout de _nombre_dachats ne casse pas vos anciens tests. 
Vos tests sont verts, un petit peu de refactoring et on continu.

Refactoring de nos tests


```python
    def test_facturation_produit(self):
        membre = Membre( )
        for prix in range(5):
            self.assertEqual(member.facture(prix), prix)
        montant_produit = membre.facture(5) 
        self.assertEqual(montant_produit, 0)
```


Refactoring de notre objet Membre


```python

class Membre(object):

    def __init__(self):
        self._nombre_dachats = 0

    def facture(self, montant):
        self._nombre_dachats += 1
        return montant if self._nombre_dachats != 6 else 0

```


Maintenant si un client achète 6 produits supplémentaires, le 12ème doit être gratuit.


```python
    def test_douxieme_produit_gratuit(self):
        membre = Membre()
        for i in range (5):
            self.assertEqual(member.facture(1), 1)
            montant_produit = membre.facture(2)
        self.assertEqual(montant_produit, 0, "la premiere reduction ne fonctionne pas")
        for i in range (5):
            self.assertEqual(member.facture(1), 1)
            montant_produit = membre.facture(3)
        self.assertEqual(montant_produit, 0, "la deuxieme reduction ne fonctionne pas")
```


On modifie la méthode facture de notre objet Membre avec l'ajout d'un modulo 


```python
return montant if self._nombre_dachat%6 != 0 else 0
```


Et nos tests deviennent verts.

Ce qui est génial avec cette méthode c'est que nous venons de faire émerger un élément très important de notre modèle _nombre_dachats. Et en plus nous nous assurons qu'il fonctionne correctement. Maintenant passons à la réalisation de l'autre partie de notre user storie. Notre application fonctionne pour un seul membre. Si nous avons deux membres (disons le membre n°2 et le membre n°6) assurons nous qu'ils obtiennent leur réduction au bon moment.


```python
    def test_membre_deux_membre_six_obtiennent_leur_reduction(self):
        membres = CollectionMembre()
        for achat_deuxieme_membre in range(5):
            self.assertEqual(membres.get_membre(2).facture(1), 1)
        self.assertEqual(membres.get_membre(2).facture(5), 0)
```


CollectionMembre est donc une représentation du modèle de la base de données des membres. La méthode get_membre retourne un objet Membre correspondant au numéro de membre passé en paramètre. Ici mon implémentation de l'objet CollectionMembre est bonne quand mon test devient vert. Je dois réaliser le plus petit code possible pour faire passer mon test au vert.


```python
class CollectionMembre(Object):
    def get_membre(self, numero_membre):
        return Membre()
```

Cette implémentation marche presque, à la seule différence que que chaque fois que je fais un achat (ex: membres.membre(2).facture(1)) je construis un nouveau membre. A la sixième occurrence notre test échoue. 

```python
AssertionError: Le 6eme produit n'est pas gratuit
```


Si nous enregistrons ce membre avec le constructeur de notre collection, notre test passe au vert. 


```python
class CollectionMembres(object):

    def __init__(self):
        self.__enregistrement = Membre()

    def membre(self, numero_membre):
        return self.__enregistrement
```


Maintenant si le client 6 vient acheter un produit entre temps, notre application ne fonctionne plus.


```python
def test_membre2_membre6_ont_produits_gratuits(self):
        membres = CollectionMembres()
        for achat in range(5):
            self.assertEqual(membres.membre(2).facture(achat),achat)
        self.assertEqual(membres.membre(6).facture(10), 10)
        montant_produit = membres.membre(2).facture(10)
        self.assertEqual(montant_produit, 0, "Le 6eme produit n'est pas gratuit")
```


Maintenant je ne peux plus reculer. Je me dois d'enregistrer le numéro du membre quelque part. L'utilisation d'un dictionnaire


```python
{'Membre' : 'numero de membre'}
```


me paraissait la meilleur implémentation possible. Et il me parrait logique d'enregistrer le numéro du membre lors de sa création en modifiant le constructeur de notre objet Membre. Je commente mon code :


```python
#self.assertEqual(membres.membre(6).facture(10), 10)
```


pour que tous mes tests redeviennent vert et donc m'assurer que je modifie bien l'architecture de mon application avec mon mousqueton de survie !


```python
class Membre(object):

    def __init__(self, numero_membre = -1):
        self._nombre_achats = 0
        self.numero_membre = numero_membre

    def facture(self, montant):
        self._nombre_achats += 1
        return montant if self._nombre_achats%6 != 0 else 0
```


Ici rien ne casse, je rajoute juste un attribut à ma classe Membre dans le constructeur. Et je modifie ma collection de membres pour enregistrer mes différents membres. J'ajoute ensuite donc mon dictionnaire à ma classe CollectionMembre


```python
class CollectionMembres(object):

    def __init__(self):
        self._enregistrement = Membre( )
        self.membres = { }
        
    def get_membre(self, numero_membre):
        if numero_membre in self.membres:
            return self.membres[numero_membre]
        else:
            nouveau_membre = Membre(numero_membre)
            self.membres[numero_membre] = nouveau_membre
            return nouveau_membre
        return self._enregistrement
```


Ce qui ne casse pas mes tests, et je peux supprimer mon ancienne implémentation, ce qui me donne:


```python

class CollectionMembres(object):

    def __init__(self):
        self.membres = {}
        
    def get_membre(self, numero_membre):
        if numero_membre in self.membres:
            return self.membres[numero_membre]
        else:
            nouveau_membre = Membre(numero_membre)
            self.membres[numero_membre] = nouveau_membre
            return nouveau_membre
```


Si j'applique maintenant les achats du membre 6, mon code fonctionne parfaitement.


```python
    def test_membre2_membre6_ont_produits_gratuits(self):
        membres = CollectionMembres()
        for achat in range(5):
            self.assertEqual(membres.membre(2).facture(achat),achat)
        self.assertEqual(membres.membre(6).facture(10), 10)
        montant_produit = membres.membre(2).facture(10)
        self.assertEqual(montant_produit, 0, "Le 6eme produit n'est pas gratuit")
        for achat in range(4):
            self.assertEqual(membres.membre(4).facture(achat),achat)
```
<h2>Conclusion:</h2>

Quand on lit la user storie, il est facile de se méprendre sur ce qui est réellement important. Surtout quand on lit “Chaque fois qu'un client achète quelque chose dans le magasin, on enregistre tous ses achats,...”
Ca arrive souvent qu'une storie soit mal exprimée. Décripter une storie peut être problématique. Pourtant comme je viens de le montrer, pour cette user storie donnée, enregistrer les achats n'était pas important. 
Le plus important (ce qui représente le plus de valeur) est qu'un membre puisse obtenir une réduction après 5 achats. 

Et la deuxième chose la plus importante (dont nous avons réellement besoin) c'est que chaque membre puissent obtenir cette réduction. Par contre ce n'est pas forcement évident d'extraire ce besoin. En plus notre modèle de base de données est très simple, et peut être enrichit au fur et à mesure avec ce qui importe vraiment. Pour finir une donnée importante est apparue (le nombre d'achats de chaque membre).
Personnellement quand j'ai lu la user storie, je n'ai pas pensé tout de suite à ça. Je me suis dis si j'enregistre tous les achats d'un membre, je n'aurais qu'à les compter et adapter le prix d'un produit en fonction du résultat.
