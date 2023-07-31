# Notes de cours

On préfèrera utiliser let ou const au lieu de var car cela résuit le risque d'erreur et permet de mieux gérer les valeurs immuables.

## Les opérateurs :

Les opérateurs sont utilisé pour effetuer des calculs sur des valeurs stocké en variables. Il y a l'addition, la soustraction, la multiplication, la division et le modulo.

### Exemple :

*const arr1 = [1, 2, 3];*
*const arr2 = [4, 5, 6];*

*const arr3 = [...arr1, ...arr2];*

*console.log(arr3); // Output: [1, 2, 3, 4, 5, 6]*

## L'opérateur de reste :

L'opérateur de reste est employé pour rassembler une liste de paramètres au sein d'une fonction ou pour récupérer les éléments restants d'un tableau.

### Exemple : 

*function sum(...args) {*

*let total = 0;*

*for (let i = 0; i < args.length; i++) {*

*total += args[i];*

*}*

*return total;*

*}*

*console.log(sum(1, 2, 3, 4)); // Output: 10*

## L'opérateur ternaire

C'est une version abrégée de l'instruction "if/esle". Il permet d'écrire une expression conditionnelle sur une seul ligne.

### Exemple : 

*condition ? valeurVrai : valeurFausse*

## La fonction sort : 

*compareFn(a, b) ---> > 0 : a after b | < 0 : a before b | === 0 : original order*

# L'API

API : Faire la liaison entre 2 PCs. 

Par abus de language on appelle aussi un API, une appli située sur un serveur.

les API exposes des ressources. Chaque URLs nous donne de URIs via des requêtes qui nous donne des données.

API → RESTful désigne un ensemble de convention et de règle connu sous le non de “Représentational state transfert” (standard de construction des APIs).

WEATHER FORECAST API (prédiction du temps) liste d’URIs 

le client désigne la machine qui va chercher la ressource sur un serveur, une API.

message commence VERB /resource et des headers (metadonnée relié a la requête http) 

une seul combinaison unique VERB / ressource (endpoint) 

Headers : 

- accept → appli/Json
- authorization → si le droit ou non d’effectuer la requête
- body →

VERB = GET / POST (créer une ressource) / PATCH (mettre a jour) / PUT / DELETE (supprimer une ressource)

réponse → code de statut (status code) ex : 404 not found 

API est stateless (les deux partie ne stock aucune info sur la communication et chaque cycle de REQ / RES prenne en info juste ce qu’elle ont besoin) → pas d’info sur les machines.

LAMP → linux apache mysql php

MERN → mangodb express react nodejs