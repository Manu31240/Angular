'use strict';

describe('The search feature', function() {

    beforeEach(function() {
        browser.get('http://localhost:8080');
    });

    it('should display the no result message', function() {
        element(by.model('list.search')).sendKeys('anything');

        expect(element(by.binding('list.search')).getText()).toEqual('No contact for: anything');
    });

    it('should display Bruce Wayne when search "Wayne"', function() {
        element(by.model('list.search')).sendKeys('Wayne');

        expect(element(by.binding('list.search')).getText()).toEqual('One contact for: Wayne');

        var contactRows = element.all(by.repeater('contact in list.contacts'));
        contactRows.each(function(element) {
            expect(element.getTagName()).toBe('li');
            expect(element.getText()).toMatch(/WAYNE/);
        });
    });

});
