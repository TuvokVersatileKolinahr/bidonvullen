exports.default = { 
  routes: function(api){
    return {
      
      /* ---------------------
      routes.js 
      ---------------------- */
      get: [
        { path: '/point', action: 'pointsList' },         // (GET) /api/point
        { path: '/point/:name', action: 'pointView' },    // (GET) /api/point/theo-there-is-no-point
        { path: '/user', action: 'usersList' },           // (GET) /api/user
      ],
      post: [
        { path: '/point', action: 'pointAdd' },           // (POST) /api/point
        { path: '/user', action: 'userAdd' },             // (POST) /api/user
      ],
      put: [
        { path: '/point/:name', action: 'pointEdit' },    // (PUT) /api/point/theo-there-is-no-point
      ],
      delete: [
        { path: '/point/:name', action: 'pointDelete' },  // (DELETE) /api/point/theo-there-is-no-point
        { path: '/user/:name', action: 'userDelete' },    // (DELETE) /api/user/theo
      ]
      /*
      all: [
        { path: '/user/:userID', action: 'user' } // (*) / /api/user/123
      ]
      */      
      
    }
  }
}