'use strict';

describe('controller: NavBarController', function() {
    var location;
    var $controller;
    var AuthService;

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.sections'));

    beforeEach(inject(function($location, _$controller_, _AuthService_) {
        location = $location;
        $controller = _$controller_;
        AuthService = _AuthService_;
    }));

    function controllerWithLocation(path) {
        if (path) {
            location.path(path);
        }
        return $controller('NavBarController');
    }

    it('should be active when path is equal to current path', function() {
        var controller = controllerWithLocation('/list');
        expect(controller.isActive('/list')).toBeTruthy();
    });

    it('should not be active when path is not equal to current path', function() {
        var controller = controllerWithLocation('/edit');
        expect(controller.isActive('/list')).toBeFalsy();
    });

    it('should indicate if user is connected', function() {
        var controller = controllerWithLocation();
        spyOn(AuthService, 'token');
        controller.isUserConnected();
        expect(AuthService.token).toHaveBeenCalled();
    });

    it('should logout user', function() {
        var controller = controllerWithLocation();
        expect(controller.logout).toBe(AuthService.logout);
    });
});
