'use strict';

describe('controller: ContactEditController', function() {
    var $controller;
    var $location;
    var contact = {
        id: 0,
        lastName: 'Wayne',
        firstName: 'Bruce',
        address: 'Gotham city',
        phone: '555-BATMAN'
    };

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.sections'));

    beforeEach(inject(function(_$controller_, _$location_) {
        $controller = _$controller_;
        $location = _$location_;
    }));

    describe('with ContactResource', function() {
        var $httpBackend;

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        }));

        function controllerWithRouteParams(routeParams) {
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
            $location.path('/edit');
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
            $location.path('/edit');
            var controller = controllerWithContact();

            $httpBackend.expectPUT('/rest/contacts/0').respond('ok');
            controller.saveContact(controller.contact);
            $httpBackend.flush();
            expect($location.path()).toBe('/list');
        });
    });
});
