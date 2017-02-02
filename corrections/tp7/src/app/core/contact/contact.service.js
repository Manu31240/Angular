(function () {
    'use strict';

    function ContactService($http) {
        var route = '/rest/contacts';

        this.getAllContacts = function() {
            return $http.get(route);
        };

        this.getContactById = function(contactId) {
            return $http.get(route + '/' + contactId);
        };

        this.saveContact = function(contact) {
            if (angular.isDefined(contact.id)) {
                return $http.put(route + '/' + contact.id, contact);
            }
            return $http.post(route, contact);
        };
    }

    ContactService.$inject = [ '$http' ];

    angular
        .module('zenContact.core')
        .service('ContactService', ContactService);

})();
