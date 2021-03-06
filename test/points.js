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

/*
    it('should create all testpoints', function(done) {
      testpoints.forEach(function(testpoint, index) {
        console.log("Adding testpoint #" + index + ": " + testpoint.name);
        request.post(setup.testUrl + "/point", {
          form: {
            userName: "testPoster", 
            name: testpoint.name, 
            description: testpoint.description,
            geolocation: JSON.stringify(testpoint.geolocation)
          }} , function(err, response, body) {
          body = JSON.parse(body);
          should.not.exist(body.error);
          done();
        });
      });
    });
*/

  describe('Points Actions', function() {
    console.log("Testing with " + testpoints[0].name);

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
  
  }); // end Points Actions

  describe('Points API', function() {
    console.log("Testing with " + testpoints[1].name);

    it('should create a point', function(done) {
      request.post(setup.testUrl + "/point", {
        form: {
          userName: "testPoster", 
          name: testpoints[1].name, 
          description: testpoints[1].description,
          geolocation: JSON.stringify(testpoints[1].geolocation)
        }} , function(err, response, body) {
        body = JSON.parse(body);
        should.not.exist(body.error);
        done();
      });
    });

    it('should get a list of points', function(done) {
      request.get(setup.testUrl + "/point?userName=testPoster", {} , function(err, response, body) {
        body = JSON.parse(body);
        should.not.exist(body.error);
        body.points.rows.length.should.be.greaterThan(0);
        done();
      });
    });

    it('should get one point', function(done) {
      request.get(setup.testUrl + "/point/"+testpoints[1].name+"?userName=testPoster", {} , function(err, response, body) {
        body = JSON.parse(body);
        should.not.exist(body.error);
        should.exist(body.point);
        body.point.addedBy.should.equal("testPoster");
        done();
      });
    });

    it('should delete a point', function(done) {
      request.del(setup.testUrl + "/point/"+testpoints[1].name, {
        form: {
          userName: "testPoster", 
          password: "password"
        }} , function(err, response, body) {
        body = JSON.parse(body);
        should.not.exist(body.error);
        done();
      });
    });
  
  }); // end Points API


}); // end integration