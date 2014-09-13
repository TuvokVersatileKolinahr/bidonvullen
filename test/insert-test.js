var request = require('supertest'),
    should = require('should'),
    express = require('express');
var dimsum = require('dimsum').configure({ flavor: 'jabberwocky' });

var app = require('../app.js');

var api_uri = '/taps'

var locations = 
  [
    {
      name: 'Racine',
      description: dimsum.sentence(2),
      geolocation: [51.8344563,5.8866507]
    },{
      name: 'Grut',
      description: dimsum.sentence(2),
      geolocation: [51.8344563,5.8866507]
    },{
      name: 'Zarzuela',
      description: dimsum.sentence(2),
      geolocation: [51.8344563,5.8866507]
    },{
      name: 'Baan Isaan',
      description: dimsum.sentence(2),
      geolocation: [51.8356066,5.8824772]
    },{
      name: 't Centrum',
      description: dimsum.sentence(2),
      geolocation: [51.8356066,5.8824772]
    },{
      name: 'The Shuffle',
      description: dimsum.sentence(2),
      geolocation: [51.8356066,5.8824772]
    },{
      name: 'Ark van Oost',
      description: dimsum.sentence(2),
      geolocation: [51.8326961,5.8865756]
    }
  ];

// to enable debug logging start test with: env DEBUG_TEST=true mocha
var debug = process.env.DEBUG_TEST;

describe('Array insert test', function(){
  it('does nothing so it shouldnt bother you', function(done){
    if (debug)
      console.log("[DISABLED] This test is disabled. Use for inserting a basic dataset with 7 tap-points.");
    done();
  });
  // locations.forEach(function(element, index, array) {
  //   it('responds with a json success message', function(done){
  //     request(app)
  //     .post(api_uri)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .send({'description': element.description, 'name': element.name, 'geolocation': element.geolocation})
  //     .expect(200)
  //     .end(function(err, res) {
  //       should.not.exist(err);
  //       res.body.data.name.should.eql(element.name);
  //       res.body.data.description.should.eql(element.description);
  //       res.body.data.geolocation.should.eql(element.geolocation);
  //       console.log("[PASSED] Inserted id(%s), result of POST:\n %s", res.body.data._id, JSON.stringify(res.body.data, null, "  "));
  //       done();
  //     });
  //   });
  // });
});