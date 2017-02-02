(function () {
    'use strict';

    /* global Showdown */
    function MarkdownController($scope, $sce) {
        var vm = this;

        var converter = new Showdown.converter();
        $scope.$watch('md.source', function(value) {
            vm.markdown = value && $sce.trustAsHtml(converter.makeHtml(value));
        });
    }

    function markdown() {
        return {
            restrict: 'E',
            scope: {},
            controller: 'MarkdownController',
            controllerAs: 'md',
            bindToController: {
                source: '=ngModel'
            },
            templateUrl: 'app/components/directives/markdown.html'
        };
    }

    MarkdownController.$inject = [ '$scope', '$sce' ];

    angular
        .module('zenContact.components')
        .controller('MarkdownController', MarkdownController)
        .directive('markdown', markdown);

})();
