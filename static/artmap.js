var arrows = [];
var cityToNationArrows = [];
var map;
var lineSymbol;

var yearSlider;
var yearLabel;
var categorySelector;

var dataForAllCountries;

var currentInfoWindowData;
var infoWindow;

function initializeMap(){
  console.log("Initializing map");

  mapCenter = new google.maps.LatLng(50.078725, 14.367406);
  lineSymbol = {
   path: google.maps.SymbolPath.CIRCLE
  };

  var mapOptions = {
    center: mapCenter,
    zoom: 4,
    minZoom: 2,
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
  reload();
}

function updateYear(){
  yearLabel.innerHTML="Year: "+yearSlider.value;
  reload();
}

const boxIDs = ["gold","silver","bronze","hm","none","sculpture","painting",
                "literature", "unknown", "architecture", "music"];

function stringOfFilters(){
  var year = yearSlider.value;

  var longURL = "year="+year;
  for(var i in boxIDs){
    var value = document.getElementById(boxIDs[i]).checked;
    longURL += "&"+boxIDs[i]+"="+value;
  }
  return longURL
}

function reload(){
  //code to request new data will go here
  const longURL = "/countryCounts?"+stringOfFilters();
  $.ajax({url: longURL,
          success: function(result){
            //displayData( JSON.parse(result) );
            //console.log(result);
            dataForAllCountries = JSON.parse(result)
            displayAllCountryData( dataForAllCountries );
          }});
}

function showCountry(country){
  const longURL = "/getEntries?country="+country+"&"+stringOfFilters();

  $.ajax({url: longURL,
          success: function(result){
            dataForOneCountry = JSON.parse(result)
            displayOneCountryText( dataForOneCountry, country);
            displayArrowsForOneCountry( dataForOneCountry, country );
          }});
}

//displays medals and entries for each country in a given year
//TODO this is very poorly named
function displayAllCountryData(data){
  removeArrows();

  displayAllCountryText(data);

  var minPathWeight = 2; //?
  var totalEntries = data.reduce(function(acc, cur, i, a){return acc+cur.entries}, 0);
  var fewestEntries = data.reduce(( acc, cur ) => Math.min( acc, cur.entries ), 100000);
  var mostEntries = data.reduce(( acc, cur ) => Math.max( acc, cur.entries ), -1);

  const minGray = 200;
  const maxGray = 10;

  const scale = (maxGray-minGray)/(mostEntries-fewestEntries);

  for(var i = 0; i < data.length; i++){
    var start = placeLookup[data[i].country];
    var end = hostLookup[yearSlider.value].location;

    var pathCoords = [start, end];
    const grayness = Math.round((data[i].entries-fewestEntries)*scale+minGray);
    const hex = grayness.toString(16);
    const digits = "00".substring(0, 2 - hex.length) + hex;
    const colorString = "#"+digits+digits+digits;

    path = new google.maps.Polyline({
      path: pathCoords,
      strokeColor: colorString,
      strokeOpacity: 1.0,
      strokeWeight: 4,//2*Math.log(data[i].entries/fewestEntries),
      //from https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-arrow
      icons: [{
        icon: lineSymbol,
        offset: '0%'
      }]
    });
    /*var marker = new google.maps.Marker({
        position: start,
        title: data[i].country
    });*/

    path.addListener('click',function(d){
      return function(){
        toggleInfoWindow(d);
      }}(data[i]));

    //marker.setMap(map);
    path.setMap(map);
    arrows.push(path);
    //arrows.push(marker);
  }
}

function toggleInfoWindow(data){
  if(JSON.stringify(data)!=JSON.stringify(currentInfoWindowData)){
    if(infoWindow){
      infoWindow.close();
    }
    currentInfoWindowData = data;

    var name = data.country;
    var golds = data.golds;

    var content = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h3 id="firstHeading" class="firstHeading">'+data.country+'</h3>'+
      '<div id="bodyContent">'+
      '<p><b>Golds:</b> '+data.golds+'</br>'+
      '<b>SIlvers:</b> '+data.silvers+'</br>'+
      '<b>Bronzes:</b> '+data.bronzes+'</br>'+
      '<b>Total:</b> '+data.entries+'</br>'+

      '</p></div></div>';

    infoWindow = new google.maps.InfoWindow({
      content: content,
      position: placeLookup[data.country]
    });
    infoWindow.open(map);
  }else{
    console.log("Closing window");
    infoWindow.close();
  }

}

function displayAllCountryText(data){
  var text = "<big>"+yearSlider.value+" Results - "+hostLookup[yearSlider.value].city+"</big></br>";
  text += "<div style='height:300px; overflow: auto;' >";
  text += "<table class='table'>"
  text += "<tr><th>Country</th><th>Gold</th><th>Silver</th><th>Bronze</th><th>Total Entries</th></tr>";

  for(var i = 0; i < data.length; i++){
    //TODO draw lines connecting places
    var line = "<tr><td><a onclick='showCountry(\""+
                  data[i]["country"] +
                  "\")'><b>"+data[i]["country"]+"</b></a></td>";
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

function displayOneCountryText(data, country){
  var text = "<big>"+country+"'s' Entries in "+yearSlider.value+"</big>";
  text += "    <a onclick='displayAllCountryText(dataForAllCountries)'>(back)</a>"
  text += "<div style='height:300px; overflow: auto;' >";
  text += "<table class='table'>"
  text += "<tr><th>Title</th><th>Category</th><th>Award</th></tr>";

  for(var i = 0; i < data.length; i++){
    var award = data[i].award;
    if(award==null) award=" ";

    var line = "<tr><td><a target='_blank' href=\"/entry?id="+
                  data[i].id +
                  "\"><b>"+data[i].title+"</b></a></td>";
    line+="<td>"+data[i].cat+"</td>";
    line+="<td>"+award+"</td>";
    line+="</tr>";
    text+=line;
  }

  text+="</table></div>";
  infoPanel.innerHTML = text;
}

function displayArrowsForOneCountry(data, country){
  removeCityArrows();

  /*var minPathWeight = 2; //?
  var totalEntries = data.reduce(function(acc, cur, i, a){return acc+cur.entries}, 0);
  var fewestEntries = data.reduce(( acc, cur ) => Math.min( acc, cur.entries ), 100000);
  var mostEntries = data.reduce(( acc, cur ) => Math.max( acc, cur.entries ), -1);

  const minGray = 200;
  const maxGray = 10;

  const scale = (maxGray-minGray)/(mostEntries-fewestEntries);
  */
  for(var i = 0; i < data.length; i++){
    if(data[i].coords != null){
      var start = data[i].coords;
      var end = placeLookup[country];


      var pathCoords = [start, end];
      /*
      const grayness = Math.round((data[i].entries-fewestEntries)*scale+minGray);
      const hex = grayness.toString(16);
      const digits = "00".substring(0, 2 - hex.length) + hex;
      const colorString = "#"+digits+digits+digits;
      console.log(grayness)

      console.log(colorString);
      */

      path = new google.maps.Polyline({
        path: pathCoords,
        strokeColor: '#DDAA99',
        strokeOpacity: 1.0,
        strokeWeight: 2,//2*Math.log(data[i].entries/fewestEntries),
        //from https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-arrow
        icons: [{
          icon: lineSymbol,
          offset: '100%'
        }]
      });
      /*var marker = new google.maps.Marker({
          position: start,
          title: data[i].country
      });*/

      path.addListener('click',function(d){
        return function(){
          //toggleInfoWindow(d);
          console.log("success");
        }}(data[i]));

      //marker.setMap(map);
      path.setMap(map);
      cityToNationArrows.push(path);
    }
  }
}

function removeArrows(){
  for(var i = 0; i<arrows.length; i++){
    arrows[i].setMap(null);
  }
  arrows = [];
}

function removeCityArrows(){
  for(var i = 0; i<cityToNationArrows.length; i++){
    cityToNationArrows[i].setMap(null);
  }
  cityToNationArrows = [];
}

const hostLookup  = {1912: {city: "Stockholm", location: {lat:59.323469, lng:18.302331}},
                   1916: {city: "No Olympics this year (WWI)", location: {lat:0,lng:0}},
                   1920: {city: "Antwerp", location: {lat:51.244400,lng:4.403144}},
                   1924: {city: "Paris", location: {lat:48.875414,lng:2.418237}},
                   1928: {city: "Amsterdam", location: {lat:52.392800,lng:4.781977}},
                   1932: {city: "Los Angeles", location: {lat:34.077439,lng:-118.233604}},
                   1936: {city: "Berlin", location: {lat:52.509176,lng:13.446451}},
                   1940: {city: "No Olympics this year (WWII)", location: {lat:0,lng:0}},
                   1944: {city: "No Olympics this year (WWII)", location: {lat:0,lng:0}},
                   1948: {city: "London", location: {lat: 51.561475, lng:-0.122371}}};

const placeLookup =  {"Germany"        : {lat: 51.039157, lng: 	10.038070},
                    "Italy"          : {lat: 41.54, lng: 	12.29},
                    "France"         : {lat: 46.57, lng: 2.20},
                    "United States"  : {lat: 40.431545, lng: -97.162319},
                    "Bohemia"       :{lat: 50.098465, lng: 13.694741},
                    "Canada"         : {lat: 56.958785, lng: -102.603963},
                    "Russia"        : {lat: 62.883011, lng: 91.801622},
                    "Poland"         : {lat: 52.13, lng: 21.00},
                    "Great Britain"  : {lat: 54.000065, lng: -1.933547},
                    "Switzerland"    : {lat: 46.57, lng: 7.28},
                    "Unknown"       : {lat: 0, lng: 0},        //TODO fix
                    "Belgium"        : {lat: 50.51, lng: 4.21},
                    "Norway"         : {lat: 59.55, lng: 10.45},
                    "Hungary"        : {lat: 47.29, lng: 19.05},
                    "Netherlands"    : {lat: 52.23, lng: 4.54},
                    "Denmark"        : {lat: 55.41, lng: 12.34},
                    "Monaco"        : {lat: 43.739438, lng: 7.426046},
                    "Yugoslavia"     : {lat: 44.50, lng: 20.37},
                    "South Africa"   : {lat: -25.44, lng: 28.12},
                    "Luxembourg"     : {lat: 49.37, lng: 6.09},
                    "Czechoslovakia": {lat: 50.060, lng: 14.444},
                    "Spain"          : {lat: 40.25, lng: 3.45},
                    "Greece"         : {lat: 37.58, lng: 23.46},
                    "Ireland"        : {lat: 53.21, lng: 6.15},
                    "Finland"        : {lat: 60.15, lng: 25.03},
                    "Brazil"         : {lat: -15.47, lng: -47.55},
                    "Uruguay"        : {lat: -34.50, lng: -56.11},
                    "Australia"      : {lat: -35.15, lng: 149.08},
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
                    "Japan"          : {lat: 36.383534, lng: 138.699676},
                    "Bolivia"        : {lat: -16.20, lng: -68.10},
                    "China"          : {lat: 39.55, lng: 116.20},
                    "Iceland"        : {lat: 64.10, lng: 21.57},
                    "Portugal"       : {lat: 38.42, lng: 09.10},
                    "India"          : {lat: 28.37, lng: 77.13},
                    "Philippines"    : {lat: 14.40, lng: 121.03}}
