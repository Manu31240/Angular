(function () {
    'use strict';

    /* global Fuse */
    function fuzzy() {
        return function(contacts, search, threshold) {
            if (!search || !contacts) {
                return contacts || [];
            }

            var fuse = new Fuse(contacts, {
                keys: ['firstName', 'lastName'],
                threshold: threshold
            });
            return fuse.search(search);
        };
    }

    angular
        .module('zenContact.components')
        .filter('fuzzy', fuzzy);

})();
