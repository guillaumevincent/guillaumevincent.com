---
layout: post
title: Reprendre en main ses emails
author: gvincent
lang: fr
tags: mail opensmtpd dovecot
---


Depuis les révélations d'Edward Snowden et le [fameux article du Guardian](http://www.theguardian.com/world/2013/jul/11/microsoft-nsa-collaboration-user-data) 
révélant l'étroite collaboration entre les webmails et les services secrets américains, je me suis mis à chercher une 
alternative à ces services pour gérer différemment mes emails. Depuis mars 2014, j'ai enfin une adresse email qui 
m'appartient, qui fonctionne bien. Dans ce billet je vais partager avec vous mon expérience et vous aidez à reprendre 
en main vos emails !

<!--more-->
Obsolète lisez plutôt [OpenSMTPD-Dovecot-SpamAssassin](http://guillaumevincent.com/2015/01/31/OpenSMTPD-Dovecot-SpamAssassin.html)

<p class="bg-success">
Avant de commencer, je tiens à préciser que ce billet est technique. Nous allons apprendre à configurer des outils 
comme OpenSMTPD et Dovecot. L'objectif final est de vous permettre d'avoir votre propre serveur mail et de comprendre 
comment ça marche. Pas à pas, une étape après l'autre, avec des tests entre chaque étape. Voici l'objectif de ce billet.
Pour mener à bien cette reprise en main, il va vous falloir:
</p>
<ul>
<li>un serveur personnel (VPS, machine dédiée) avec un système d'exploitation récent (ubuntu 14.04, FreeBSD 10 ou 9.3)</li>
<li>un nom de domaine</li>
<li>un certificat TLS pour chiffrer les communications entre votre client mail et votre serveur. Je ne veux pas 
rentrer dans les détails mais il vous faut la clef privée du certificat qui se termine souvent par .key 
(ex: private.oslab.fr.key) et le certificat public qui se termine par .crt ou .pem (ex: certificate.oslab.fr.crt)
<a href="https://help.ubuntu.com/12.04/serverguide/certificates-and-security.html">voir comment générer son certificat sous ubuntu</a></li>
<li>maitriser les bases de l'administration système (installer des packages, 
éditer des fichiers de configuration, etc)</li>
</ul>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js"></script>
<script type="text/javascript">

var EmailModule = angular.module('EmailModule', []);

EmailModule.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});
EmailModule.controller('EmailCtrl', function ($scope) {
    $scope.email = "gvincent@oslab.fr";
    $scope.user = "gvincent";
    $scope.domain = "oslab.fr";
    $scope.ip = "37.187.192.235";
    $scope.password = "password";
    
    $scope.$watch('email', function(){
        if($scope.email){
            var mail_information = $scope.email.split("@");
            $scope.user = mail_information[0];
            $scope.domain = mail_information[1];
        }
    });
    
    function createAuthLogin(user, password) {
        return btoa("\000" + user + "\000" + $scope.password)
    }
    
    $scope.$watch('user', function(){
       $scope.auth = createAuthLogin($scope.user, $scope.password);
    });
    
    $scope.$watch('password', function(){
       $scope.auth = createAuthLogin($scope.user, $scope.password);
    });
});    
</script>

<p>
<aside>
    Pour personnaliser ce tutoriel vous pouvez rentrer votre email et l'adresse ip de votre serveur. 
    Je ne récupère aucune information, c'est AngularJS qui vient modifier cette page, pour rajouter les informations 
    pertinentes et personnalisées. Tu peux regarder le code source de la page :)
    Si tu n'as pas confiance, tu peux laisser les informations par défaut.
</aside>
</p>
 
<div ng-app="EmailModule" ng-controller="EmailCtrl">
 
    <form class="pure-form pure-form-stacked">
        <label for="email">Email</label>
        <input type="email" name="email" class="form-control" ng-model="email">
        <label for="ip">Ip du serveur</label>
        <input type="text" name="ip" class="form-control" ng-model="ip">
    </form>

