module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    var nano = require('nano')(api.config.database.host);
    var points = nano.use('points');

    function sluggify (text) {
        var slug = text.replace(/[^a-zA-Z0-9\s]/g,"");
        slug = slug.toLowerCase();
        slug = slug.trim();
        slug = slug.replace(/\s/g,'-');
        return slug;
    }

    api.points = {
      pointAdd: function(userName, name, description, geolocation, next){
        var data = {
          addedBy: userName,
          created: new Date().getTime(),
          type: 'point',
          name: name,
          description: description,
          geolocation: JSON.parse(geolocation)
        };

        points.insert(data, sluggify(userName + ' ' + name), function(error, body) {
          if (!error) {
            next(error, body);
          } else
            next(error);
        });
      },
      pointView: function(userName, name, next){
        points.get(sluggify(userName + ' ' + name), function (error, body) {
          if (!error) {
            next(error, body);
          } else
            next(error);
        })
      },
      userPointsList: function(userName, next){
        points.view('point_list', 'forUser', {'key': userName}, function (error, body) {
          if (!error) {
            next(error, body);
          } else
            next(error);
        })
      },
      pointsList: function(userName, next){
        points.view('point_list', 'forUser', function (error, body) {
          if (!error) {
            next(error, body);
          } else
            next(error);
        })
      },
      pointEdit: function(userName, name, content, next){
        next('Not implemented yet.')
      },
      pointDelete: function(userName, password, name, next){
        points.get(sluggify(userName + ' ' + name), function (fetcherror, deletepoint) {
          if (!fetcherror) {
            points.destroy(deletepoint._id, deletepoint._rev, function(error, body) {
              if (!error)
                next(error, body);
              else
                next(error);
            });
          } else {
            next(fetcherror);
          };
        });
      },
    };

    next();
  },
  start: function(api, next){
    next();
  },
  stop: function(api, next){
    next();
  }
};
