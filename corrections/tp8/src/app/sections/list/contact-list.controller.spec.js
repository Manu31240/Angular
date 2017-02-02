'use strict';

describe('controller: ContactListController', function() {
    var contacts = [
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

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.sections'));

    describe('with ContactResource', function() {
        it('should have a list of all contacts', inject(function($controller, $httpBackend) {
            $httpBackend.expectGET('/rest/contacts').respond(contacts);
            var controller = $controller('ContactListController');
            $httpBackend.flush();
            expect(angular.toJson(controller.contacts)).toEqual(angular.toJson(contacts));
            // controller.contacts contient une liste d'objets de type `Resource`.
            // La représentation en JSON permet de ne comparer que les propriétés des objets.
        }));
    });
});
