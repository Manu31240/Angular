'use strict';

describe('controller: ContactEditController', function() {
    var ContactServiceMock = {
        getContactById: function() {},
        saveContact: function() {}
    };

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.sections'));

    function controllerWithRouteParams($controller, routeParams) {
        return $controller('ContactEditController', {
            $routeParams: routeParams || {},
            ContactService: ContactServiceMock
        });
    }

    it('should have a defined contact when $routeParams has an existing id', inject(function($controller) {
        var expected = {
            id: 0,
            lastName: 'Wayne',
            firstName: 'Bruce',
            address: 'Gotham city',
            phone: '555-BATMAN'
        };
        spyOn(ContactServiceMock, 'getContactById').and.returnValue(expected);
        var controller = controllerWithRouteParams($controller, { id: 0 });
        expect(ContactServiceMock.getContactById).toHaveBeenCalledWith(0);
        expect(controller.contact).toBe(expected);
    }));

    it('should have an empty object as contact when $routeParams has no id', inject(function($controller) {
        spyOn(ContactServiceMock, 'getContactById').and.returnValue({});
        var controller = controllerWithRouteParams($controller);
        expect(ContactServiceMock.getContactById).toHaveBeenCalledWith(NaN);
        expect(controller.contact).toEqual({});
    }));

    it('should save contact and redirect to #/list', inject(function($controller, $location) {
        spyOn(ContactServiceMock, 'saveContact');
        $location.path('/edit');
        var controller = controllerWithRouteParams($controller);
        var contact = {
            id: 0,
            lastName: 'Wayne',
            firstName: 'Bruce',
            address: 'Gotham city',
            phone: '555-BATMAN'
        };
        controller.saveContact(contact);
        expect(ContactServiceMock.saveContact).toHaveBeenCalledWith(contact);
        expect($location.path()).toBe('/list');
    }));
});
