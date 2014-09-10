var request = require('supertest'),
    should = require('should'),
    express = require('express');
var dimsum = require('dimsum');
var app = require('../app.js');


dimsum.configure({ flavor: 'jabberwocky' });

var api_uri = 'api/taps'
var tap_name = dimsum(1);
var tap_description = dimsum.sentence(2);
var tap_geolocation = { lat: 1, lng: 1 }
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