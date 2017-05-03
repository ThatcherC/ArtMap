var arrows = [];
var map;
var lineSymbol;

var yearSlider;
var yearLabel;
var categorySelector;

function initializeMap(){
  console.log("Initializing map");

  mapCenter = new google.maps.LatLng(50.078725, 14.367406);
  lineSymbol = {
   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };

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

  yearSlider = document.getElementById("yearSlider");
  yearLabel = document.getElementById("yearLabel");
  categorySelector = document.getElementById("category")
  infoPanel = document.getElementById("infoWindow");
}

function updateYear(){
  yearLabel.innerHTML="Year: "+yearSlider.value;
}

function reload(){
  //code to request new data will go here
  console.log("Reloading...");
  var year = yearSlider.value;
  $.ajax({url: "/countryCounts?year="+year,
          success: function(result){
            //displayData( JSON.parse(result) );
            //console.log(result);
            displayCountryCount(JSON.parse(result));
          }});
}

function getTestData(){
  $.ajax({url: "/testart",
          success: function(result){
            displayData( JSON.parse(result) );
          }});
}

//displays medals and entries for each country in a given year
function displayCountryCount(data){
  removeArrows();

  var text = "<big>"+yearSlider.value+" Results</big></br>";
  text += "<div style='height:200px; overflow: auto;' >";
  text += "<table class='table'>"
  text += "<tr><th>Country</th><th>Gold</th><th>Silver</th><th>Bronze</th><th>Total Entries</th></tr>";

  var minPathWeight = 2; //?
  var totalEntries = data.reduce(function(acc, cur, i, a){return acc+cur.entries}, 0);
  var fewestEntries = data.reduce(( acc, cur ) => Math.min( acc, cur.entries ), 100000);

  console.log("Total entries: "+totalEntries);
  console.log("fewestEntries: "+fewestEntries);

  for(var i = 0; i < data.length; i++){
    //TODO draw lines connecting places
    var line = "<tr><td><b>"+data[i]["country"]+":</b></td>";
    line+="<td>"+data[i].golds+"</td>";
    line+="<td>"+data[i].silvers+"</td>";
    line+="<td>"+data[i].bronzes+"</td>";
    line+="<td>"+data[i].entries+"</td>";
    line+="</tr>";
    text+=line;
  }

  text+="</table></div>";
  infoPanel.innerHTML = text;

  for(var i = 0; i < data.length; i++){
    var start = placeLookup[data[i].country];
    var end = {lat: 52.30, lng: 	13.25};      //TODO year city look up

    var pathCoords = [start, end];

    path = new google.maps.Polyline({
      path: pathCoords,
      strokeColor: '#CCCCCC',
      strokeOpacity: 1.0,
      strokeWeight: 2,//2*Math.log(data[i].entries/fewestEntries),
      //from https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-arrow
      icons: [{
        icon: lineSymbol,
        offset: '100%'
      }]
    });
    var marker = new google.maps.Marker({
        position: start,
        title: data[i].country
    });

    marker.setMap(map);
    path.setMap(map);
    arrows.push(path);
    arrows.push(marker);
  }
}


//Draws stuff on the map - old, might not work anymore
function displayData(data){
  var pieces = data.pieces;
  var artists = data['artists'];

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
      strokeWeight: 2,
      //from https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-arrow
      icons: [{
        icon: lineSymbol,
        offset: '100%'
      }]
    });

    path.setMap(map);
    arrows.push(path);
  }
}

function removeArrows(){
  for(var i = 0; i<arrows.length; i++){
    arrows[i].setMap(null);
  }
  arrows = [];
}

var placeLookup =  {"Germany"        : {lat: 52.30, lng: 	13.25},
                    "Italy"          : {lat: 41.54, lng: 	12.29},
                    "France"         : {lat: 48.50, lng: 2.20},
                    "United States"  : {lat: 39.91, lng: -77.02},
                    "Bohemia"       :{lat: 0, lng: 0},        //TODO fix
                    "Canada"         : {lat: 45.27, lng: -75.42},
                    "Russia"        : {lat: 0, lng: 0},        //TODO fix
                    "Poland"         : {lat: 52.13, lng: 21.00},
                    "Great Britain"  : {lat: 51.36, lng: 0.05},
                    "Switzerland"    : {lat: 46.57, lng: 7.28},
                    "Unknown"       : {lat: 0, lng: 0},        //TODO fix
                    "Belgium"        : {lat: 50.51, lng: 4.21},
                    "Norway"         : {lat: 59.55, lng: 10.45},
                    "Hungary"        : {lat: 47.29, lng: 19.05},
                    "Netherlands"    : {lat: 52.23, lng: 4.54},
                    "Denmark"        : {lat: 55.41, lng: 12.34},
                    "Monaco"        : {lat: 0, lng: 0},        //TODO fix
                    "Yugoslavia"     : {lat: 44.50, lng: 20.37},
                    "South Africa"   : {lat: -25.44, lng: 28.12},
                    "Luxembourg"     : {lat: 49.37, lng: 6.09},
                    "Czechoslovakia": {lat: 0, lng: 0},        //TODO fix
                    "Spain"          : {lat: 40.25, lng: 3.45},
                    "Greece"         : {lat: 37.58, lng: 23.46},
                    "Ireland"        : {lat: 53.21, lng: 6.15},
                    "Finland"        : {lat: 60.15, lng: 25.03},
                    "Brazil"         : {lat: -15.47, lng: -47.55},
                    "Uruguay"        : {lat: -34.50, lng: -56.11},
                    "Australia"      : {lat: 35.15, lng: 149.08},
                    "Egypt"          : {lat: 30.01, lng: 31.14},
                    "Austria"        : {lat: 48.12, lng: 16.22},
                    "Latvia"         : {lat: 56.53, lng: 24.08},
                    "Mexico"         : {lat: 19.20, lng: -99.10},
                    "Argentina"      : {lat: -36.30, lng: -60.00},
                    "Peru"           : {lat: -12.00, lng: -77.00},
                    "Romania"        : {lat: 44.27, lng: 26.10},
                    "El Salvador"    : {lat: 13.40, lng: -89.10},
                    "Venezuela"      : {lat: 10.30, lng: -66.55},
                    "Bulgaria"       : {lat: 42.45, lng: 23.20},
                    "Turkey"         : {lat: 39.57, lng: 32.54},
                    "Sweden"         : {lat: 59.20, lng: 18.03},
                    "Guatemala"      : {lat: 14.40, lng: -90.22},
                    "Colombia"       : {lat: 4.34, lng:  -74.00},
                    "Cuba"           : {lat: 23.08, lng: -82.22},
                    "Haiti"          : {lat: 18.40, lng: -72.20},
                    "Japan"          : {lat: 0, lng: 0},        //TODO fix
                    "Bolivia"        : {lat: 16.20, lng: -68.10},
                    "China"          : {lat: 39.55, lng: 116.20},
                    "Iceland"        : {lat: 64.10, lng: 21.57},
                    "Portugal"       : {lat: 38.42, lng: 09.10},
                    "India"          : {lat: 28.37, lng: 77.13},
                    "Philippines"    : {lat: 14.40, lng: 121.03}}
