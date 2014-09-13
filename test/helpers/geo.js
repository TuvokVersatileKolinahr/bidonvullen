/*!
 * geo.js v0.1
 * https://github.com/tuvokki/geo
 * MIT licensed
 * 
 * credits: https://gist.github.com/mkhatib/5641004
 *
 * Copyright (C) 2014 Wouter Roosendaal, http://www.tuvok.nl/
 */
;(function(global) {

  defaults = {
    'radius': 1,
    'center': {lat: 1, lng: 1},
    'count': 1,
    'output': 'json'
  },

  config = {},

  geo = global.geo = exports = function(count, options) {
    return geo.generate(count, options);
  };

  // For client-side compatibility
  if (typeof module !== 'undefined') module.exports = geo;

  /**
   * Restore default configuration.
   */
  geo.initialize = function() {
    return this.configure(defaults);
  };

  /**
   * Override the current configuration.
   *
   * @param options
   *      An object containing new config values.
   */
  geo.configure = function(options) {
    config = shallow_copy(config, options);
    return this;
  };

  /**
   * Create {count} number of points in the radius of 
   * center. Returns an array containing
   * the number of points specified. Defaukts to 1.
   *
   * @param count
   *      How many points to generate.
   *
   * @param options
   *      An object containing new config values. The new options
   *      will only apply to this one execution.
  */
  geo.generate = function(count, options) {

    var config_1 = config,
      result = [],
      count = count || 1,
      output = output || 'json';

    // Temporarily overwrite the configuration
    this.configure(options);

    //Do the generate
    for (var i=0; i < config.count; i++) {
      result.push(generateRandomPoint(config.center, config.radius, config.output));
    }

    // Restore the original configuration
    config = config_1;

    return result;
  };

  geo.initialize();

  /** Utils **/
  function shallow_copy() {

    var i, key, result = {},
      args = Array.prototype.slice.call(arguments);

    for (i = 0; i < args.length; i++) {
      for (key in args[i]) {
        result[key] = args[i][key];
      }
    }
    return result;
  };

  /**
  * Private method that generates number of random geolocation points given a center and a radius.
  * Reference URL: http://goo.gl/KWcPE.
  * 
  * @param  {Object} center A JS object with lat and lng attributes.
  * @param  {number} radius Radius in meters.
  * @param  {output} output type, currently only json (default) and array are supported.
  * 
  * @return {Object} The generated random points as JS object with lat and lng attributes.
  */
  function generateRandomPoint (center, radius, output) {
    var x0 = center.lng;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius/111300;
   
    var u = Math.random();
    var v = Math.random();
   
    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);
   
    var xp = x/Math.cos(y0);

    // Resulting point.
    if (output === 'array') {
      return [y+y0,xp+x0];
    }
    return {'lat': y+y0, 'lng': xp+x0};
  }

}(this));