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
  getLocation();

  var nodes;
  nodes = document.querySelectorAll('.navigation');
  for (var i=0; i<nodes.length; i++){
    nodes[i].addEventListener('click', function(){
      var currentPage = document.querySelector('.page.current');
      var targetPage = document.getElementById(this.dataset.target);
      var self = this;

      currentPage.classList.add(this.dataset.animationout);
      targetPage.classList.add('current');
      targetPage.classList.add(this.dataset.animationin);
      targetPage.classList.add('on-top');
    
      var onEndAnimationCurrentPage = function(){
        if (self.dataset.animationout){
          this.classList.remove(self.dataset.animationout);
        }
        this.classList.remove('current');
        console.log('current ', "animationend");
        currentPage.removeEventListener("animationend", onEndAnimationCurrentPage);
      }
      var onEndAnimationTargetPage = function(){
         if (self.dataset.animationin){
          this.classList.remove(self.dataset.animationin);
         }
         targetPage.classList.remove('on-top');
         console.log('target ', "animationend");
         targetPage.removeEventListener("animationend", onEndAnimationTargetPage);
      };
      currentPage.addEventListener("animationend", onEndAnimationCurrentPage, false);

      targetPage.addEventListener("animationend", onEndAnimationTargetPage, false);
    })
  }
});
