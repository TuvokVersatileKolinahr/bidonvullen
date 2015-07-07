/**
 * Add controller
 */
app.controller('AddController', ['$scope', function($scope) {

  var webcam = new Webcam('#video');
  webcam.useFallback(true);

  $scope.isSupported = webcam.isSupported();
  $scope.isStarted = webcam.isStarted();


  document.getElementById('video').style.display = 'none';

  $scope.startWebcam = function() {
    if (webcam.isSupported()) {
      webcam.start({video: true, audio: false}, function(stream) {
        // Success function, video is streaming...
        document.getElementById('video').style.display = 'block';
      }, function(e) {
        alert('Oops, something went wrong');
      });
    } else {
      if (window.navigator.userAgent.match(/Mobi/)) { // Mobile browser...
        webcam.useFallback(true);
      } else {
        alert('API is not supported by your browser');
      }
    }
  };

  $scope.stopWebcam = function() {
    if (webcam.isStarted()) {
      webcam.stop();
    }
  };

  $scope.takePicture = function() {

    if (webcam.isStarted()) {
      if (webcam.isSupported()) {
        // Now take an picture using the webcam
        webcam.takePicture(function(pic) {
          // And assign it to an image
          $scope.picture = pic;
          $scope.$apply();
        });
      } else {
        webcam.fallback(function(pic) {
          // And assign it to an image
          $scope.picture = pic;
          $scope.$apply();
        }, function() {
          console.log('fallback failed');
        });
      }
       
    } else {
      console.log('Webcam not started')
    }

  };

}]);
