/**
 * Main controller
 */
app.controller('MainController', ['$scope', function($scope) {

  // Show the map on screen with the right location
  function showMap() {
    // Google map options
    var mapOptions = {
      center: new google.maps.LatLng($scope.currentPosition.coords.latitude, $scope.currentPosition.coords.longitude),
      zoom: 16,
      panControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER
      },
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP // Or: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  // Defaults to Nijmegen, Gelderland, The Netherlands
  $scope.currentPositon = {
    coords: {
      latitude: 51.84520017,
      longitude: 5.83402263
    }
  };

  // Get current location
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.currentPosition = position;
      showMap();
    });
  } else {
    console.log("geolocation API not supported. Focus on last know position ");
    showMap(); // No current position, focus on last know position
  }

}]);