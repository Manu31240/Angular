'use strict';

describe('filter: fuzzy', function () {
    var fuzzyFilter;
    var contacts = [
        {
            id: 0,
            lastName: 'Wayne',
            firstName: 'Bruce',
            address: 'Gotham city',
            phone: '555-BATMAN'
        },
        {
            id: 1,
            lastName: 'Parker',
            firstName: 'Peter',
            address: 'New York',
            phone: '555-SPDRMN'
        }
    ];

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.components'));

    beforeEach(inject(function (_fuzzyFilter_) {
        fuzzyFilter = _fuzzyFilter_;
        // ou `fuzzyFilter = $filter('fuzzy');` en injectant `$filter`
    }));

    it('should find Bruce Wayne when search "bt"', function () {
        var result = fuzzyFilter(contacts, 'bt', 0.5);
        expect(result).toEqual([contacts[0]]);
    });

    it('should find nothing when search "555"', function () {
        var result = fuzzyFilter(contacts, '555');
        expect(result).toEqual([]);
    });

    it('should find all contacts when search ""', function () {
        var result = fuzzyFilter(contacts, '');
        expect(result).toEqual(contacts);
    });

    it('should return an empty array when search in a null array', function () {
        var result = fuzzyFilter(null, 't');
        expect(result).toEqual([]);
    });
});
