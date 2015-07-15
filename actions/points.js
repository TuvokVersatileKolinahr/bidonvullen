exports.pointAdd = {
  name: "pointAdd",
  description: "I add a point",
  inputs: {
    userName: {required: true},
    password: {required: true},
    title: {required: true},
    content: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.blog.pointAdd(data.params.userName, data.params.title, data.params.content, function(error){
      next(error);
    });
  }
};

exports.pointView = {
  name: "pointView",
  description: "I view a point",
  inputs: {
    userName: {required: true},
    title: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.blog.pointView(data.params.userName, data.params.title, function(error, point){
      data.response.point = point;
      next(error);
    });
  }
};

exports.pointsList = {
  name: "pointsList",
  description: "I list all of a user's points",
  inputs: {
    userName: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.blog.pointsList(data.params.userName, function(error, points){
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
    title: {required: true},
    content: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.blog.pointEdit(data.params.userName, data.params.title, data.params.content, function(error){
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
    title: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, data, next){
    api.blog.pointDelete(data.params.userName, data.params.title, function(error){
      next(error);
    });
  }
};