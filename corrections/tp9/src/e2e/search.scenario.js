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

        expect(element(by.binding('list.search')).getText()).toEqual('2 contacts for: Wayne');

        var contactRows = element.all(by.repeater('contact in list.contacts'));
        contactRows.then(function(contacts) {
            expect(contacts.length).toBe(2);

            expect(contacts[0].getTagName()).toBe('li');
            expect(contacts[0].getText()).toMatch(/STORM/);

            expect(contacts[1].getTagName()).toBe('li');
            expect(contacts[1].getText()).toMatch(/WAYNE/);
        });
    });

});
