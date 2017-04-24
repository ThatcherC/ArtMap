//var pg = require('pg');
var express = require('express');
var app = express();

var config = {
  user: "candidate",
  database: "memory_tracker",
  host: "aws-us-east-1-portal.8.dblayer.com",
  password: "giap-quib-fac-wav-mi",
  port: 10131
}

app.use(express.static('static'));
app.listen(8000);

//var database = new pg.Client(config);
/*
database.connect(function(err){
  if(err) throw err;
});
*/
app.get("/getart",function(req, res){
  var year =    parseInt(req.query.year); //TODO: don't parse in probably
  var medal =   parseInt(req.query.end);
  var country = parseInt(req.query.bins);
  var type = req.query.page;
  var dataType = req.query.type;

  //Sends back an object of
  //{pieces: [...], artists: [...]}
  //where pieces are made of [title, url, artistID, countryOfOrigin, year, medal]
  //and artists are made of  [name, bio, country, artistID] (referenced by artistID though)
/*
  database.query("select distinct current_page from reports;",
    function(err, results){
      //....
      res.end( JSON.stringify( pages ) );
    })*/
});

app.get("/testart",function(req, res){
  var pieces = [{title: "Arosa I Placard", url: "http://images.complex.com/complex/image/upload/c_limit,w_680/fl_lossy,pg_1,q_auto/o1sliwrtuiji7yqowzjj.jpg", artistID: "a2", countryOfOrigin: "Switzerland", year: 1936, medal: "gold", gamesCountry: "Berlin, Germany"},
                {title: "Rugby", url: "https://upload.wikimedia.org/wikipedia/commons/6/61/Rugby_by_Jean_Jacoby.png", artistID: "a1", countryOfOrigin: "Luxembourg", year: 1928, medal: "gold", gamesCountry: "Berlin, Germany"},
                //{title: "", url: "", artistID: "", countryOfOrigin: "", year: , medal: ""}
              ]
  var artists = {'a1':{name: "Jean Jacoby",
                       bio:"Jean Lucien Nicolas Jacoby was a Luxembourg artist. He won Olympic gold medals in the Olympic art competitions of 1924 and 1928, making him the most successful Olympic artist ever.",
                       location: "New York City"},
                 'a2':{name: "Alex Diggelmann",
                       bio: "Alex Walter Diggelmann was a Swiss graphic artist and book designer best known for his sports posters.[1] Diggelmann who won three medals in the Olympic Games.",
                       location: "Switzerland"}
                     };
  res.end(JSON.stringify({'pieces': pieces, 'artists': artists}));
});
