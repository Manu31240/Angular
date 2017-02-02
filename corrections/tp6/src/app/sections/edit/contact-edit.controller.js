(function () {
    'use strict';

    function ContactEditController($routeParams, $location, ContactService) {
        var vm = this;

        var contactId = parseInt($routeParams.id);
        vm.contact = ContactService.getContactById(contactId);

        vm.saveContact = function(contact) {
            ContactService.saveContact(contact);
            $location.path('/list');
        };
    }

    ContactEditController.$inject = [
        '$routeParams',
        '$location',
        'ContactService'
    ];

    angular
        .module('zenContact.sections')
        .controller('ContactEditController', ContactEditController);

})();
