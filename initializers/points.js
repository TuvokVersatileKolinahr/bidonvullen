module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    var nano = require('nano')('https://flasklocations.smileupps.com');
    var points = nano.use('points');

    function sluggify (text) {
        var slug = text.replace(/[^a-zA-Z0-9\s]/g,"");
        slug = slug.toLowerCase();
        slug = slug.trim();
        slug = slug.replace(/\s/g,'-');
        return slug;
    }

    api.points = {
      pointAdd: function(userName, title, content, next){
        var data = {
          addedBy: userName,
          created: new Date().getTime(),
          type: 'point',
          title: title,
          description: content
        };

        points.insert(data, sluggify(userName + ' ' + title), function(error, body) {
          if (!error) {
            console.log(body);
            next(error, body);
          } else
            next(error);
        });
      },
      pointView: function(userName, title, next){
        points.get(sluggify(userName + ' ' + title), function (error, body) {
          if (!error) {
            console.log(body);
            next(error, body);
          } else
            next(error);
        })
      },
      userPointsList: function(userName, next){
        points.view('point_list', 'forUser', {'key': userName}, function (error, body) {
          if (!error) {
            console.log(body);
            next(error, body);
          } else
            next(error);
        })
      },
      pointsList: function(userName, next){
        points.view('point_list', 'forUser', function (error, body) {
          if (!error) {
            console.log(body);
            next(error, body);
          } else
            next(error);
        })
      },
      pointEdit: function(userName, title, content, next){},
      pointDelete: function(userName, title, next){},
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
