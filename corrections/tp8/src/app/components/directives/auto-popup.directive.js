(function () {
    'use strict';

    function autoPopup($http) {
        var modal = angular.element(
            '<div class="modal fade" tabindex="-1">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-body"></div>' +
                    '</div>' +
                '</div>' +
            '</div>');
        var modalContent = modal.find('.modal-body');

        function setModalContent(path) {
            return function() {
                $http.get(path).then(function(response) {
                    modalContent.html(response.data);
                    modal.modal('show');
                });
            };
        }

        return function(scope, element, attributes) {
            var clickListener = setModalContent(attributes.autoPopup);
            element.on('click', clickListener);

            scope.$on('$destroy', function () {
                element.off('click', clickListener);
            });
        };
    }

    autoPopup.$inject = [ '$http' ];

    angular
        .module('zenContact.components')
        .directive('autoPopup', autoPopup);

})();
