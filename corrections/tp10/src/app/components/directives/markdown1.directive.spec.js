'use strict';

describe('directive: markdown1', function() {
    var element;

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.components'));

    beforeEach(inject(function($rootScope, $compile) {
        var scope = $rootScope.$new();
        element = $compile('<markdown1 data-ng-model="text"></markdown1>')(scope);
        element.find('textarea').html('# Hello, World!');
        element.find('textarea').triggerHandler('keyup');
    }));

    it('should create <h1> tag when text starts with "# "', function() {
        var md = element.find('.md').html();
        expect(md).toBe('<h1 id="helloworld">Hello, World!</h1>');
    });

    it('should clean result when text is an empty string', function() {
        element.find('textarea').html('');
        element.find('textarea').triggerHandler('keyup');

        var md = element.find('.md').html();
        expect(md).toEqual('');
    });
});
