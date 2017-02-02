(function () {
    'use strict';

    function ContactListController(ContactResource) {
        var vm = this;

        vm.contacts = ContactResource.query();
    }

    ContactListController.$inject = [ 'ContactResource' ];

    angular
        .module('zenContact.sections')
        .controller('ContactListController', ContactListController);

})();
