/**
 * Main controller
 */
app.controller('MainController', function($scope) {

  // Show the map on screen with the right location
  function showMap() {
    // Google map options
    var mapOptions = {
      center: new google.maps.LatLng($scope.currentLocation.coords.latitude, $scope.currentLocation.coords.longitude),
      zoom: 16,
      panControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP // Or: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function showMapOnCurrentLocation() {
    // Get current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.currentLocation = position;
        showMap();
      }, function(err) { // PERMISSION_DENIED (1) || POSITION_UNAVAILABLE (2) || TIMEOUT (3)
        showMap();
      });
    } else {
      console.log('geolocation API not supported. Focus on last know position.');
      showMap();
    }
  }

  // Current position, defaults to Nijmegen, Gelderland, The Netherlands
  $scope.currentLocation = {
    coords: {
      latitude: 51.84520017,
      longitude: 5.83402263
    }
  };

  showMapOnCurrentLocation()
});