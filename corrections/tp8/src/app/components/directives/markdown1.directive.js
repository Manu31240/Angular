(function () {
    'use strict';

    /* global Showdown */
    function markdown() {
        return {
            require: 'ngModel',
            restrict: 'E',
            template:
                '<label class="control-label" for="description">Description</label>' +
                '<textarea class="form-control" name="description" id="description"></textarea>' +
                '<div class="well md"></div>',
            link: function(scope, element, attrs, ngModel) {
                var textarea = element.find('textarea');
                var md = element.find('.md');

                var converter = new Showdown.converter();

                function setViewValue() {
                    ngModel.$setViewValue(textarea.val());
                }
                textarea.on('keyup', setViewValue);

                ngModel.$viewChangeListeners = [function() {
                    var value = converter.makeHtml(ngModel.$viewValue);
                    md.html(value);
                }];

                scope.$on('$destroy', function() {
                    textarea.off('keyup', setViewValue);
                });
            }
        };
    }

    angular
        .module('zenContact.components')
        .directive('markdown1', markdown);

})();
