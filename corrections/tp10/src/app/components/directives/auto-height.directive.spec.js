'use strict';

describe('directive: autoHeight', function() {
    var element;
    var $window;
    var fixedSize = 60;

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.components'));

    beforeEach(inject(function($compile, $rootScope, _$window_) {
        $window = _$window_;

        var scope = $rootScope.$new();
        element = $compile('<div data-auto-height="' + fixedSize + '">Hello, World!</div>')(scope);
    }));

    it('should resize element heigth when directive is loaded', function() {
        expect(element.height()).toEqual($window.innerHeight - fixedSize);
    });

    it('should resize element heigth when window is resized', function() {
        $window.innerHeight = 200;
        angular.element($window).resize();
        expect(element.height()).toEqual($window.innerHeight - fixedSize);
    });
});
