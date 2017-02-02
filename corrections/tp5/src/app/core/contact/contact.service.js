(function () {
    'use strict';

    function ContactService() {
        var contacts = [
            { id: 0, lastName: 'Wayne', firstName: 'Bruce', address: 'Gotham city', phone: '555-BATMAN' },
            { id: 1, lastName: 'Parker', firstName: 'Peter', address: 'New York', phone: '555-SPDRMN' },
            { id: 2, lastName: 'Storm', firstName: 'Jane', address: 'Baxter building, New York', phone: '555-INVGRL' },
            { id: 3, lastName: 'Richards', firstName: 'Red', address: 'Baxter building, New York', phone: '555-MRFANT' },
            { id: 4, lastName: 'Storm', firstName: 'Johnny', address: 'Baxter building, New York', phone: '555-TORCH' },
            { id: 5, lastName: 'Grimm', firstName: 'Benjamin', address: 'Baxter building, New York', phone: '555-THING' },
            { id: 6, lastName: 'Murdock', firstName: 'Matt', address: 'San Francisco', phone: '555-DARDVL' },
            { id: 7, lastName: 'Stark', firstName: 'Tony', address: 'Stark tower, New York', phone: '555-IRNMAN' }
        ];

        this.getAllContacts = function() {
            return contacts;
        };

        this.getContactById = function(contactId) {
            var filteredContact = contacts.filter(function(contact) {
                return contact.id === contactId;
            })[0];
            return angular.copy(filteredContact) || {};
        };

        this.saveContact = function(contact) {
            if (angular.isDefined(contact.id)) {
                contacts = contacts.map(function(contactItem) {
                    return contactItem.id === contact.id ? contact : contactItem;
                });
            } else {
                contact.id = contacts.length;
                contacts.push(contact);
            }
        };
    }

    angular
        .module('zenContact.core')
        .service('ContactService', ContactService);
})();
