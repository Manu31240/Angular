(function () {
    'use strict';

    function LoginController($http, AuthService) {
        var vm = this;

        vm.user = {};

        vm.login = function(user) {
            $http.post('/rest/login/' + user.name)
                .then(AuthService.redirectToPreviousUrl);
        };
    }

    LoginController.$inject = [ '$http', 'AuthService' ];

    angular
        .module('zenContact.sections')
        .controller('LoginController', LoginController);

})();
