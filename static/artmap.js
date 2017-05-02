var arrows = [];
var map;

var placeLookup = {"Berlin, Germany": {lat: 52.496407, lng: 13.396856},
                   "New York City": {lat: 40.719513, lng:-74.010806},
                   "Switzerland": {lat: 47.002673, lng: 8.025174},
                   "Luxembourg": {lat: 49.677262, lng: 6.013087}}

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
  infoPanel = document.getElementById("infoWindow")
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

function displayCountryCount(data){
  var text = "<big>"+yearSlider.value+" Results</big></br>";
  text += "<div style='height:200px; overflow: auto;' >";
  text += "<table class='table'>"
  text += "<tr><th>Country</th><th>Gold</th><th>Silver</th><th>Bronze</th><th>Total Entries</th></tr>";
  for(var i = 0; i < data.length; i++){
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
}

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
