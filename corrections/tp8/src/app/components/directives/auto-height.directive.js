(function () {
    'use strict';

    function autoHeight($window) {
        return function(scope, element, attributes) {
            element.css('overflow', 'auto');

            function changeHeight() {
                var height = $window.innerHeight - attributes.autoHeight;
                element.css('height', height + 'px');
            }

            changeHeight();
            angular.element($window).on('resize', changeHeight);

            scope.$on('$destroy', function() {
                angular.element($window).off('resize', changeHeight);
            });
        };
    }

    autoHeight.$inject = [ '$window' ];

    angular
        .module('zenContact.components')
        .directive('autoHeight', autoHeight);

})();
