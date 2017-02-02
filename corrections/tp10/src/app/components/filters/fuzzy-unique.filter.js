(function () {
    'use strict';

    function fuzzyUnique(uniqueFilter, fuzzyFilter) {
        return function(contacts, search, threshold) {
            return uniqueFilter(fuzzyFilter(contacts, search, threshold));
            // ou $filter('unique')($filter('fuzzy')(...)) en injectant $filter
        };
    }

    fuzzyUnique.$inject = [ 'uniqueFilter', 'fuzzyFilter' ];

    angular
        .module('zenContact.components')
        .filter('fuzzyUnique', fuzzyUnique);

})();
