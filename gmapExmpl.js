
    /*--*****************************************
         Example Google Maps functions


         initilization function is called once the window has completed loading. 
         ****************************************--*/

    var home = new google.maps.LatLng(30.284789, -97.721567); // this is a hardcoded coordinate that will center the map on inizilization change to what ever you want. 
    var map;   // this is here to initalize a google map variable. 
    var myMarker; // his is here to initalize the marker object you would have one of these already if you have a list of markers. 
    var poly;
    var image = "./img/orange-dot-small.png"; // this is the custom marker reference to the image in the repo. accepts png and SVG -- SVG will scale accordingly and will be visible in street view.

function initialize(){
    /* Grabbing the document element to load the map onto*/
    var mapCanvas = document.getElementById('map-canvas');
    
    /* initial map options */
    var mapOptions = {
        zoom: 16,  //self explanitory mess around with this. 
        center:home,      //centers the map on the variable coordiante pair labeled home
        mapTypeId: google.maps.MapTypeId.ROADMAP    // checkout the maps API to get the avialable mapTypes
        }
    map = new google.maps.Map(mapCanvas, mapOptions); 
    myMarker =new google.maps.Marker();
    poly = new google.maps.Polygon();

/*-- Custom Map Display uncomment to see what the diferences are 
      to adjust a map style grab the map feature ex.road and 
      if you want to give it an outline use dot syntax(geometry --->gemetry.stroke) 
      there are alot of layers you can turn off or style using visibility and coloring

--*/
/*
    Start of Map Styling

    map.set('styles', [
    {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
        {visibility:'on'},
      { color: '#33D633' },
      { weight: .80 }
      ]
  }, 
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
        {visibility:'on'},
      { color: '#80FF80' },
      { weight: 1.1 }
      ]
  }, 
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      { saturation: -100 },
      { invert_lightness: true }
    ]
  }, 
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
        {visibility:'on'},
      {hue:'#007A00'},
      { saturation: 99 },
      {lightness: -80}
    ]
  }, 
  {
    featureType: 'administrative.neighborhood',
    elementType: 'geometry',
    stylers: [
      { visibility: 'on'},
      { hue: '#006B00' },
      { lightness: -15 },
      { saturation: 99 }
    ]
  },
    {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      { visibility: 'off'},
    ]
  }
]);

   End of sytling
*/


 /* This eventlistener is for clicking on the map, the referenced function will add a marker at the clicked upon 
      latitude and longitude henc the name "addLatLng, it'll drop a marker that is styled with a png file.
*/

    google.maps.event.addListener(map, 'click', addLatLng);


// This event listener is for clicking on the marker, the function will sent the map on the clicked marker.

    myMarker.addListener('click', markerClickEvent);

}

/*  center the map on the clicked marker*/
function markerClickEvent(event){

  var pos = event.latLng
      map.setCenter(pos);

}


function polyOn (){
  if (poly){
  //This event listener is for drawing a polygon
    google.maps.event.addListener(map,'click', drawPoly);
  }else{
    google.maps.event.clearListeners(map,'click');
  }
}

function dropPolygon(){
      var hometurff; // this initializes the variable that you are passing google maps polygon layer. 
      var homeCoords = []; // This needs to hold an array of coordinates in the
                                                    // Lat, Long deimical format, alternatley you could populate 
                                                    // the home corods variable with a response from an app
        hometurff = new google.maps.Polygon({
        paths: homeCoords,         //sets the path of the polygon
        strokeColor: '#00CCFF',    //sets the path color of polygon
        srokeOpacity: 0.8,          // sets opacity
        strokeWeight: 2,            //thickness
        fillColor: '#66FFCC',      
        fillOpacity:0.35            
      });
    hometurff.setMap(map); // this loads the polygon onto the map by telling it what map you want to set it on hence passing is the map object.
  
}

/******************************
     drawing  on the map 
  *****************************/

function drawPoly (event){
  // draw a path using the polygon layer I think there's a more updated bethod using draw tools that came out.
  poly.setMap(map);   
  var path = poly.getPath();


  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);

}

/************************
    add a marker at the click lat, long
*************************/
function addLatLng(event) {

  // Add a new marker at the new plotted point on the map
    myMarker = new google.maps.Marker({
    position: event.latLng,
    title: '#',      
    icon:image,
    map: map
  });
    myMarker.addListener('click', markerClickEvent);
}

/***********************
    Clear the map , can be set to custom map button
*************************/
function clearMap(){
    clearPolygon();
    clearMarker(); // A little buggy because it cleares the last placed marker.


      /* this is here so you can reinitialize the listener
      */
      
      google.maps.event.addListener(map, 'click', addLatLng);
}
function clearPolygon(){
      poly.setMap(null);      
}
function clearMarker(){
    myMarker.setMap(null);
}


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
  } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
  }

      var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
        };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  }
  


google.maps.event.addDomListener(window, 'load', initialize);


var markers = [];

/* Inside marker loop */
markers.push(marker);

/* Marker click function */
function myClick(id)
{
  google.maps.event.trigger(markers[id], 'click');
}

/* Outside link to specific marker (number) */
<a href="#" onclick="myClick(0);">Name of Marker here</a>