<h3> Un email c'est quoi ? </h3>

<p>
Un email c'est du texte formaté selon une norme (<a href="http://tools.ietf.org/html/rfc5322">RFC 5322</a>) qui 
transite sur internet. Pour envoyer un email on a besoin d'un serveur mail : une machine qui s'occupe d'envoyer notre 
email à l'autre bout de la Terre. Pour recevoir un email il faut un autre serveur mail. Ces serveurs mails communiquent 
entre eux avec le protocole SMTP (<a href="http://tools.ietf.org/html/rfc5321">RFC 5321</a>).
</p>
<p>
Un serveur mail pour envoyer un email il a besoin d'une adresse email d'origine (contact@example.com), d'un destinataire 
({$ email $}) et d'un contenu.
</p>
<p>
En gros voici les grandes lignes du déroulement d'un envoi d'email:
</p>
<ul>
    <li>le serveur mail example.com cherche l'adresse IP du serveur mail {$ domain $}</li>
    <li>il établit une connexion SMTP avec ce serveur mail</li>
    <li>il converse en SMTP pour transférer l'email</li>
    <li>il ferme la connexion SMTP</li>
</ul>

<h3>Configurer ses DNS</h3>
<p>
Pour récupérer l'adresse ip du serveur mail de destination, votre serveur mail va interroger les 
<a href="http://fr.wikipedia.org/wiki/Domain_Name_System">DNS</a> associées au nom de domaine de l'email. 
Et plus particulièrement il va chercher à récupérer l'enregistrement MX dans vos DNS.
</p>
<p>
Pour que la résolution DNS fonctionne, il faut mettre à jour cet enregistrement dans notre gestionnaire 
de DNS (Ovh, Gandi, Bookmyname, etc). Il faut se connecter à l'interface de gestion et modifier 
l'enregistrement.
Modifier ou ajouter l'enregistrement MX pour qu'il pointe vers mail.{$ domain $}
</p>
<pre><code>{$ domain $}.                 300  MX     10 mail.{$ domain $}.</code></pre>
<p class="help-block">
Le . à la fin des nom de domaine indique des noms de domaines absolus. 10 indique la priorité de l'engistrement quand 
on a plusieurs MX. Le 300 correspond au TTL (Time To Live) de la DNS. 300 correspond à 300 secondes, ce qui est court.
A la fin quand tout fonctionne il est conseillé d'augmenter ce TTL pour éviter des déboires comme
<a href="https://medium.com/p/24eb09e026dd">ceux rencontrés par @N</a>.
</p>
<p>
Ensuite il faire pointer le sous-domaine mail.{$ domain $} vers l'adresse ip de notre serveur en ajoutant un 
enregistrement de type A:
</p>
<pre><code>{$ domain $}.                 300  MX     10 mail.{$ domain $}.
mail                      300  A      {$ ip $}
</code></pre>
<p>
D'après les <a href="http://www.rfc-editor.org/rfc/rfc2181.txt">RFC des DNS</a>, un enregistrement 
de type MX doit pointer vers un sous-domaine, et ensuite ce sous-domaine doit pointer vers une adresse IP. 
J'utilise la convention mail.{$ domain $} mais vous pouvez utiliser le sous-domaine de votre choix. 
</p>

<h3> Récupérer l'adresse email du serveur mail de destination</h3>
<p>
Pour être sur que nos DNS sont bonnes, nous allons les interroger avec l'outil <code>dig</code> 
installé par défaut sur votre machine. 
</p>
<pre><code>$ dig +noall +answer MX {$ domain $}
{$ domain $}.		300	IN	MX	10 mail.{$ domain $}.
</code></pre>
<p class="help-block">
On retrouve notre enregistrement défini précédemment dans nos DNS.
Si vous n'avez aucune réponse à cette commande alors il va falloir attendre que vos DNS se propagent. 
</p>
<p>
<code>dig +noall +answer</code> correspond à la commande dig pour obtenir une réponse claire sans fioritures
</p>
<p>
<code>MX</code> correspond au mail exchanger record (MX record) qui indique dans les DNS le nom de domaine d’un serveur 
mail. En gros où se trouve le serveur mail associé au nom de domaine.
</p>
<p>
<code>{$ domain $}</code> nom de domaine pour lequel on veut récupérer le MX
</p>

