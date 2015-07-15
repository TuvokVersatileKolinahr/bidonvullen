module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    api.points = {
      pointAdd: function(userName, title, content, next){},
      pointView: function(userName, title, next){},
      pointsList: function(userName, next){},
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
