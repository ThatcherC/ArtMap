var arrows = [];
var map;

var placeLookup = {"Berlin, Germany": {lat: 52.496407, lng: 13.396856},
                   "New York City": {lat: 40.719513, lng:-74.010806},
                   "Switzerland": {lat: 47.002673, lng: 8.025174},
                   "Luxembourg": {lat: 49.677262, lng: 6.013087}}

function initializeMap(){
  console.log("Initializing map");

  mapCenter = new google.maps.LatLng(50.078725, 14.367406);

  var mapOptions = {
    center: mapCenter,
    zoom: 4,
    minZoom: 3,
    maxZoom: 13,
    streetViewControl: false,
  };

  latBox = document.getElementById("c-lat");
  lngBox = document.getElementById("c-lng");

  google.maps.visualRefresh = true;
  map = new google.maps.Map(document.getElementById("gmap"),
    mapOptions);

  sizeSlider = document.getElementsByName("boxSize")[0];
  sizeLabel = document.getElementById("boxSizeLabel");
}


function reload(){
  //code to request new data will go here
  console.log("Reloading...");
}

function getTestData(){
  $.ajax({url: "/testart",
          success: function(result){
            console.log( JSON.parse(result));
            displayData( JSON.parse(result));
          }});
}

function displayData(data){
  var pieces = data.pieces;
  var artists = data['artists'];
  console.log(data);
  for(var i = 0; i<pieces.length; i++){
    var country = pieces[i].countryOfOrigin;
    var gamesCountry = pieces[i].gamesCountry;
    var artistID = pieces[i].artistID;
    var artistLocation = artists[artistID].location;

    var start = placeLookup[artistLocation];
    var middle = placeLookup[country];
    var end = placeLookup[pieces[i].gamesCountry];

    var pathCoords = [
      start, middle, end
    ];

    path = new google.maps.Polyline({
      path: pathCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    
    path.setMap(map);
    arrows.push(path);
  }
}
