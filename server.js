//var pg = require('pg');
var express = require('express');
var mysql = 		require('mysql');
var app = express();

var config = {
		'host':'localhost',
		'user':'root',
		'password':'abso1utehe1icopter',    //may need to change this TODO
		'database':'olympics'
	};

var db = mysql.createConnection(config);
db.connect();

app.use(express.static('static'));
app.listen(8000);

app.get("/countryCounts",function(req, res){
  var year =    parseInt(req.query.year); //TODO: don't parse in probably
  var medal =   parseInt(req.query.end);
  var country = parseInt(req.query.bins);
  var type = req.query.page;
  var dataType = req.query.type;

  db.query("select Team as country, count(*) as entries, \
            count(gold) as golds, \
            count(silver) as silvers, \
            count(bronze) as bronzes \
            from olympic_results where year=? group by Team order by count(*) DESC;",
            [year],
    function(err,rows){
      if(err){
      	console.log(err);
      }else{
        console.log(rows);
        res.end( JSON.stringify(rows) );
      }
    });
  });

app.get("/getart",function(req, res){
  var year =    parseInt(req.query.year); //TODO: don't parse in probably
  var medal =   parseInt(req.query.end);
  var country = parseInt(req.query.bins);
  var type = req.query.page;
  var dataType = req.query.type;

  //select Team, count(*) from olympic_results group by Team order by count(*) DESC;

  db.query("select r.Title, r.Athlete, r.personID, r.Medal, r.Team \
            from olympic_results as r where year=? and `General Category`=?",
            [1948,"Architecture"],
    function(err,rows){
      if(err){
      	console.log(err);
      }else{
        console.log(rows);
      }
    });
  res.end("response");


  //things needed:
  //Title, host city, (General) Category, Medal artist name, NOC(Team), artist bio

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
