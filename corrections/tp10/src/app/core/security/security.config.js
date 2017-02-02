(function () {
    'use strict';

    function HttpInterceptor($injector, $q, AuthService) {
        return {
            request: function(config) {
                var $http = $injector.get('$http');
                AuthService.addTokenToHeaders($http);
                return config || $q.when(config);
            },
            response: function(response) {
                AuthService.storeToken(response);
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 401) {
                    AuthService.redirectToLogin();
                }
                return $q.reject(rejection);
            }
        };
    }

    function securityConfig($httpProvider) {
        $httpProvider.interceptors.push(HttpInterceptor);
    }

    HttpInterceptor.$inject = [ '$injector', '$q', 'AuthService' ];
    securityConfig.$inject = [ '$httpProvider' ];

    angular
        .module('zenContact.core')
        .config(securityConfig);

})();