<p>
Grâce à la réponse de la première requête dig (mail.{$ domain $}.), on récupère le sous-domaine associé au 
MX pour savoir vers quelle adresse ip il pointe.</p>

<pre><code>$ dig +noall +answer A mail.{$ domain $}.
mail.{$ domain $}.		107	IN	A	{$ ip $}
</code></pre>
<p class="help-block">
Attention à demander l'enregistrement de type A (Adresse record).
</p>
<p>
Ainsi avec deux résolutions DNS, notre serveur mail d'envoi est capable de connaitre l'adresse ip de votre 
serveur mail pour votre nom de domaine {$ domain $}.
</p>

<h3>Choisir son serveur mail</h3>

<p>
La configuration DNS est terminée :) enfin pour l'instant. Maintenant que l'enregistrement MX pointe vers notre nom de 
domaine, il est temps de mettre en place notre serveur mail. Quand j'ai cherché à configurer mon propre 
serveur mail j'ai eu rapidement le choix entre Postfix et Sendmail. J'ai essayé de configurer les deux, 
avec succès, mais sans vraiment comprendre pourquoi ça fonctionnait. Sendmail tout comme Postfix sont bien 
trop compliqués à configurer. Or il s'avère qu'une alternative, de la trempe des grands, existe : 
<a href="https://www.opensmtpd.org/">OpenSMTPD</a>. En quelques mots OpenSMTPD c'est facile à configurer, 
avec une licence logicielle sympa, écrit en C, fonctionne sur beaucoup de plateformes et avec une attention 
particulière pour la sécurité et la stabilité. J'ai essayé OpenSMTPD et comparé aux deux autres, 
c'est le jour et la nuit !
<u>Moins d'administration système, plus sûr, plus simple</u>.
</p>

<h3>Configurer OpenSMTPD</h3>
<p>
Opensmtpd va avoir besoin d'un utilisateur pour envoyer les emails ({$ user $}) et d'un hostname 
configuré correctement (mail.{$ domain $}).
</p>
<p>
Ajout d'un utilisateur à notre système :
</p>
<pre><code>useradd -m -u 5000 {$ user $} -d /home/{$ user $}/
</code></pre>
<p>
Ajouter un mot de passe à notre utilisateur:
</p>
<pre><code>passwd {$ user $}
</code></pre>
<p class="help-block">
C'est le mot de passe qui vous permettra de consulter vos emails via le protocole IMAP.
</p>
<p>
Éditer le fichier <code>/etc/hosts</code> :
</p>
<pre><code>127.0.0.1 mail.{$ domain $} mail localhost
</code></pre>
<p>
Et configurer notre hostname en éditant le fichier <code>/etc/hostname</code> :
</p>
<pre><code>mail.{$ domain $}
</code></pre>
<p>
OpenSMTPD va utiliser le hostname dans sa conversation SMTP avec les autres serveurs mails.
</p>
<p>
N'oubliez pas de copier certificate.{$ domain $}.crt dans le dossier 
<code>/etc/ssl/certs/</code> et private.{$ domain $}.key dans le dossier <code>/etc/ssl/private</code>.
</p>

<h3>Installer Opensmtpd</h3>
<p>
Sur ubuntu rien de plus simple:
</p>
<pre><code>sudo apt-get install opensmtpd 
</code></pre>
Sur freebsd
<pre><code>pkg install opensmtpd
</code></pre>
<p class="bg-warning">
Pendant l'installation il va vous demander le FQDN (Fully qualified domain name) qui correspond à la partie à 
droite de l'arobase ({$ domain $}) et le nom d'utilisateur sur lequel vont être redirigés les emails root et 
postmaster. Vous pouvez mettre {$ user $}.
</p>

