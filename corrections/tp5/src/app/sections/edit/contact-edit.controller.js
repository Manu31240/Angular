(function () {
    'use strict';

    function ContactEditController($routeParams, ContactService) {
        var vm = this;

        var contactId = parseInt($routeParams.id);
        vm.contact = ContactService.getContactById(contactId);
    }

    ContactEditController.$inject = [
        '$routeParams',
        'ContactService'
    ];

    angular
        .module('zenContact.sections')
        .controller('ContactEditController', ContactEditController);

})();
