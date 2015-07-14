/**
 * Main controller
 */
app.controller('MainController', ['$scope', function($scope) {

  var mapOptions = {
    center: new google.maps.LatLng(51.84520017, 5.83402263),
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

}]);