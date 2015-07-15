/**
 * Main controller
 */
app.controller('MainController', function($scope) {

  // Show the map on screen with the right location
  function showMap() {
    // Google map options
    var mapOptions = {
      center: new google.maps.LatLng($scope.location.coords.latitude, $scope.location.coords.longitude),
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

    var heremarker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng($scope.location.coords.latitude, $scope.location.coords.longitude),
      title: 'U bent hier',
      icon: 'img/here-marker.png'
    }),
    circle = new google.maps.Circle({
      map: $scope.map,
      radius: 200,
      strokeColor: '#fc4c02',
      strokeOpacity: 0.6,
      strokeWeight: 2,
      fillColor: '#fc4c02',
      fillOpacity: 0.35,
      center: heremarker.position
    });
  }

  function showMapOnCurrentLocation() {
    // Get current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.location = position;
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
  $scope.location = {
    coords: {
      latitude: 51.84520017,
      longitude: 5.83402263
    }
  };

  showMapOnCurrentLocation()
});