'use strict';

var _ = require('underscore');
var express = require('express');
var http = require('http');
var uuid = require('node-uuid');
var cors = require('./cors');
var app = express();
var server = http.createServer(app);

var conf = require('./server.json');

var contacts = require(conf.contacts);
var sessions = {};

var pathRoot = '/rest';
var authHeader = 'Auth-Token';

// use command-line arg for root if passed
if (process.argv.length === 3) {
    conf.root = process.argv[2];
}

app.use(express.static(__dirname + '/' + conf.root));

console.log(__dirname + '/' + conf.root);

app.use(express.bodyParser());
app.use(cors);

/*
 * GET all contacts
 */
app.get(pathRoot + '/contacts', function (req, res) {
    console.log('GET /contacts return list of', contacts.length, 'contacts');
    res.send(contacts);
});

/*
 * Get contact
 */
app.get(pathRoot + '/contacts/:id', function (req, res) {
    var result = _.findWhere(contacts, {
        id: parseInt(req.params.id)
    });
    console.log('GET /contacts/' + req.params.id, 'returning', result);
    if (result) {
        res.send(result);
    } else {
        res.status(404).send('Contact with id [' + req.params.id + '] not found.');
    }
});

/*
 * Create contact
 */
var createHandler = function (req, res) {

    if (req.body.id || req.body.id === 0) {
        console.log('POST /contacts with data ', req.body, 'failed because already exist');
        res.status(409).send('Contact with id [' + req.body.id + '] already exists.');
    } else {
        var id = _.max(_.pluck(contacts, 'id')) + 1;
        console.log('POST /contacts with data ', req.body, 'adding id', id);

        req.body.id = id;
        contacts.push(req.body);
        res.header('Location', req.path + '/' + id);
        res.status(201).send(req.body);
    }

};

app.post(pathRoot + '/contacts', createHandler);
app.put(pathRoot + '/contacts', createHandler);

/*
 * Update contact
 */
var updateHandler = function (req, res) {
    var result = _.findWhere(contacts, {
        id: parseInt(req.params.id)
    });
    if (result) {
        if (_.isEmpty(req.body)) {
            res.status(409).send('Contact with id [' + req.params.id + '] cannot be updated with empty data.');
        } else {
            _.extend(result, req.body);
            console.log('PUT /contacts/' + req.params.id + ' with data ', req.body, 'returning', result);
            res.send(result);
        }
    } else {
        res.status(404).send('Contact with id [' + req.params.id + '] not found.');
    }
};

app.put(pathRoot + '/contacts/:id', updateHandler);
app.post(pathRoot + '/contacts/:id', updateHandler);

/*
 * Delete contact
 */
app.delete(pathRoot + '/contacts/:id', function (req, res) {
    var token = req.header(authHeader);
    var user = token ? _.invert(sessions)[token] : null;
    console.log('test ', sessions, token, user);
    if (!user) {
        console.log('DELETE refused, Authentication required!');
        res.send(401, 'Authentication required!');
    } else {
        var orignalLength = contacts.length;
        contacts = _.reject(contacts, function (contact) {
            return contact.id == req.params.id;
        });
        if (orignalLength === contacts.length) {
            // contact not found
            res.status(404).send('Contact with id [' + req.params.id + '] not found.');
        } else {
            res.status(204).send('Contact with id [' + req.params.id + '] deleted.');
        }
        console.log('DELETE /contacts/' + req.params.id + ' with status ' + res.statusCode);
    }
});

/*
 * Login
 */
var loginHandler = function (req, res) {
    sessions[req.params.user] = uuid.v4();
    console.log('LOGIN', sessions);
    res.header(authHeader, sessions[req.params.user]);
    res.send('User logged');
};

app.post(pathRoot + '/login/:user', loginHandler);
app.put(pathRoot + '/login/:user', loginHandler);

/*
 * Server start
 */
server.listen(conf.port);
console.log('Express server listening on port', server.address().port);
