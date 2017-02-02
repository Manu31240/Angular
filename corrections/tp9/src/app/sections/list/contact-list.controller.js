(function () {
    'use strict';

    function ContactListController(ContactResource) {
        var vm = this;

        vm.contacts = ContactResource.query();

        vm.nameFilter = function(contact) {
            if (!vm.search) {
                return true;
            }
            var regexp = new RegExp(vm.search, 'i');
            return contact.firstName.match(regexp) || contact.lastName.match(regexp);
        };
    }

    ContactListController.$inject = [ 'ContactResource' ];

    angular
        .module('zenContact.sections')
        .controller('ContactListController', ContactListController);

})();
