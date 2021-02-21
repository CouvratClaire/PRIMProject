## Site de tests d'intégration 3D

## Conditions

Pour pouvoir faire fonctionner ce thème, il est nécessaire d'avoir installé les dépendances ci-dessous :

- [WordPress](https://wordpress.org/) >= 4.7
- [PHP](https://secure.php.net/manual/en/install.php) >= 7.1.3 (with [`php-mbstring`](https://secure.php.net/manual/en/book.mbstring.php) enabled)
- [Composer](https://getcomposer.org/download/)
- [Node.js](http://nodejs.org/) >= 8.0.0
- [Yarn](https://yarnpkg.com/en/docs/install)

## Installer le thème dans un wordpress bedrock

1. Installer Brew, Composer puis Valet sur l'ordinateur

```# Install PHP 7.0
$ brew install homebrew/php/php70

# Install Valet
$ composer global require laravel/valet

# Install DnsMasq and configure Valet to launch on system start
$ valet install

# Install MariaDB
$ brew install mariadb
```

2. Dans le dossier où l'on veut installer le site wordpress, faire
   `valet park`

3. Créer un site wp avec bedrock :

```
$ wp package install aaemnnosttv/wp-cli-valet-command:^1.0
$ wp valet new my-project --project=bedrock
```

4. Vous pouvez ensuite accèder à votre site wp sur http://my-project.test.

5. Copier le thème de ce projet et le coller dans le dossier /themes de votre Wordpress

6. Activer le thème

## Utiliser le thème

Pour utiliser le thème une fois activé:

- Créer une page Homepage dans le wordpress.
- Dans cette page:
  - Ajouter et remplir le bloc Guthemberg "Cover-Sleeve" si vous désirer un slider de grandes images
  - Ajouter et remplir le bloc Guthemberg "Main Gallery" avec vos produits
- Pour chaque produit : Ajouter une page produit (Le nom de la page doit correspondre au champs "Nom de page" du bloc "Main Gallery")
  - Dans cette page, ajouter et remplir le bloc Guthemberg "Product"

En ce qui concerne les fichiers 3D:

- Ils doivent être exportés en format .glb et collés dans le dossier /ressources/assets/images du thème
- Il est nécessaire que les objets 3D soient au centre 0,0,0 de la grille 3D et qu'il soient entre 20cm et 4m de largeur ou de hauteur.
- Il suffit ensuite de donner leur nom dans le champs "Nom de la scène 3D" du bloc "Product"

En ce qui concerne les environnement map:

- Si elles sont en forme de cube, il faut les mettre dans un dossier dans le dossier /ressources/assets/images du thème.
- Sinon, il suffit de coller l'image dans le dossier /ressources/assets/images du thème.
- Il suffit ensuite de donner le nom du fichier ou du dossier dans le champs "Nom de l'image de fond" du bloc "Product"

En ce qui concernet les vidéos d'animations:

- Il faut les coller en format .mp4 ou .webm dans le dossier /ressources/assets/images/videos du thème.
- Il suffit ensuite de donner le nom de la vidéo dans le champs "Nom de la vidéo" du bloc "Main Gallery"

## Structure du thème

```shell
themes/threeWp/   # → Racine du thème
├── app/                  # → Thème PHP (Vient de sage)
│   ├── Controllers/      # → Controller files
│   ├── admin.php         # → Installation des customization du thème
│   ├── filters.php       # → Filtres du thèmes
│   ├── helpers.php       # → Fonctions helpers
│   └── setup.php         # → Fichier d'installation du thèmes
├── composer.json         # → Chargement automatique des fichiers de 'app/'
├── composer.lock         # → Fichier Composer lock (Ne jamais éditer)
├── dist/                 # → Assets du thème construits (Ne jamais éditer)
├── node_modules/         # → Node.js packages (Ne jamais éditer)
├── package.json          # → Node.js dependencies and scripts
├── resources/            # → Thème assets et templates
│   ├── assets/           # → Assets Front-End
│   │   ├── config.json   # → Paramètre pour la compilation des assets
│   │   ├── build/        # → Webpack et ESLint configuration
│   │   ├── fonts/        # → Theme polices
│   │   ├── images/       # → Theme images
│   │   ├── scripts/      # → Theme JS
│   │   └── styles/       # → Theme stylesheets
│   ├── functions.php     # → Composer autoloader, theme includes
│   ├── index.php         # → Never manually edit
│   ├── screenshot.png    # → Theme screenshot for WP admin
│   ├── style.css         # → Theme meta information
│   └── views/            # → Theme templates html
│       ├── blocks/       # → Blocs Guthenberg personalisés
│       ├── components/   # → Composants des blocs Guthenberg
│       ├── layouts/      # → Templates de base
│       └── partials/     # → Templates partiels
└── vendor/               # → Composer packages (never edit)
```

## Développement du thème

- Lancer `yarn` depuis le répertoire du thème pour installer les dépendances
- Mettre à jour le fichier `resources/assets/config.json`:
  - `devUrl` doit être le nom de votre développement local
  - `publicPath` représente votre structure de dossier WordPress

### Commandes de construction

- `yarn start` — Compile les assets lorsque des changements sont faits dans les fichiers / Démarre la session localhost.
- `yarn build` — Compile et optimise les fichiers dans le répertoire assets
- `yarn build:production` — Compile les assets pour une production
