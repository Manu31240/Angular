(function () {
    'use strict';

    function AuthService($location, $cookies) {
        var previousUrl;
        var AUTH_TOKEN = 'Auth-Token';

        this.redirectToPreviousUrl = function() {
            $location.path(previousUrl || '/list');
        };

        this.logout = function() {
            previousUrl = null;
            $cookies.remove(AUTH_TOKEN);
            $location.path('/list');
        };

        this.token = function() {
            return $cookies.get(AUTH_TOKEN);
        };

        this.redirectToLogin = function() {
            previousUrl = $location.path();
            $location.path('/login');
        };

        this.addTokenToHeaders = function($http) {
            var deleteHeaders = {};
            deleteHeaders[AUTH_TOKEN] = this.token();
            $http.defaults.headers.delete = deleteHeaders;
        };

        this.storeToken = function(response) {
            var token = response.headers(AUTH_TOKEN);
            if (token) {
                $cookies.put(AUTH_TOKEN, token);
            }
        };
    }

    AuthService.$inject = [ '$location', '$cookies' ];

    angular
        .module('zenContact.core')
        .service('AuthService', AuthService);
})();
