'use strict';

describe('controller: LoginController', function() {

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.sections'));

    it('should login user and redirect to previous url', inject(function($controller, $httpBackend, AuthService) {
        var controller = $controller('LoginController');
        var user = 'johndoe';
        $httpBackend.expectPOST('/rest/login/' + user).respond('ok');
        spyOn(AuthService, 'redirectToPreviousUrl');
        controller.login({ name: user });
        $httpBackend.flush();
        expect(AuthService.redirectToPreviousUrl).toHaveBeenCalled();
    }));
});
