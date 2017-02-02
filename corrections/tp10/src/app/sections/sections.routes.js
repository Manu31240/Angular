(function () {
    'use strict';

    function sectionsRoutes($routeProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: 'app/sections/list/list.html',
                controller: 'ContactListController',
                controllerAs: 'list'
            })
            .when('/edit', {
                templateUrl: 'app/sections/edit/edit.html',
                controller: 'ContactEditController',
                controllerAs: 'edit'
            })
            .when('/edit/:id', {
                templateUrl: 'app/sections/edit/edit.html',
                controller: 'ContactEditController',
                controllerAs: 'edit'
            })
            .when('/login', {
                templateUrl: 'app/sections/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            });

        $routeProvider.otherwise('/list');
    }

    sectionsRoutes.$inject = [ '$routeProvider' ];

    angular
        .module('zenContact.sections')
        .config(sectionsRoutes);

})();
