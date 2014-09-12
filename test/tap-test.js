var request = require('supertest'),
    should = require('should'),
    express = require('express');
var dimsum = require('dimsum').configure({ flavor: 'jabberwocky' });
var app = require('../app.js');

var geo = require('./helpers/geo');

var api_uri = '/taps'
var tap_name = dimsum({
    'sentences_per_paragraph': [1, 1],
    'words_per_sentence': [1, 1],
    'commas_per_sentence': [0, 0]
  }).slice(0, - 1); //severe misuse of the dimsum lib to generate one word
var tap_description = dimsum.sentence(2);
var tap_geolocation = geo();
var d = '';

describe('POST', function(){
  it('responds with a json success message', function(done){
    request(app)
    .post(api_uri)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({'description': tap_description, 'name': tap_name, 'geolocation': tap_geolocation})
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      console.log("Inserted id(%s) for later deletion, result of POST:\n %s", res.body.data._id, JSON.stringify(res.body.data, null, "  "));
      d = res.body.data._id;
      done();
    });
  });
});

describe('GET', function(){
  it('responds with a list of tap items in JSON', function(done){
    request(app)
    .get(api_uri)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      console.log("Found %s items.", res.body.length);
      done();
    });
  });
});

describe('GET', function(){
  it('responds with a single tap item in JSON based on the name', function(done){
    request(app)
    .get(api_uri + '/' + tap_name)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.result.should.have.property('_id', d);
      console.log("Get returned the inserted tap:\n %s", JSON.stringify(res.body.result, null, "  "));
      done();
    });
  });
});

describe('DELETE', function() {
  it('deletes a tap with the id ' + d, function(done) {
    request(app)
    .del(api_uri + '/' + d)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
});