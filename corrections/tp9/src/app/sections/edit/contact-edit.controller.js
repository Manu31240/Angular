(function () {
    'use strict';

    function ContactEditController($routeParams, $location, ContactResource) {
        var vm = this;

        var contactId = $routeParams.id;
        if (angular.isDefined(contactId)) {
            vm.contact = ContactResource.get({ id: contactId });
        } else {
            vm.contact = new ContactResource();
        }

        function redirectToList() {
            $location.path('/list');
        }

        vm.saveContact = function(contact) {
            if (angular.isDefined(contact.id)) {
                contact.$update(redirectToList);
            } else {
                contact.$save(redirectToList);
            }
        };
    }

    ContactEditController.$inject = [
        '$routeParams',
        '$location',
        'ContactResource'
    ];

    angular
        .module('zenContact.sections')
        .controller('ContactEditController', ContactEditController);

})();
