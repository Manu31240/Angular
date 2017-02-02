(function () {
    'use strict';

    // function ContactListController(ContactService) {
    //     var vm = this;
    //
    //     ContactService.getAllContacts().then(function(response) {
    //         vm.contacts = response.data;
    //     });
    // }
    //
    // ContactListController.$inject = [ 'ContactService' ];

    function ContactListController(ContactResource) {
        var vm = this;

        vm.contacts = ContactResource.query();
    }

    ContactListController.$inject = [ 'ContactResource' ];

    angular
        .module('zenContact.sections')
        .controller('ContactListController', ContactListController);

})();
