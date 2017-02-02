'use strict';

describe('controller: ContactListController', function() {
    var $controller;
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

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('should have a list of all contacts', inject(function($httpBackend) {
        $httpBackend.expectGET('/rest/contacts').respond(contacts);
        var controller = $controller('ContactListController');
        $httpBackend.flush();
        expect(angular.toJson(controller.contacts)).toEqual(angular.toJson(contacts));
        // controller.contacts contient une liste d'objets de type `Resource`.
        // La représentation en JSON permet de ne comparer que les propriétés des objets.
    }));

    it('should return true when search "Bru" for Bruce Wayne', function() {
        var controller = $controller('ContactListController');
        controller.search = 'Bru';
        expect(controller.nameFilter(contacts[0])).toBeTruthy();
    });

    it('should return false when search "Par" for Bruce Wayne', function() {
        var controller = $controller('ContactListController');
        controller.search = 'Par';
        expect(controller.nameFilter(contacts[0])).toBeFalsy();
    });

    it('should return true when search nothing', function() {
        var controller = $controller('ContactListController');
        controller.search = null;
        expect(controller.nameFilter(contacts[0])).toBeTruthy();
    });
});
