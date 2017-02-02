'use strict';

describe('controller: ContactEditController', function() {
    var $controller;
    var $location;
    var $httpBackend;
    var contact = {
        id: 0,
        lastName: 'Wayne',
        firstName: 'Bruce',
        address: 'Gotham city',
        phone: '555-BATMAN'
    };

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.sections'));

    beforeEach(inject(function(_$controller_, _$location_, _$httpBackend_) {
        $controller = _$controller_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
    }));

    function controllerWithRouteParams(routeParams) {
        $location.path('/edit');
        return $controller('ContactEditController', {
            $routeParams: routeParams || {}
        });
    }

    function controllerWithContact() {
        $httpBackend.expectGET('/rest/contacts/0').respond(contact);
        var controller = controllerWithRouteParams({ id: 0 });
        $httpBackend.flush();
        return controller;
    }

    it('should load a contact when $routeParams has an existing id', function() {
        var controller = controllerWithContact();
        expect(angular.toJson(controller.contact)).toBe(angular.toJson(contact));
        // controller.contact contient un objet de type `Resource`.
        // La représentation en JSON permet de ne comparer que les propriétés de l'objet.
    });

    it('should create a new contact resource when $routeParams has no id', function() {
        var controller = controllerWithRouteParams();
        expect(controller.contact).toBeDefined();
        expect(controller.contact.id).toBeUndefined();
    });

    it('should save contact if new and redirect to #/list', function() {
        var controller = controllerWithRouteParams();
        var ironman = {
            lastName: 'Stark',
            firstName: 'Tony',
            address: 'Stark tower, New York',
            phone: '555-IRNMAN'
        };
        angular.extend(controller.contact, ironman);
        $httpBackend.expectPOST('/rest/contacts').respond('ok');
        controller.saveContact(controller.contact);
        $httpBackend.flush();
        expect($location.path()).toBe('/list');
    });

    it('should update contact if existing and redirect to #/list', function() {
        var controller = controllerWithContact();
        $httpBackend.expectPUT('/rest/contacts/0').respond('ok');
        controller.saveContact(controller.contact);
        $httpBackend.flush();
        expect($location.path()).toBe('/list');
    });

    it('should delete contact and redirect to list if success', function() {
        var controller = controllerWithContact();
        $httpBackend.expectDELETE('/rest/contacts/0').respond('ok');
        controller.deleteContact(controller.contact);
        $httpBackend.flush();
        expect($location.path()).toBe('/list');
    });

    it('should delete contact and redirect to login if an error 401 occurs', function() {
        var controller = controllerWithContact();
        $httpBackend.expectDELETE('/rest/contacts/0').respond(401);
        controller.deleteContact(controller.contact);
        $httpBackend.flush();
        expect($location.path()).toBe('/login');
    });
});
