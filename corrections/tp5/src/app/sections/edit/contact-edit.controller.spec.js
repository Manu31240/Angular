'use strict';

describe('controller: ContactEditController', function() {
    var ContactServiceMock = {
        getContactById: function() {}
    };

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.sections'));

    it('should have a defined contact when $routeParams has an existing id', inject(function($controller) {
        var expected = {
            id: 0,
            lastName: 'Wayne',
            firstName: 'Bruce',
            address: 'Gotham city',
            phone: '555-BATMAN'
        };

        spyOn(ContactServiceMock, 'getContactById').and.returnValue(expected);
        var controller = $controller('ContactEditController', {
            $routeParams: { id: 0 },
            ContactService: ContactServiceMock
        });
        expect(ContactServiceMock.getContactById).toHaveBeenCalledWith(0);
        expect(controller.contact).toBe(expected);
    }));

    it('should have an empty object as contact when $routeParams has no id', inject(function($controller) {
        spyOn(ContactServiceMock, 'getContactById').and.returnValue({});
        var controller = $controller('ContactEditController', {
            $routeParams: {},
            ContactService: ContactServiceMock
        });
        expect(ContactServiceMock.getContactById).toHaveBeenCalledWith(NaN);
        expect(controller.contact).toEqual({});
    }));
});
