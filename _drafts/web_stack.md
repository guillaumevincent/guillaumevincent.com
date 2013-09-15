Stack Web
Intro
Simple et robuste ; voilà deux mots qui décrivent ma philosophie quand je développe du logiciel. J'évite au maximum les tâches inutiles et j'essaye en permanence d'améliorer ma stratégie de developement.
En ce moment je développe des applications web (tu sais maman des sites internets) et j'essaye de me construire un environnement logiciel qui me convienne. Je commence à aimer le langage javascript, petit à petit. Une des raisons est que j'ai amélioré ma méthodologie de travail pour arriver à quelque chose de simple et robuste.

Les tests !
Les tests javascript, c'est dur
Oui maman on commence par les tests, « test first » maman ! Bon je te l'accorde tester du javascript c'est dur. Le javascript est un langage qui la plus part du temps s'exécute coté client. On se retrouve souvent à devoir tester du javascript dans chaque navigateur. C'est long, répétitif et barbant. Alors j'ai trouvé la solution : Karma

Sans rentrer dans les détails, Karma vient lire un fichier de configuration, ouvrir un ou plusieurs navigateurs en tache de font, exécuter mes tests javascript écrits avec jasmine ou qunit et afficher le tout en une fraction de seconde dans la console. Plus besoin d'ouvrir chaque navigateur pour voir visuellement le résultat. Tout se passe en console, dès que j'enregistre un fichier, karma exécute les tests et affiche le résultat dans ma console.

NodeJS
NodeJS est un excellent serveur javascript qui à la particularité de gérer correctement les requètes concurrentes et qui a un excellent gestionnaire de packet javascript. Karma est un de ces paquets.

Donc j'installe NodeJS et karma :

sudo add-apt-repository ppa:chris-lea/node.js  
sudo apt-get update  
sudo apt-get install nodejs
sudo npm install -g karma
installe Karma de manière globale (-g) avec le gestionnaire de paquets de NodeJS (npm)
Ma structure de dossiers
Cette structure est celle que j'utilise en ce moment, elle sera différente demain. Mais ça va m'aider à expliquer le déroulement des tests javascript.

L'ensemble de mes fichiers statiques se trouvent dans un dossier static/
Mes tests dans un dossier tests
Mon application dans un dossier du nom de l'application (app)

Les fichiers javascript se trouvent donc dans le dossier static/js

static/
	--js/
	--font/
	--css/
	--img/
	--coffee/
tests/
	--js/
	--python/
app/
	--template/
		index.html

Si votre application n'est pas en full javascript j'aime ranger dans des dossiers séparés mon code de test client.

Karma
Karma est relativement simple à parametrer. Il suffit de créer un fichier javascript de configuration. Le plus simple reste néanmoins de lancer :
karma init

et de suivre les instructions. J'aime mettre mes fichiers de configuration de mes « tests runners » directement dans le dossier tests.
cd mon_projet/tests/
karma init
karma start karma.conf.js

Karma ouvre les navigateurs renseignés dans le fichier de configuration, et charge une page sur un serveur de test local.
Dans la liste des fichiers à charger dans votre navigateur, vous devez rajouter les fichiers statiques que vous créez
    '../static/js/*.js',

et les fichiers de tests
    'js/*.js'

Ensuite karma détecte les tests, et les exécutes sur chacun des navigateurs ouvert.
