<div class="pb"></div>

## TP4-bonus : Passage en ES2015

Ce TP va nous permettre d'utiliser les dernières nouveautés du langage Javascript en utilisant sa version 2015.

### Module Core

Commençons par modifier notre module `app/core`. Pour notre service `ContactService`, nous allons effectuer quelques transformations :
- suppression des IIFE, suppression du `use strict`
- transformation en classe ES2015
- utilisation des "arrow functions" pour `map` et `filter` (et autre syntaxe ES2015
Pour facilier l'import de nos classes ES2015, nous allons créer un fichier `index.js` par répertoire. Exemple pour `app/core/contact/index.js`
```js
import {ContactService} from './contact.service'

export default ContactService
```


Ensuite, nous allons décaler la création de nos controllers et de nos services dans les fichiers de déclaration de module. Exemple pour `app/core/core.module.js`:
```js
import angular from '../../../node_modules/angular'
import ContactService from './contact'

const name = 'zenContact.core'
angular.module(name, [
    ])
    .service(ContactService.name, ContactService)

export default name
```
A noter que nous exportons par défaut le nom du module pour pouvoir facilement déclarer la dépendance depuis un autre module.
Il faut remarquer que la librairie `angular` est elle-aussi importée. Pour la trouver, nous avons utilisé `npm` pour la télécharger. Pensez à lancer un `npm install angular --save` pour l'obtenir et sauvegarder la dépendance dans le fichier `package.json`.

N'oubliez pas de créer un fichier `index.js` dans le répertoire `app/core` avec :
```
import CoreModule from './core.module'

export default CoreModule
```

## Module Sections
A présent, nous allons modifier les fichiers "controller" pour les transformer en classe. Exemple pour `app/sections/list/contact-list.controller.js`:
```js
export class ContactListController {

    constructor(ContactService) {
        this.ContactService = ContactService
        this.canActivate()
    }

    canActivate() {
        this.contacts = this.ContactService.getAllContacts()
    }
}
```

Continuons avec le fichier des routes `app/sections/sections.routes.js` en déclarant uniquement l'export de la fonction: `export default function sectionsRoutes($routeProvider) {...}`

Enfin, passons maintenant à la déclaration de notre module `sections`. Exemple pour `app/sections/sections.module.js`:
```
import angular from '../../../node_modules/angular'
import angularRoute from '../../../node_modules/angular-route'
import CoreModule from '../core'
import SectionsRoutes from './sections.routes'
import ContactListController from './list'
import ContactEditController from './edit'
import NavbarController from './navbar'

const name = 'zenContact.sections'
angular.module(name, [
        angularRoute,
        CoreModule,
    ])
    .config(SectionsRoutes)
    .controller(ContactListController.name, ContactListController)
    .controller(ContactEditController.name, ContactEditController)
    .controller(NavbarController.name, NavbarController)

export default name
```
Comme pour la librairie `angular`, nous allons ajouter avec `npm` la librairie `angular-route` en faisant `npm install angular-route --save`.

Il ne nous reste plus qu'à modifier notre fichier principal `app/app.js`.
```
import angular from '../../node_modules/angular';
import SectionsModule from './sections'

const name = 'zenContact'
angular.module(name, [
    SectionsModule,
    ]);

angular.element(document)
    .ready(() => angular.bootstrap(document, [name]));
```
Cet ajout de définit correctement quand bootstraper l'application, rendant obsolète l'attribut HTML.
Pensez à modifier notre balise `html` dans notre `index.html`: 
`<html data-ng-app="zenContact" data-ng-strict-di>` devient `<html>`

### Babel

Pour s'assurer de la compatibilité, nous allons utiliser `babel` pour transformer nos classes ES2015 et fichiers compatibles avec les navigateurs. Pour cela, nous allons installer `babel` en tapant un `npm install -g babel-cli` et en installant ce qu'il faut pour transformer depuis ES2015 `npm install babel-preset-es2015 --save-dev`. Pour configurer `babel`, il nous faut un fichier de configuration à la racine de notre projet `.babelrc`:
```
{ "presets": ["es2015"] }
```

Nous pouvons désormais transpiler avec `babel` vers un nouveau répertoire `dist` en faisant `babel src/app -d src/dist`.
Regardez ce que cela donne en parcourrant le répertoire `dist`.

Enfin, pour sauvegarder notre commande, nous allons l'ajouter dans le `package.json` du projet :
```
{
  "name": "zenContact-test",
  "description": "Zen Contact application test",
  "version": "1.0.0",
  "scripts": {
    "babel": "babel src/app -d src/lib"
  },
  ...
}
```
Il suffit de lancer un `npm run babel` pour relancer la transpilation.

On pourrait penser que nous avons terminé notre travail mais le chargement de module n'est pas dans la spécification `ES2015`. Nous allons pour cela utiliser `browserify`.

### Browserify

Browserify est une librairie qui va nous permettre de créer un fichier `bundle.js` contenant l'ensemble de notre projet.
Pour cela, taper `npm install -g browserify`.

Ensuite, il suffira de partir des sources présentes dans `dist` pour créer un fichier `bundle.js` en faisant : `browserify src/lib/app.js -o src/lib/bundle.js`.
Pensez à le sauvegarder dans le `package.json` dans les scripts : `"browserify": "browserify src/lib/app.js -o src/lib/bundle.js"` pour pouvoir lancer une commande `npm run browserify`.

Modifions notre `index.html` pour supprimer les imports javascript à nos fichiers `app/*` et aux librairies `angular` et ajoutons uniquement notre import à `bundle.js` :
```
<script src="lib/bundle.js"></script> 
```

Testons notre application !

Dernier point : Nous pouvons directement créer un bundle cohérent grâce au plugin `babelify` de `browserify`. En une seule commande, nous allons avoir un bundle prêt à emploi. D'abord installez la dépendance à `babelify`en faisant un `npm install babelify --save-dev`. Ajoutez la commande suivante dans le `package.json` dans les scripts : `"bundle": "browserify -e -d src/app/app.js -o src/lib/bundle.js  -t [babelify]"` et tapez `npm run bundle` pour regénérer le fichier `bundle.js`.
