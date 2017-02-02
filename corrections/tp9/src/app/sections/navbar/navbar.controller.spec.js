'use strict';

describe('controller: NavBarController', function() {
    var location;

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.sections'));

    beforeEach(inject(function($location) {
        location = $location;
    }));

    it('should be active when path is equal to current path', inject(function($controller) {
        location.path('/list');
        var controller = $controller('NavBarController');
        expect(controller.isActive('/list')).toBeTruthy();
    }));

    it('should not be active when path is not equal to current path', inject(function($controller) {
        location.path('/edit');
        var controller = $controller('NavBarController');
        expect(controller.isActive('/list')).toBeFalsy();
    }));
});
