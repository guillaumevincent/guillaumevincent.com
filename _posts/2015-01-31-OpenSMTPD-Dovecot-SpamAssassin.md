---
layout: post
title: OpenSMTPD, Dovecot and SpamAssassin
author: gvincent
lang: fr
tags: mail opensmtpd dovecot spamassassin
---

 
How to run your own email server with your own domain ?
This is the TLDR (Too long; didn't read) version of the most popular post on my blog!
In this post, I explained how to configure OpenSMTPD, Dovecot and SpamAssassin to take your email back.

<!--more-->
<h1>Requirements</h1>
<ul>
<li>a personal server with a recent operating system (Ubuntu 14.04 or FreeBSD 9.3)</li>
<li>a domain name</li>
<li>TLS certificate to encrypt communications between your mail client and server. You need the private key of the 
certificate that often ends with .key (eg private.oslab.fr.key) and public certificate that ends with .crt or .pem 
(eg certificate.oslab.fr.crt) <a href="https://help.ubuntu.com/12.04/serverguide/certificates-and-security.html">see how to generate the certificate on ubuntu</a></li>
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
To customize this tutorial you can enter your email and IP address of your server. I do not collect any information.
AngularJS modify this page to add relevant and personalized information. You can look at the source code of the page :)
If you do not trust me, you can leave the default information.
</aside>
</p>

<div ng-app="EmailModule" ng-controller="EmailCtrl">
 
    <form class="pure-form pure-form-stacked">
        <fieldset>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" class="form-control" ng-model="email">
            <label for="ip">Ip of your server</label>
            <input type="text" id="ip" name="ip" class="form-control" ng-model="ip">
        </fieldset>
    </form>

<br>

<h1>OpenSMTPD</h1>

<p>
The most important part of your server is the Mail Transfer Agent (MTA).
This is the core application that actually transmits email around between email servers.
There are many MTA as OpenSMTPD, Exim, Sendmail, Postfix, Qmail, Sendmail, etc.
I choose OpenSMTPD because is secure, fast, simple to configure and is now the Default MTA in OpenBSD.
</p>

<h2>A home for your mails</h2>
<p>Opensmtpd need a place to send emails you received. So we are going to create a user: ({$ user $}).</p>

<p>Add a user to our system:</p>
<pre><code>useradd -m -u 5000 {$ user $} -d /home/{$ user $}/</code></pre>

<p>Add a password to our user:</p>
<pre><code>passwd {$ user $}</code></pre>

<br>

<h2>Certificates</h2>

<p>
Copy certificate.{$ domain $}.crt in <code>/etc/ssl/certs/</code> and private.{$ domain $}.key in <code>/etc/ssl/private</code>.
</p>


<br>

<h2>Install Opensmtpd</h2>
<p>
To install Opensmtpd on Ubuntu run the command:
</p>
<pre><code>sudo apt-get install opensmtpd</code></pre>

<p>On Freebsd</p>
<pre><code>pkg install opensmtpd</code></pre>

<p>
During installation it will ask you the FQDN (Fully qualified domain name) that corresponds to the right part of the arobase ({$ domain $}) and the user name that will be redirected root and emails postmaster. 
You can put {$ user $}.
</p>


<p>We can now edit our OpenSMTPD conf file <code>/etc/smtpd.conf</code> :</p>
<pre><code>pki mail.{$ domain $} key "/etc/ssl/private/private.{$ domain $}.key"
pki mail.{$ domain $} certificate "/etc/ssl/certs/certificate.{$ domain $}.crt"

listen on eth0 port 25 hostname mail.{$ domain $} tls pki mail.{$ domain $}
listen on eth0 port 587 hostname mail.{$ domain $} tls-require pki mail.{$ domain $} auth mask-source

accept from local for any relay

table aliases file:/etc/aliases
accept from any for domain "{$ domain $}" alias &lt;aliases&gt; deliver to maildir "~/mails"
</code></pre>


<p>
The first two lines are easy to understand: we define two PKI (public key infrastructure) one for the private key and one for the public certificate.
</p>
<p>
Then we ask OpenSMTPD to listen on eth0 network interface on ports 25 and 587 for the hostname mail.{$ domain $}. We use TLS connection with the pki defined just before. We allows authentication and mask the source on port 587. Port 587 will be use by your email client to send en email through OpenSMTPD.
</p>
<p>
The next line specifies that all local user (or authenticated) can relay emails.
</p>

<p>The penultimate line describe the path of an aliases table.</p>

<p><code>/etc/aliases</code> file looks like : </p>

<pre><code>root: {$ user $}
postmaster: root
abuse: root
contact: {$ user $}
</code></pre>

<p>Every emails root@{$ domain $}, postmaster@{$ domain $}, webmaster@{$ domain $} and contact@{$ domain $} are aliases for {$ user $}@{$ domain $}.
</p>

