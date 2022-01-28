const radius10mi = document.getElementById('10mi');
const radius15mi = document.getElementById('15mi');
const radius25mi = document.getElementById('25mi');
const zipCodeBtn = document.getElementById('search-zipcode');
const gMap = document.getElementById('google-map');




//dropdown button 

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options = {};
    var instances = M.Dropdown.init(elems, options);
  });

//listen for radius drop down click 

let radiusClick = function () {

  radius10mi.addEventListener('click', function() {
    console.log('click10mi');
  });
  radius15mi.addEventListener('click', function() {
    console.log('click15mi');
  });
  radius25mi.addEventListener('click', function() {
    console.log('click25mi');
  });
  
};
radiusClick();

//listen for zip code button search
let searchZipCode = function () {

  zipCodeBtn.addEventListener('click', function() {
    console.log('search zip code');
    fetchGoogleAPI()
  })
};
searchZipCode(); 

//listen for map click
google.maps.event.addListener(map,'click', function (event) {
  console.log('map clicked');
});


//fetch Google api hard code

let fetchGoogleAPI = function () {

  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDqRH1nxaTzZ84VzNBJHDoKRPn0u3m3zt8')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });

 
};

  function initMap() {

    // Map options
      var options = {
        zoom: 12,
        center: {lat:40.7128,lng:-74.0060},
        disableDefaultUI: true,
      }

      // new map
      var map = new google.maps.Map(document.getElementById('map'), options);

    //function called addMarker to pass in values based on dynamic lat long input 
    //add marker function 


    addMarker({
      coords:{lat:40.7128,lng:-74.0060}
      
    });
    
    function addMarker(props) {

      var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        icon: props.iconImage
      });
    }

    /* 
      //add marker 

      var marker = new google.maps.Marker({
        position: options.center ,
        map: map
      })

      const infoWindow = new google.maps.InfoWindow({
        content: '<h6>New York, NY</h6>'
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    */
    }
   initMap();