'use strict';

describe('The edit feature', function() {

    it('should display Peter Parker properties when url path is #/edit/1', function() {
        browser.get('http://localhost:8080/#/edit/1');

        expect(element(by.model('edit.contact.firstName')).getAttribute('value')).toEqual('Peter');
        expect(element(by.model('edit.contact.lastName')).getAttribute('value')).toEqual('Parker');
        expect(element(by.model('edit.contact.address')).getAttribute('value')).toEqual('New York');
        expect(element(by.model('edit.contact.phone')).getAttribute('value')).toEqual('555-SPDRMN');
    });

});
