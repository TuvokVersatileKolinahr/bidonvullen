function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else { 
    console.error("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    var map = initialize(position.coords.latitude, position.coords.longitude);
    console.log("position.coords.latitude: %s - position.coords.longitude: %s", position.coords.latitude, position.coords.longitude);
    locdata = {lat: position.coords.latitude, lng: position.coords.longitude};
    var rest = new Rest('/api');
    // get taps for this location
    rest.get('/api/taps/prox/' + JSON.stringify(locdata), {
      success: function(data, status, xhr){
        console.info('Got taps @ 100 meter: ', data);
        for (var t = 0; t < data.result.length; t++) {
          console.log("data.result[" + t + "].geolocation[0]", data.result[t].geolocation[0]);
          console.log("data.result[" + t + "].geolocation[1]", data.result[t].geolocation[1]);
          console.log("data.result[" + t + "].name", data.result[t].name);
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.result[t].geolocation[0], data.result[t].geolocation[1]),
            title: data.result[t].name
          });
          console.log("map", map);
          marker.setMap(map);
        }
      }
    });


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

  return map;
}

function vendorEventName(name, el){
  var vendor = ["webkit", "moz", "MS", "o", ""];
  if (!el){el=document.documentElement}
  if(name.toLowerCase() in el){return name.toLowerCase();}
  for (var i = 0; i < vendor.length; i++) {
    if (vendor[i]+name in el){
      return vendor[i]+name;
    }else if (vendor[i]+name.toLowerCase() in el){
      return vendor[i]+name.toLowerCase();
    }
  }
  throw "Event " + name + " is not supported for element " + el.tagName;
}

document.addEventListener('DOMContentLoaded', function () {
  getLocation();

  /*
   * Navigation
   */
  var nodes,
  nodeClickedHandler = function(e){
    e.preventDefault();
    var currentPage = document.querySelector('.page.current');
    var targetPage = document.getElementById(this.dataset.target);
    var self = this;

    currentPage.classList.add(this.dataset.animationout);
    targetPage.classList.add('current');
    targetPage.classList.add(this.dataset.animationin);
    targetPage.classList.add('on-top');
  
    var onEndAnimationCurrentPage = function(e){
      if (self.dataset.animationout){
        this.classList.remove(self.dataset.animationout);
      }
      this.classList.remove('current');
      console.log('current ', e.type);
      currentPage.removeEventListener(e.type, onEndAnimationCurrentPage);
    }
    var onEndAnimationTargetPage = function(e){
       if (self.dataset.animationin){
        this.classList.remove(self.dataset.animationin);
       }
       targetPage.classList.remove('on-top');
       console.log('target ', e.type);
       targetPage.removeEventListener(e.type, onEndAnimationTargetPage);
    };

    currentPage.addEventListener("animationend", onEndAnimationCurrentPage, false);
    currentPage.addEventListener("webkitAnimationEnd", onEndAnimationCurrentPage, false);
    currentPage.addEventListener("oanimationend", onEndAnimationCurrentPage, false);
    currentPage.addEventListener("MSAnimationEnd", onEndAnimationCurrentPage, false);
    
    targetPage.addEventListener("animationend", onEndAnimationTargetPage, false);
    targetPage.addEventListener("webkitAnimationEnd", onEndAnimationTargetPage, false);
    targetPage.addEventListener("oanimationend", onEndAnimationTargetPage, false);
    targetPage.addEventListener("MSAnimationEnd", onEndAnimationTargetPage, false);
  };
    
  nodes = document.querySelectorAll('.navigation');
  for (var i=0; i<nodes.length; i++){
    nodes[i].addEventListener('touchstart', nodeClickedHandler, false);
    nodes[i].addEventListener('mousedown', nodeClickedHandler, false);
  }
});
