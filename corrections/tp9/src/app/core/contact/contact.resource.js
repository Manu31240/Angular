(function () {
    'use strict';

    function contactResourceConfig($resourceProvider) {
        $resourceProvider.defaults.actions.update = {
            method: 'PUT',
            params: { id: '@id' }
        };
    }

    function ContactResource($resource) {
        return $resource('/rest/contacts/:id', { id: '@id' });
    }

    contactResourceConfig.$inject = [ '$resourceProvider' ];
    ContactResource.$inject = [ '$resource' ];

    angular
        .module('zenContact.core')
        .config(contactResourceConfig)
        .factory('ContactResource', ContactResource);

})();
