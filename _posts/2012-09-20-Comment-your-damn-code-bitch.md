---
layout: post
lang: fr
title: Comment your damn code bitch !
author: gvincent
---

<h1>Comment your damn code bitch !</h1>
<p>
Voilà ce que j'ai essayé d'expliquer à un collègue quand il m'a dit que mon code ne comportait pas de commentaires :
</p>
<pre>
    <code data-language="python">
    def kos_root(self):
        """Return the pathname of the KOS root directory."""
        if self._kos_root: 
            return self._kos_root
    ...
    </code>
</pre>

<p>
- What the fuck Man !
A quoi sert cette putain de docstring, tu m'expliques ?
<br>
- A expliquer mon code.
<br>
- Et ça marche ?
<br>
- Oui, je suis capable de te dire que cette fonction retourne une chaine de caractère
<br>
- Tu es sur ? Regarde la suite du code
</p>

<pre>
    <code data-language="python">
    def kos_root(self):
        """Return the pathname of the KOS root directory."""
        if self._kos_root: 
            return self._kos_root
        #bug 3154 - 04/25/2009
        else: 
            return 0 
    </code>
</pre>

<p>
- Ah oui on a eu un bug sur le code de retour de la méthode et ..
<br>
- Le problème n'est pas de savoir si ton code fonctionne, ici. Le problème est de te montrer que cette docstring n'est plus à jour. C'est pire que du code mort.
<br>
- Pour quelle raison ?
<br>
- Tu induits d'autres développeurs en erreur. 
<br>
- C'est vrai, je vais changer la docstring
<br>
- Non ! Ca ne règle pas le souci, ton code ne doit pas comporter de commentaires! <b>Il doit porter son intention</b>. Il doit refléter précisément ce qu'il est censé faire. Et la documentation ce sont tes tests. 
<br>
Tu peux voir comment ta méthode a été testée. Les tests sont à jour:
</p>

<pre>
    <code data-language="python">
    class TestMain(unittest.TestCase):

        def setUp(self):
            self.main = Main()

        def test_kos_root(self):
            self.assertTrue(self.main.kos_root())

        def test_false_kos_root_should_return_zero(self):
            self.main._kos_root = False
            self.assertEqual(0, self.main.kos_root())
    </code>
</pre>
<p>
    Pour résumer, le code d’un logiciel ne doit pas comporter de commentaire, c'est un aveu d'échec sur sa capacité à rendre son code explicite. Son code doit refléter précisément son intention lors de sa conception. Et la documentation ce sont les tests. Ils doivent être à jour, et chaque bug doit comporter un test de non régression.
</p>

<p>
Ps: cette conversation n'est que pure fiction
</p>