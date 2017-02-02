(function () {
    'use strict';

    function NavBarController($location, AuthService) {
        var vm = this;

        vm.isActive = function(path) {
            return $location.path().indexOf(path) > -1;
        };

        vm.isUserConnected = function() {
            return !!AuthService.token();
        };

        vm.logout = AuthService.logout;
    }

    NavBarController.$inject = [ '$location', 'AuthService' ];

    angular
        .module('zenContact.sections')
        .controller('NavBarController', NavBarController);

})();
