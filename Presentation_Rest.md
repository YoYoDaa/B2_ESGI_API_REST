# Présentation Rest

## L'API

Une API est un ensemble de règles et de protocoles qui permettent à différentes applications ou logiciels de communiquer et d'interagir entre eux de manière standardisée. Elle définit les méthodes et les formats de données utilisés pour l'échange d'informations, facilitant ainsi l'intégrationventre les systèmes informatiques. En d'autres termes, une API permet à des programmes de travailler ensemble de manière efficace.

## L'API REST

Une API REST (API Representational State Transfer) est un style d'architecture logicielle utilisé pour concevoir des services web. Elle repose sur des principes fondamentaux qui permettent de créer des interfaces web simples, flexibles, et évolutives pour communiquer entre différentes applications.

### De quoi est composé une API REST :

**Architecture Client-Serveur :** L'architecture REST repose sur un modèle client-serveur, où le client envoie des requêtes à un serveur.

**Sans état (Stateless) :** Chaque requête du client au serveur doit contenir toutes les informations nécessaires pour comprendre et traiter cette requête. Le serveur ne stocke aucune information sur l'état de la session du client entre les requêtes. Cela signifie qu'une requête peut être traitée de manière indépendante.

**Opérations standardisées :** Les opérations sur les ressources exposées par l'API REST sont effectuées en utilisant les verbes standard du protocole HTTP. GET, POST, PUT, DELETE, etc.

**Ressources et Manipulation:** Les données sont représentées sous forme de ressources. Chaque ressource est identifiée par une URI.
**URI** : Une URI est une chaîne de caractères qui identifie de manière unique une ressource, telle qu'un fichier, une page web ou une API, sur un réseau.
Les ressources sont souvent des formats de données tels que JSON ou HTML.

**Sécurité :** Les API REST peuvent utiliser différents mécanismes de sécurité, tels que l'authentification via des jetons d'accès (tokens) ou des clés API (API keys), pour protéger les ressources et les données sensibles.

### Pour conclure : 
En respectant ces principes, une API REST offre une manière standardisée et efficace de communiquer entre différentes applications, facilitant ainsi l'intégration et l'interopérabilité des systèmes. C'est pourquoi les API REST sont largement utilisées dans le développement web et dans la construction d'applications.