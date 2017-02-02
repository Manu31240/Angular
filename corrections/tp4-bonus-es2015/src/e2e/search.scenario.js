'use strict';

describe('The search feature', function () {

    beforeEach(function () {
        browser.get('http://localhost:8080');
    });

    it('displays the no result message', function () {
        element(by.model('search')).sendKeys('anything');

        expect(element(by.binding('search')).getText()).toEqual('No contact for "anything"');
    });

});
