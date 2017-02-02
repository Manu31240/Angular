'use strict';

describe('directive: markdown', function() {
    var scope;
    var element;

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.components'));
    // Loads external html templates to cache (see karma.conf.js)
    beforeEach(module('htmlTemplates'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        element = $compile('<markdown data-ng-model="text"></markdown>')(scope);
        scope.text = '# Hello, World!';
        scope.$apply();
    }));

    it('should create <h1> tag when text starts with "# "', function() {
        var md = element.find('.ng-binding').html();
        expect(md).toBe('<h1 id="helloworld">Hello, World!</h1>');
    });

    it('should clean result when text is an empty string', function() {
        scope.text = '';
        scope.$apply();

        var md = element.find('.ng-binding').html();
        expect(md).toBe('');
    });
});
