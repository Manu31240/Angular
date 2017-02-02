'use strict';

describe('directive: autoPopup', function() {
    var scope;
    var element;
    var httpBackend;

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.components'));

    beforeEach(inject(function($rootScope, $compile, $httpBackend) {
        scope = $rootScope.$new();
        element = $compile('<a data-auto-popup="/about.html">About</a>')(scope);
        httpBackend = $httpBackend;
    }));

    it('should show a modal with content on element click', function() {
        var modalContent = '<div>Hello, World!</div>';

        httpBackend.when('GET').respond(modalContent);
        element.triggerHandler('click');
        httpBackend.flush();

        var modalBody = angular.element(document).find('.modal-body');
        expect(modalBody.html()).toBe(modalContent);
    });
});
