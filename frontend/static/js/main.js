
document.addEventListener('DOMContentLoaded', function () {
  var map = new Maps();
  setInterval(function(){
    map.getLocation(map.showPosition,map.showError );
    console.log('update position');
  }, 2000);


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

    document.getElementById('picture').classList.toggle('show');
    //document.querySelector('.toggle-camera').click();
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


var Maps = function(){
  var map, heremarker, currentLocData,
  drawNearbyTaps = function(map, locdata) {
      var rest = new Rest();
      var image = 'static/css/img/tap-20x20.png';
      // get taps for this location
      var url = (window.location.href.match(/localhost/) ? 'http://bidonvullen.tuvok.nl' : "") + '/api/taps/prox/';
      rest.get(url + JSON.stringify(locdata), {
        success: function(data, status, xhr){
          for (var t = 0; t < data.result.length; t++) {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(data.result[t].geolocation[0], data.result[t].geolocation[1]),
              title: data.result[t].name,
              map: map,
              icon: image
            });
          }
        }
      });
  },
  showError = function(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
       console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.error("An unknown error occurred.");
        break;
    }
  },
  getLocation = function(success, failure) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, failure);
    } else { 
      console.error("Geolocation is not supported by this browser.");
    }
  },
  showPosition = function(position) {
      locdata = {lat: position.coords.latitude, lng: position.coords.longitude};
      if (!currentLocData || currentLocData.lat != locdata.lat || currentLocData.lng != locdata.lng){
        currentLocData = locdata;
        drawNearbyTaps(map, currentLocData);
      }
  },
  initialize = function() {
    getLocation(function(position){
          var lat = position.coords.latitude,
          lng = position.coords.longitude
          mapOptions = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 15
          },
          map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions),
        heremarker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(lat, lng),
          title: 'U bent hier',
          icon: 'static/css/img/here_pin.png'
        }),
        circlemarker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(lat, lng),
          icon: 'static/css/img/empty.png'
        }),
        circle = new google.maps.Circle({
          map: map,
          radius: 400,
          fillColor: '#333',
          strokeWeight: 0
        });

      circle.bindTo('center', circlemarker, 'position');

      showPosition( position);

      google.maps.event.addListener(map, 'center_changed', function() {
        circlemarker.setPosition(new google.maps.LatLng(map.getCenter().k, map.getCenter().B));
      });
      google.maps.event.addListener(map, 'dragend', function() {
        locdata = {lat: map.getCenter().k, lng: map.getCenter().B};
        drawNearbyTaps(map,  locdata);
      });
    }, showError);
  }

  initialize();

  return {
    getLocation  : getLocation,
    showPosition : showPosition,
    showError    : showError
  }
};