<h3>Envoyer un email</h3>
<p>
Pour envoyer un email, un client mail (thunderbird, mail, etc) communique avec votre serveur mail en SMTP.
Votre client mail s'identifie auprès de votre serveur email. Puis avec quelques commandes demande au serveur 
mail d'envoyer un email. Votre serveur mail communique ensuite à son tour avec le serveur mail de destination 
en SMTP pour relayer votre email.
</p>
<p>
On va commencer par préciser à opensmtpd que toutes les personnes authentifiées ou locales, peuvent envoyer un 
email à n'importe qui. Pour cela on va éditer le fichier <code>/etc/smtpd.conf</code>.
</p>
<p>
Remplacer le contenu du fichier par :
</p>
<pre><code>pki mail.{$ domain $} certificate "/etc/ssl/certs/certificate.{$ domain $}.crt"
pki mail.{$ domain $} key "/etc/ssl/private/private.{$ domain $}.key"

listen on eth0 port 25 hostname mail.{$ domain $} tls pki mail.{$ domain $}
listen on eth0 port 587 hostname mail.{$ domain $} tls-require pki mail.{$ domain $} auth mask-source

accept from local for any relay
</code></pre>
<p class="help-block">recharger le fichier de configuration avec la commande <code>service opensmtpd restart</code></p>
<p>Les deux premières lignes sont faciles à comprendre: on définit deux pki (Public key infrastructure) une pour la 
clef privée (key) et une pour le certificat public. 
</p>
<p>
Ensuite on demande à OpenSMTPD d'écouter sur l'interface réseau eth0 sur les ports 25 et 587, pour le hostname 
mail.{$ domain $}. On utilise le protocole TLS avec les pki définit juste avant. 
Et on autorise l'authentification avec le mot-clef <i>auth</i>.
<i>mask-source</i> permet de cacher le nom de la source de l'email, utile quand on ne veut pas donner trop d'informations. 
(Merci Vigdis pour l'astuce)
</p>
<p>
Les serveurs SMTP communiquent entre leurs ports 25. Alors que notre client mail va communiquer en SMTP sur 
le port 587 en STARTTLS de manière authentifiée et sécurisée. C'est la raison pour laquelle on a deux 
lignes dans le fichier de configuration.
</p>
<p>
La dernière ligne précise que toutes les personnes locales à la machine (ou authentifiées) peuvent relayer 
des emails.
</p>

<h3>Tester l'envoi d'un email</h3>

<p>Pour tester que la communication avec le serveur mail et vérifier que l'authentification fonctionne, on va ouvrir 
une connexion TLS sur notre serveur mail sur le port 587. Nous allons utiliser l'outil openssl installé par défaut.</p>

<p class="help-block">
L'authentification ne marche que sur une connexion sécurisée.
</p>

<pre><code>$ openssl s_client -starttls smtp -connect mail.{$ domain $}:587 -crlf -ign_eof
...
250 HELP
</code></pre>

<p>À ce moment le serveur mail attend qu'on lui dise bonjour. On se présente en tapant la commande EHLO suivi d'un 
identifiant</p>

<pre><code>EHLO moi
</code></pre>
<p>
Le serveur mail répond bonjour, et liste les commandes disponibles:
</p>
<pre><code>EHLO moi
250-mail.{$ domain $} Hello moi [{$ ip$}], pleased to meet you
250-8BITMIME
250-ENHANCEDSTATUSCODES
250-SIZE 36700160
250-AUTH PLAIN LOGIN
250 HELP
</code></pre>
<p>Ensuite on s'authentifie en envoyant une chaine de caractère encodé en base 64 avec la concatenation du nom 
d'utilisateur et du mot de passe avec des séparateurs \000
</p>
<p>Pour générer sa clef d'authentification en javascript (ouvrir sa console): </p>

<pre><code>btoa("\000{$ user $}\000{$ password $}")</code></pre>

<p>Sinon vous pouvez rentrer votre mot de passe et copier le résultat encodé </p>
<br>
<form class="pure-form pure-form-stacked">
    <fieldset>
        <input type="text" name="user" class="form-control" ng-model="user">
        <input type="text" name="password" class="form-control" ng-model="password" ng-init="password">    
        <label>Base64 :</label>
        <input type="text" name="auth" class="form-control" ng-model="auth">
    </fieldset>
</form>
<br>

<p>Maintenant vous pouvez vous authentifier auprès de votre serveur SMTP</p>

<pre><code>AUTH PLAIN {$ auth $}
</code></pre>

<p>OpenSMTPD répond </p>

<pre><code>235 Authentication succeeded
</code></pre>

<p>Maintenant on peut envoyer un email avec les commandes suivantes:</p>

<pre><code>MAIL FROM: <{$ user $}@{$ domain $}>
250 Ok
RCPT TO: <{$ user $}@{$ domain $}>
250 Recipient ok
DATA
354 Enter mail, end with "." on a line by itself
Subject: Test

it works!
.
250 e59bb2aa Message accepted for delivery
quit
221 Bye
read:errno=0
</code></pre>

<p>L'email n'arrivera certainement jamais, mais l'envoi fonctionne, passons à la récupération des emails.</p>

<h3>Reception SMTP d'un email</h3>
<p>Nous allons éditer notre fichier <code>/etc/smtpd.conf</code> une dernière fois:</p>

<pre><code>pki mail.{$ domain $} certificate "/etc/ssl/certs/certificate.{$ domain $}.crt"
pki mail.{$ domain $} key "/etc/ssl/private/private.{$ domain $}.key"

listen on eth0 port 25 hostname mail.{$ domain $} tls pki mail.{$ domain $}
listen on eth0 port 587 hostname mail.{$ domain $} tls-require pki mail.{$ domain $} auth mask-source

accept from local for any relay

table aliases file:/etc/aliases
accept from any for domain "{$ domain $}" alias &lt;aliases&gt; deliver to maildir "~/mails"
</code></pre>
<p class="help-block">recharger le fichier de configuration avec la commande <code>service opensmtpd restart</code></p>
<p>On rajoute les deux dernières lignes pour la réception des emails, une pour décrire le chemin d'une table d'aliases,
et une pour signifier à OpenSMTPD de transférer tous les emails à destination d'{$ domain $} dans le dossier mail de
chaque utilisateur décrit dans la table <code>/etc/aliases</code>.
</p>

<p>Le fichier <code>/etc/aliases</code> ressemble à ça : </p>

<pre><code>root: {$ user $}
postmaster: root
webmaster: root
contact: {$ user $}
</code></pre>

<p>Tous les emails root@{$ domain $}, postmaster@{$ domain $}, webmaster@{$ domain $} et contact@{$ domain $} sont des
aliases pour {$ user $}@{$ domain $}. Chaque fois qu'un email est envoyé à un de ces comptes, l'email arrive dans le 
dossier /home/{$ user $}/mails/
</p>

<p>C'est terminé pour la partie serveur mail, 7 lignes de configuration !
Si vous voulez faire évoluer cette configuration et rajouter des fonctionnalités, je vous invite à lire la 
<a href="https://www.opensmtpd.org/smtpd.conf.5.html">documentation</a></p>


<h3>IMAP, récupérer ses emails</h3>
<p>Pour récupérer ses emails avec son client mail, nous allons utiliser un protocole: l'IMAP 
(Internet Message Access Protocol). Pour configurer l'IMAP, nous allons utiliser l'outil <code>dovecot</code>.</p>
<p>
Pour l'installer sur ubuntu rien de plus simple:
</p>
<pre><code>sudo apt-get install dovecot-imapd 
</code></pre>
Sur freebsd
<pre><code>pkg install mail/dovecot
</code></pre>
<p class="bg-warning">Refusez la création d'un certificat, puisque nos certificats existent déjà.</p>

<h3>Configurer Dovecot</h3>
<p>
Je trouve la configuration de Dovecot compliqué à comprendre. Alors j'ai tendance à vider le dossier de configuration 
la première fois.
</p>
<pre><code>rm -rf /etc/dovecot/*
touch /etc/dovecot/dovecot.conf</code></pre>
<p>
Pour configurer Dovecot, nous allons éditer le fichier <code>/etc/dovecot/dovecot.conf</code>:</p>

<pre><code>
protocols = imap
ssl = yes
ssl_cert = </etc/ssl/certs/certificate.{$ domain $}.crt
ssl_key = </etc/ssl/private/private.{$ domain $}.key
ssl_client_ca_dir = /etc/ssl/certs
mail_location = maildir:~/mails
listen = *

userdb {
  driver = passwd
  args = blocking=no
}

passdb {
  driver = pam
  args = 
}
</code></pre>

<p>Je vais pas épiloguer sur cette configuration très longtemps. Notez la présence de nos certificats générés plus tôt.
Nous communiquons en ssl. Nous utilisons l'authentification pam pour se connecter à la machine en IMAP seulement.
</p>
<p>C'est terminé pour la partie IMAP, 15 lignes de configuration !</p>

<h3>Client mail</h3>
<p>
Voici les informations de connexion à mettre dans votre client mail.
Pour consulter ses mails en IMAP :
</p>
<ul>
    <li>Serveur imap: mail.{$ domain $}</li>
    <li>Nom d'utilisateur: {$ user $}</li>
    <li>Mot de passe: {$ password $}</li>
    <li>Port: 993</li>
    <li>Utilisez SSL: oui</li>
</ul>
<p>Pour envoyer des emails en SMTP:</p>
<ul>
    <li>Serveur smtp: mail.{$ domain $}</li>
    <li>Nom d'utilisateur: {$ user $}</li>
    <li>Mot de passe: {$ password $}</li>
    <li>Port: 587</li>
    <li>Utilisez SSL: oui</li>
</ul>

<h3>DNS & SPF</h3>
<p>Maintenant que tout fonctionne bien, nous allons augmenter nos TTL sur nos DNS et rajouter une protection 
de notre nom de domaine : le SPF.
</p>
<p>Pour augmenter le TTL, il suffit de changer la valeur de 300 précédemment définit dans nos DNS et de monter cette
valeur à 86400 secondes (1 journée) minimum, valeur recommendée par la <a href="http://tools.ietf.org/html/rfc1033">RFC 1033</a>
</p>
<p>Le SPF (Sender Policy Framework) est une protection pour éviter que des personnes envoient des emails avec votre nom
de domaine. Il faut donc rajouter un enregistrement TXT dans nos DNS en précisant que seul le serveur mail de oslab.fr
a le droit d'envoyer des emails.</p>

<pre><code>{$ domain $}. IN TXT "v=spf1 mx mx:{$ domain $} -all"
</code></pre>

<h3>Merci</h3>
<p>Pour terminer, j'aimerais remercier les lecteurs attentifs et le 
<a href="https://twitter.com/CollectifGiroll">collectif GIROLL </a> qui m'a permis de tester ce tutoriel en vrai. 
Si vous avez aimé ce tutoriel, n'hésitez pas à proposer des améliorations en pull request sur 
<a href="https://github.com/guillaumevincent/guillaumevincent.com">github</a>. Il est fort possible qu'il y ait des 
fautes, n'hésitez pas à me ping sur <a href="https://twitter.com/guillaume20100">twitter</a> si tel est le cas.</p>
</div>
