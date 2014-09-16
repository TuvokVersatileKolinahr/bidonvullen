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
    var rest = new Rest();
    // get taps for this location
    var url = (window.location.href.match(/localhost/) ? 'http://bidonvullen.tuvok.nl' : "") + '/api/taps/prox/';
    rest.get(url + JSON.stringify(locdata), {
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
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
     console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
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

  // take photo
  var takePicture = function(e){
    e.preventDefault();
    document.querySelector('.toggle-camera').click();
  };


  
  document.querySelector('.toggle-camera').addEventListener('change', function(e){
    e.preventDefault();
    function base64Encode( buffer ) {
        var binary = '',
        bytes = new Uint8Array( buffer ),
        len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    };
    var reader = new FileReader(),
    input = document.querySelector('.toggle-camera'),
    file = input.files[0];
    reader.onloadend = function(e) {
      var dataURL =  'data:'+file.type+';base64,'+base64Encode(e.target.result);
      document.querySelector('.pic-taken').src = dataURL;
      document.querySelector('.goto-picture').dispatchEvent(new CustomEvent('touchstart'));
    };
      reader.readAsArrayBuffer(file);
    }, false);
 document.querySelector('.take-picture').addEventListener('touchstart', takePicture, false);
 document.querySelector('.take-picture').addEventListener('mousedown', takePicture, false);
});
