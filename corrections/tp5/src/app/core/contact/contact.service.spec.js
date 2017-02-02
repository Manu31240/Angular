'use strict';

describe('service: ContactService', function() {
    var ContactService;

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.core'));

    beforeEach(inject(function(_ContactService_) {
        ContactService = _ContactService_;
    }));

    it('should return a list of all contacts', function() {
        expect(ContactService.getAllContacts().length).toBe(8);
    });

    it('should return Bruce Wayne contact when called with id = 0', function() {
        var expected = {
            id: 0,
            lastName: 'Wayne',
            firstName: 'Bruce',
            address: 'Gotham city',
            phone: '555-BATMAN'
        };
        expect(ContactService.getContactById(0)).toEqual(expected);
    });

    it('should return an empty object when called with unknown id', function() {
        expect(ContactService.getContactById(10)).toEqual({});
    });

    it('should add a new contact when save new contact', function() {
        var superman = {
            lastName: 'Kent',
            firstName: 'Clark',
            address: 'Metropolis',
            phone: '555-SUPERM'
        };
        ContactService.saveContact(superman);
        expect(ContactService.getAllContacts().length).toBe(9);
    });

    it('should update a contact when save existing contact', function() {
        var ironman = ContactService.getContactById(7);
        ironman.address = '10880 Malibu Point';
        ContactService.saveContact(ironman);
        expect(ContactService.getContactById(7)).toEqual(ironman);
    });
});
