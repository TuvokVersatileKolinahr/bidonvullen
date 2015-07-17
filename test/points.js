var request = require("request");
var should = require("should");
var setup = require("./_setup.js")._setup;
var testpoints = require("./testpoints").data

describe('integration', function() {  
  
  before(function(done) {
    setup.init(function() {
      request.post(setup.testUrl + "/userAdd", {form: {userName: "testPoster", password: "password"}} , function(err, response, body) {
        done();
      });
    });
  });

  describe('Points API', function() {

    it('should create a point', function(done) {
      request.post(setup.testUrl + "/pointAdd", {form: {
        userName: "testPoster", 
        name: testpoints[0].name, 
        description: testpoints[0].description,
        geolocation: JSON.stringify(testpoints[0].geolocation)
      }} , function(err, response, body) {
        body = JSON.parse(body);
        should.not.exist(body.error);
        done();
      });
    });

    it('should get a list of points', function(done) {
      request.post(setup.testUrl + "/pointsList", {form: {
        userName: "testPoster", 
      }} , function(err, response, body) {
        body = JSON.parse(body);
        should.not.exist(body.error);
        body.points.rows.length.should.be.greaterThan(0);
        done();
      });
    });

    it('should delete a point', function(done) {
      request.post(setup.testUrl + "/pointDelete", {form: {
        userName: "testPoster", 
        password: "password",
        name: testpoints[0].name
      }} , function(err, response, body) {
        body = JSON.parse(body);
        should.not.exist(body.error);
        done();
      });
    });
  
  }); // end Points API

}); // end integration