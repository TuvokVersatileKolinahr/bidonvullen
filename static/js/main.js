function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else { 
    console.error("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    initialize(position.coords.latitude, position.coords.longitude);
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

function initialize(lat, lng) {
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 15
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  // Create marker 
  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(lat, lng),
    title: 'U bent hier'
  });

  // Add circle overlay and bind to marker
  var circle = new google.maps.Circle({
    map: map,
    radius: 400,
    fillColor: '#fc4c02',
    strokeWeight: 0
  });
  circle.bindTo('center', marker, 'position');

}

document.addEventListener('DOMContentLoaded', function () {
  getLocation()
  showPosition();
});
