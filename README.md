# TP4 - Gestion des commandes

## Description

Ce projet est une application web faite en JavaScript. Elle affiche des commandes, des clients et des produits.

Les informations viennent de trois fichiers JSON. Elles sont liées entre elles grâce à des identifiants (`customerId` et `productId`). Le programme charge les fichiers avec `fetch()`, les garde dans un état central (le state), calcule les montants, puis affiche le résultat dans une page avec Bootstrap.

## Structure du projet

Le projet est organisé en plusieurs dossiers :

- **index.html** : la page principale de l'application.
- **css/** : contient `style.css`, le style personnalisé.
- **data/** : contient les trois fichiers de données.
  - `customers.json` : la liste des clients.
  - `products.json` : la liste des produits.
  - `orders.json` : la liste des commandes.
- **js/** : contient le code JavaScript, séparé en cinq fichiers.

### Rôle des fichiers JavaScript

| Fichier | Rôle |

| `state.js` | Garde en mémoire les données et les choix de l'utilisateur |
| `dataService.js` | Charge les trois fichiers JSON avec `fetch()` |
| `selectors.js` | Cherche, relie, filtre et calcule les données |
| `view.js` | Affiche les informations dans la page |
| `app.js` | Lance l'application et gère les événements |

Les fichiers communiquent entre eux avec `import` et `export`.

## Fonctionnalités principales

- Chargement des trois fichiers JSON avec `fetch`, `async/await` et `try/catch`
- Liaison des commandes avec les clients et les produits grâce aux identifiants
- Calcul du montant de chaque ligne et du total de chaque commande
- Affichage des indicateurs : nombre de clients, de produits, de commandes et montant cumulé
- Recherche d'une commande par nom de client
- Filtre par statut de commande (Livree, En attente, Annulee)
- Filtre par catégorie de produit
- Les recherches et les filtres peuvent être utilisés en même temps
- Affichage du détail d'une commande dans une fenêtre Bootstrap
- Gestion des erreurs : message dans la console et message dans la page si un fichier ne se charge pas

## Lancer le projet

Le projet utilise `fetch()` et des modules JavaScript. Il faut donc un serveur local pour le lancer, on ne peut pas juste ouvrir le fichier `index.html`.

1. Ouvrir le dossier du projet dans VS Code.
2. Installer l'extension **Live Server**.
3. Faire un clic droit sur `index.html`, puis choisir **Open with Live Server**.
4. La page s'ouvre dans le navigateur.