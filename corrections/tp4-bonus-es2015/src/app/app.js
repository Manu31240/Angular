import angular from '../../node_modules/angular';
import SectionsModule from './sections'

const name = 'zenContact'
angular.module(name, [
    SectionsModule,
    ]);

angular.element(document)
    .ready(() => angular.bootstrap(document, [name]));
