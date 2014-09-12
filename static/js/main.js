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

function whichTransitionEvent(){
    var t, el = document.createElement('fakeelement'), transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
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

      var transitionEvenName = whichTransitionEvent();
      
      currentPage.classList.add(this.dataset.animation);
      targetPage.classList.add('current');
      targetPage.classList.add(this.dataset.targetanimation);
      targetPage.classList.add('on-top');
    
      var onEndAnimationCurrentPage = function(){
        this.classList.remove(self.dataset.animation);
        this.classList.remove('current');
        currentPage.removeEventListener(transitionEvenName, onEndAnimationCurrentPage);
      }
      var onEndAnimationTargetPage = function(){
         this.classList.remove(self.dataset.targetanimation);
         targetPage.removeEventListener(transitionEvenName, onEndAnimationTargetPage);
         targetPage.classList.remove('on-top');
      };
      currentPage.addEventListener(transitionEvenName, onEndAnimationCurrentPage, false);

      targetPage.addEventListener(transitionEvenName, onEndAnimationTargetPage, false);
    })
  }
});
