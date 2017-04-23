var pg = require('pg');
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

var database = new pg.Client(config);

database.connect(function(err){
  if(err) throw err;
});

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

  database.query("select distinct current_page from reports;",
    function(err, results){
      //....
      res.end( JSON.stringify( pages ) );
    })
});
