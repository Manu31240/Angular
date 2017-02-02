(function () {
    'use strict';

    // function ContactEditController($routeParams, $location, ContactService) {
    //     var vm = this;
    //
    //     var contactId = $routeParams.id;
    //     if (angular.isDefined(contactId)) {
    //         ContactService.getContactById(contactId).then(function(response) {
    //             vm.contact = response.data;
    //         });
    //     }
    //
    //     vm.saveContact = function(contact) {
    //         ContactService.saveContact(contact).then(function() {
    //             $location.path('/list');
    //         });
    //     };
    // }
    //
    // ContactEditController.$inject = [
    //     '$routeParams',
    //     '$location',
    //     'ContactService'
    // ];

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
