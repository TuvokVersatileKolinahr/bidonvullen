var request = require('supertest'),
    should = require('should'),
    express = require('express');
var dimsum = require('dimsum').configure({ flavor: 'jabberwocky' });
var geo = require('./helpers/geo').configure({'output':'array'});
var app = require('../app.js');

var api_uri = '/api/taps'
// position.coords.latitude: 51.8349786 - position.coords.longitude: 5.8863487999999995 main.js:11
var locdata = {lat: '51.8349786', lng: '5.8863487999999995'};

// to enable debug logging start test with: env DEBUG_TEST=true mocha
var debug = process.env.DEBUG_TEST;

describe('Get list of taps in the proximity of a geolocation', function(){

  it('responds on a get/prox/:geo with a list of tap items in JSON based on the proximity', function(done){
    request(app)
    .get(api_uri + '/prox/' + JSON.stringify(locdata))
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) {
        console.log("res", res);
      }
      should.not.exist(err);
      // res.body.result.should.have.property('_id', d);
      // res.body.data.name.should.eql(tap_name);

      if (debug)
        console.log("Get returned the inserted tap: ", res.body.result);
      done();
    });
  });
});