exports.default = { 
  routes: function(api){
    return {
      
      /* ---------------------
      routes.js 
      ---------------------- */
      get: [
        { path: '/point', action: 'pointsList' },       // (GET) /api/point
        { path: '/point/:name', action: 'pointView' },  // (GET) /api/point/theo-there-is-no-point
      ],
      post: [
        { path: '/point', action: 'pointAdd' },         // (POST) /api/point
      ],
      put: [
        { path: '/point/:name', action: 'pointEdit' },   // (PUT) /api/point/theo-there-is-no-point
      ],
      delete: [
        { path: '/point/:name', action: 'pointDelete' },// (DELETE) /api/point/theo-there-is-no-point
      ]
      /*
      all: [
        { path: '/user/:userID', action: 'user' } // (*) / /api/user/123
      ]
      */      
      
    }
  }
}