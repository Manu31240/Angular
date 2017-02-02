'use strict';

describe('controller: ContactListController', function() {
    var controller;
    var ContactServiceMock = {
        getAllContacts: function() {
            return [
                {
                    id: 0,
                    lastName: 'Wayne',
                    firstName: 'Bruce',
                    address: 'Gotham city',
                    phone: '555-BATMAN'
                },
                {
                    id: 1,
                    lastName: 'Parker',
                    firstName: 'Peter',
                    address: 'New York',
                    phone: '555-SPDRMN'
                }
            ];
        }
    };

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.sections'));

    beforeEach(inject(function($controller) {
        controller = $controller('ContactListController', { ContactService: ContactServiceMock });
    }));

    it('should have a list of all contacts', function() {
        expect(controller.contacts).toEqual(ContactServiceMock.getAllContacts());
    });
});
