exports.pointAdd = {
  name: "pointAdd",
  description: "I add a point",
  inputs: {
    userName: {required: true},
    name: {required: true},
    description: {required: true},
    geolocation: {required: true}
  },
  authenticated: false, //todo: set to true!
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.points.pointAdd(data.params.userName, data.params.name, data.params.description, data.params.geolocation, function(error){
      next(error);
    });
  }
};

exports.pointView = {
  name: "pointView",
  description: "I view a point",
  inputs: {
    userName: {required: true},
    name: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.points.pointView(data.params.userName, data.params.name, function(error, point){
      data.response.point = point;
      next(error);
    });
  }
};

exports.userPointsList = {
  name: "userPointsList",
  description: "I list all of a user's points",
  inputs: {
    userName: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.points.userPointsList(data.params.userName, function(error, points){
      data.response.points = points;
      next(error);
    });
  }
};

exports.pointsList = {
  name: "pointsList",
  description: "I list all points",
  inputs: {
    userName: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.points.pointsList(null, function(error, points){
      data.response.points = points;
      next(error);
    });
  }
};

exports.pointEdit = {
  name: "pointEdit",
  description: "I edit a point",
  inputs: {
    userName: {required: true},
    password: {required: true},
    name: {required: true},
    content: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.points.pointEdit(data.params.userName, data.params.name, data.params.content, function(error){
      next(error);
    });
  }
};

exports.pointDelete = {
  name: "pointDelete",
  description: "I delete a point",
  inputs: {
    userName: {required: true},
    password: {required: true},
    name: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.points.pointDelete(data.params.userName, data.params.password, data.params.name, function(error){
      next(error);
    });
  }
};