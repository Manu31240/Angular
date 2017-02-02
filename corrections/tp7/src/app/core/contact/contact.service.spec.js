'use strict';

describe('service: ContactService', function() {
    var $httpBackend;
    var ContactService;
    var onSuccess;

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
    beforeEach(module('zenContact.core'));

    beforeEach(inject(function(_$httpBackend_, _ContactService_) {
        $httpBackend = _$httpBackend_;
        ContactService = _ContactService_;

        onSuccess = jasmine.createSpy('onSuccess');
    }));

    it('should return a list of all contacts', function() {
        $httpBackend.expectGET('/rest/contacts').respond(contacts);
        ContactService.getAllContacts().then(onSuccess);
        $httpBackend.flush();

        var response = { data: contacts };
        expect(onSuccess).toHaveBeenCalledWith(jasmine.objectContaining(response));
    });

    it('should return Bruce Wayne contact when called with id = 0', function() {
        $httpBackend.expectGET('/rest/contacts/0').respond(contacts[0]);
        ContactService.getContactById(0).then(onSuccess);
        $httpBackend.flush();

        var response = { data: contacts[0] };
        expect(onSuccess).toHaveBeenCalledWith(jasmine.objectContaining(response));
    });

    it('should return an error when called with unknown id', function() {
        $httpBackend.expectGET('/rest/contacts/2').respond(404, 'not found');
        var onError = jasmine.createSpy('onError');
        ContactService.getContactById(2).then(onSuccess, onError);
        $httpBackend.flush();

        var error = { status: 404, data: 'not found' };
        expect(onError).toHaveBeenCalledWith(jasmine.objectContaining(error));
        expect(onSuccess).not.toHaveBeenCalled();
    });

    it('should add a new contact when save new contact', function() {
        var ironman = {
            lastName: 'Stark',
            firstName: 'Tony',
            address: 'Stark tower, New York',
            phone: '555-IRNMAN'
        };
        $httpBackend.expectPOST('/rest/contacts').respond(function(method, url, data) {
            var contact = angular.fromJson(data);
            contact.id = 2;
            return [200, contact, {}];
        });
        ContactService.saveContact(ironman).then(onSuccess);
        $httpBackend.flush();

        var contact = angular.copy(ironman);
        contact.id = 2;
        var response = { data: contact };
        expect(onSuccess).toHaveBeenCalledWith(jasmine.objectContaining(response));
    });

    it('should update a contact when save existing contact', function() {
        $httpBackend.expectPUT('/rest/contacts/0').respond(function(method, url, data) {
            return [200, angular.fromJson(data), {}];
        });
        var batman = angular.copy(contacts[0]);
        batman.address = '1007 Mountain Drive, Gotham';
        ContactService.saveContact(batman).then(onSuccess);
        $httpBackend.flush();

        var response = { data: batman };
        expect(onSuccess).toHaveBeenCalledWith(jasmine.objectContaining(response));
    });
});
