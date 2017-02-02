(function () {
    'use strict';

    function ContactListController(ContactService) {
        var vm = this;

        vm.contacts = ContactService.getAllContacts();
    }

    ContactListController.$inject = [ 'ContactService' ];

    angular
        .module('zenContact.sections')
        .controller('ContactListController', ContactListController);

})();
