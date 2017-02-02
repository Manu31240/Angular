'use strict';

describe('service: Auth', function() {
    var AuthService;
    var $location;
    var $cookies;

    var tokenId = 'Auth-Token';
    var wrongTokenId = 'Token';

    function Response(headers) {
        this._headers = headers || {};
    }
    Response.prototype.headers = function(key) {
        var header;
        if (key) {
            header = this._headers[key];
        }
        return header;
    };

    beforeEach(inject.strictDi());
    beforeEach(module('zenContact.core'));

    beforeEach(inject(function($rootScope, _AuthService_, _$location_, _$cookies_) {
        AuthService = _AuthService_;
        $location = _$location_;
        $cookies = _$cookies_;

        // clean cookies if exist
        $cookies.remove(tokenId);
        $cookies.remove(wrongTokenId);
    }));

    it('should add token to DELETE headers', inject(function($http) {
        $cookies.put(tokenId, 'token');
        AuthService.addTokenToHeaders($http);
        expect($http.defaults.headers.delete).toEqual({ 'Auth-Token': 'token' });
    }));

    it('should store token with cookie when header exists', function() {
        AuthService.storeToken(new Response({ 'Auth-Token': 'uuid-01' }));
        expect($cookies.get(tokenId)).toBe('uuid-01');
    });

    it('should not store token with cookie when header does not exist', function() {
        AuthService.storeToken(new Response({ 'Token': 'uuid-02' }));
        expect($cookies.get(tokenId)).toBeUndefined();
    });

    it('should return token value when it exists', function() {
        $cookies.put(tokenId, 'token');
        expect(AuthService.token()).toBe('token');
    });

    it('should redirect to "/edit" when login from "/edit"', function() {
        $location.path('/edit');
        AuthService.redirectToLogin();
        expect($location.path()).toEqual('/login');

        AuthService.redirectToPreviousUrl();
        expect($location.path()).toEqual('/edit');
    });

    it('should redirect to "/list" when login from scratch', function() {
        AuthService.redirectToPreviousUrl();
        expect($location.path()).toEqual('/list');
    });

    it('should destroy cookie when logout', function() {
        $cookies.put(tokenId, 'token');
        AuthService.logout();
        expect($cookies.get(tokenId)).toBeUndefined();
    });

    it('should redirect to "/list" when logout', function() {
        $location.path('/edit');
        $cookies.put(tokenId, 'token');
        AuthService.logout();
        expect($location.path()).toEqual('/list');
    });
});
