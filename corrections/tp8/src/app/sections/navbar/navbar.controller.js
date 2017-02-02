(function () {
    'use strict';

    function NavBarController($location) {
        var vm = this;

        vm.isActive = function(path) {
            return $location.path().indexOf(path) > -1;
        };
    }

    NavBarController.$inject = [ '$location' ];

    angular
        .module('zenContact.sections')
        .controller('NavBarController', NavBarController);

})();