<p>The last line lets OpenSMTPD to transfer all emails destined for oslab.fr in the email folder for each user described in the <code>/etc/aliases</code> table.
Every time an email is sent to one of these accounts, the email arrives in the /home/{$ user $}/mails/ folder.</p>


<p>That's it for the email server part, lines 7 configuration! If you want to change this configuration and add features, I invite you to read the documentation <a href="https://www.opensmtpd.org/smtpd.conf.5.html">documentation</a></p>




<h1>Configure the DNS</h1>
<p>
A mail server need to know where the mail server for {$ domain $} is. Here is my configuration for my domain:
</p>


<pre><code>{$ domain $}.                 300  MX     10 mail.{$ domain $}.
mail                      300  A      {$ ip $}
{$ domain $}.                 IN   TXT    "v=spf1 mx mx:{$ domain $} -all"
</code></pre>

<p>MX record indicate where our mail server is. 
According to the <a href="http://www.rfc-editor.org/rfc/rfc2181.txt">DNS RFC</a>, an MX record must point to a subdomain, then this subdomain must point to an IP address.
</p>

<p>The last line sets the SPF (Sender Policy Framework), a protection to prevent people sending emails with your name
domain.</p>

<p>At the end when everything works it is recommended to increase the TTL to avoid problems such as those <a href="https://medium.com/p/24eb09e026dd">encountered by@ N</a></p>


<h1>IMAP, get your emails</h1>
<h2>Install Dovecot</h2>
<p>
To retrieve emails with his mail client, we will use a protocol: IMAP (Internet Message Access Protocol). To configure IMAP, we will use Dovecot.
</p>

<p>
To install Dovecot on Ubuntu run the command:
</p>
<pre><code>sudo apt-get install dovecot-imapd</code></pre>

<p>On Freebsd</p>
<pre><code>pkg install mail/dovecot</code></pre>

<p>During installation reject the creation of a certificate because our certificates already exist.</p>

<h2>Configure Dovecot</h2>
<p>Edit the <code>/etc/dovecot/dovecot.conf</code> file :</p>


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

<p>For Dovecot configuration, there is not much to add. We add the certificate and use the Pluggable Authentication Module (pam) for the IMAP authentication.
</p>



<h1>Mail Client</h1>

<p>To test and see if everything work fine here the information to add in our mail client.</p>
<p>To check our emails with IMAP :</p>
<ul>
    <li>IMAP Mail Server: mail.{$ domain $}</li>
    <li>Username: {$ user $}</li>
    <li>Password: {$ password $}</li>
    <li>Port: 993</li>
    <li>use SSL: yes</li>
</ul>
<p>To send emails via SMTP:</p>
<ul>
    <li>SMTP Mail Server: mail.{$ domain $}</li>
    <li>Username: {$ user $}</li>
    <li>Password: {$ password $}</li>
    <li>Port: 587</li>
    <li>use SSL: yes</li>
</ul>

<h1>SpamAssassin</h1>
<p>If you want to install SpamAssassin with your OpenSMTPD, you will need spampd (Spam Proxy Daemon).</p>
<p>To install spampd on Ubuntu run the command:</p>
<pre><code>sudo apt-get install spampd</code></pre>


<p>We need to tell OpenSMTPD to relay every mail on unix socket through port 10025, and tag every mail coming from port 10026 and deliver it to maildir. Spampd listens on port 10025 on the same host as the internal mail server and will send back to port 10026 mails filtered.</p>


<p>We can edit our OpenSMTPD conf file <code>/etc/smtpd.conf</code> :</p>

<pre><code>pki mail.{$ domain $} key "/etc/ssl/private/private.{$ domain $}.key"
pki mail.{$ domain $} certificate "/etc/ssl/certs/certificate.{$ domain $}.crt"

listen on eth0 port 25 hostname mail.{$ domain $} tls pki mail.{$ domain $}
listen on eth0 port 587 hostname mail.{$ domain $} tls-require pki mail.{$ domain $} auth mask-source

table aliases file:/etc/aliases
accept from any for domain "{$ domain $}" relay via "smtp://127.0.0.1:10025"

listen on lo port 10026 tag Filtered
accept tagged Filtered for any alias &lt;aliases&gt; deliver to maildir "~/mails"

accept from local for any relay</code></pre>


<p>We need to enable spampd:</p> 
<p>Change <code>STARTSPAMPD</code> to 1 in <code>/etc/default/spampd</code></p>

<p>We need to enable spamassassin:</p>
<p>Change <code>ENABLED</code> to 1 in <code>/etc/default/spamassassin</code></p>


<h1>When everything works well</h1>
<p>Now that everything works well, we will increase our TTL.</p>
<p>To increase TTL, simply change the value 300 previously defined in our DNS and mount this
value 86400 seconds (1 day) minimum value recommended by <a href="http://tools.ietf.org/html/rfc1033">RFC 1033</a>
</p>


<h1>The end</h1>
<p>Did you like this post? Thank me by <a href="https://github.com/guillaumevincent/guillaumevincent.com">improving it </a> or share it on twitter!
</div>
