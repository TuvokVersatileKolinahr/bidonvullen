var request = require('supertest'),
    should = require('should'),
    express = require('express');
var dimsum = require('dimsum').configure({ flavor: 'jabberwocky' });

var app = require('../app.js');

var api_uri = '/api/taps'

var locations = 
  [
    {
      name: 'De Kroon',
      description: dimsum.sentence(2),
      geolocation: [51.8347059,5.8803058]
    },{
      name: 'Baan Isaan',
      description: dimsum.sentence(2),
      geolocation: [51.8345417,5.8808698]
    },{
      name: 'Cafe Jos',
      description: dimsum.sentence(2),
      geolocation: [51.8360986,5.8782752]
    },{
      name: 'De Mandarijn',
      description: dimsum.sentence(2),
      geolocation: [51.8370332,5.8783289]
    },{
      name: 'Het Centrum',
      description: dimsum.sentence(2),
      geolocation: [51.836846,5.880097]
    },{
      name: 'The Shuffle',
      description: dimsum.sentence(2),
      geolocation: [51.8370614,5.8844377]
    },{
      name: 'Racine',
      description: dimsum.sentence(2),
      geolocation: [51.836249,5.8852558]
    },{
      name: 'Grut',
      description: dimsum.sentence(2),
      geolocation: [51.8358791,5.8855854]
    },{
      name: 'Huidverzorgingsstudio Kitty',
      description: dimsum.sentence(2),
      geolocation: [51.8332951,5.8865869]
    },{
      name: 'Tati',
      description: dimsum.sentence(2),
      geolocation: [51.834705,5.8765441]
    },{
      name: 'in de Kazerne',
      description: dimsum.sentence(2),
      geolocation: [51.834884,5.8767372]
    },{
      name: 'Restaurant Vesters',
      description: dimsum.sentence(2),
      geolocation: [51.83562,5.8745001]
    },{
      name: 'global giftshop',
      description: dimsum.sentence(2),
      geolocation: [51.8347615,5.8679447]
    },{
      name: 'Blixem',
      description: dimsum.sentence(2),
      geolocation: [51.8365382,5.8691356]
    },{
      name: 'De Knollentuin',
      description: dimsum.sentence(2),
      geolocation: [51.8369757,5.8666036]
    },{
      name: 'Banketbakkerij Pruyn',
      description: dimsum.sentence(2),
      geolocation: [51.8360808,5.8592115]
    },{
      name: 'We gaan beginnen',
      description: dimsum.sentence(2),
      geolocation: [51.8360808,5.8592115]
    },{
      name: 'Café St. Anneke',
      description: dimsum.sentence(2),
      geolocation: [51.8384143,5.8597586]
    },{
      name: 'Café Maxim',
      description: dimsum.sentence(2),
      geolocation: [51.8394816,5.8555851]
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

  locations.forEach(function(element, index, array) {
    it('inserts all taps in this locations variable', function(done){
      request(app)
      .post(api_uri)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({'description': element.description, 'name': element.name, 'geolocation': element.geolocation})
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.name.should.eql(element.name);
        res.body.data.description.should.eql(element.description);
        res.body.data.geolocation.should.eql(element.geolocation);
        console.log("[PASSED] Inserted id(%s), result of POST:\n %s", res.body.data._id, JSON.stringify(res.body.data, null, "  "));
        done();
      });
    });
  });
});