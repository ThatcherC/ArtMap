//var pg = require('pg');
var express = require('express');
var mysql = 		require('mysql');
var app = express();
var cityLookup = require("./cityLookup.js").cityLookup;

var config = {
		'host':'localhost',
		'user':'root',
		'password':'abso1utehe1icopter',    //may need to change this TODO
		'database':'olympics2'
	};

var db = mysql.createConnection(config);
db.connect();

app.get('/', function(req, res) {
    res.sendFile(__dirname+"/static/intro.html");
});

app.use(express.static('static'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.listen(8000);

//returns each country's medal count
app.get("/countryCounts",function(req, res){
	var conditions = queryToFilterConditions(req.query);

  db.query("select Team as country, count(*) as entries, \
            count(gold) as golds, \
            count(silver) as silvers, \
            count(bronze) as bronzes \
            from olympic_results where "+conditions+" group by Team order by count(*) DESC;",
    function(err,rows){
      if(err){
      	console.log(err);
      }else{
        res.end( JSON.stringify(rows) );
      }
    });
  });

//gets entries (Title, Artist, Category, Award, City, id) for given filters
app.get("/getEntries",function(req, res){
  var country = req.query.country;
	var conditions = queryToFilterConditions(req.query);

  db.query("select Title as title, Athlete as competitor, personID as artistid, City as city, \
            Medal as award, `General Category` as cat, ImageURL!='' as havePicture, id from olympic_results where Team=? and " +
						conditions+";",
          [country], function(err, rows){
            if(err){
            	console.log(err);
            }else{
							for(var i = 0; i<rows.length; i++){
								if(rows[i].city!=""){
									console.log(rows[i].city);
									rows[i]['coords'] = cityLookup[rows[i].city].coords;
								}else{
									rows[i]['coords'] = null;
								}
							}
              res.end( JSON.stringify(rows) );
            }
          });
});

function queryToFilterConditions(q){
	var year =    parseInt(q.year); //TODO: don't parse in probably
  var medal =   q.medals;
  var type =    q.type;
  var dataType = q.type;

	//TODO santize these
	conditions = "year="+year+" ";

	var awardConditions = [];
	var typeConditions  = [];

	if(q.gold=="true") awardConditions.push("Rank='1'");
	if(q.silver=="true") awardConditions.push("Rank='2' OR Rank='2T'");
	if(q.bronze=="true") awardConditions.push("Rank='3' OR Rank='3T'");
	if(q.hm=="true") awardConditions.push("Rank='HM'");
	if(q.none=="true") awardConditions.push("Rank='AC'");

	if(q.literature=="true") typeConditions.push("`General Category`='Literature'");
	if(q.music=="true") typeConditions.push("`General Category`='Music'");
	if(q.sculpture=="true") typeConditions.push("`General Category`='Sculpture'");
	if(q.unknown=="true") typeConditions.push("`General Category`='Unknown'");
	if(q.painting=="true") typeConditions.push("`General Category`='Painting'");
	if(q.architecture=="true") typeConditions.push("`General Category`='Architecture'");

	if(awardConditions.length>0){
		conditions += "and ("+awardConditions.join(" OR ")+") ";
	}

	if(typeConditions.length>0){
		conditions += "and ("+typeConditions.join(" OR ")+") ";
	}else{
		conditions += "and `General Category`='asf'"; //necessary to make sure we filter out everything if all filters are deselected
	}

	return conditions;
}

//displays a web page for a given entry - ejs?
app.get("/entry",function(req,res){
  var id = parseInt(req.query.id);
  var testURL = "https://s-media-cache-ak0.pinimg.com/originals/c3/d7/7f/c3d77f5f73a4f03041cb854d8dce6b82.jpg";
  db.query("select Title as title, Athlete as competitor, personID as pid, ImageURL, year, Team as team,\
            Medal as award, `General Category` as gcat, event as speccat, City as city from olympic_results where id=?",
            [id],function(err, rows){
              if(err){
              	console.log(err);
              }else{
                var r = rows[0];
                res.render('entry.ejs',{imgurl: r.ImageURL, title: r.title,
																				competitor: r.competitor, gencat: r.gcat,
																				speccat: r.speccat, award: r.award,
																				pid: r.pid, year: r.year, city: hostLookup[r.year],
																				submissionCity: r.city, team: r.team});
              }
            });
});

//displays a web page for a given artist - ejs
app.get("/competitor",function(req, res){
  var artistID = req.query.id;
  var testURL = "https://aapsa.net/images/staff/placeholder.png";
  //make a request for this artist's bio and url
  db.query("select BIO as bio, URL as url from olympic_bios where `ARTIST ID`=?;",
            [artistID],function(err, rows){
              if(err){
              	console.log(err);
              }else{
                var bio = rows[0].bio;
                var url = rows[0].url;
                //make a query for this artist's works
                //want to entry name, year, id, award
                db.query("select Title as title, year, `Host City` as venue, Medal as award, id, \
                          Athlete as artistName from olympic_results where personID=?;", [artistID],
                          function(err, rows){
                            var artistName = rows[0].artistName;
                            res.render('artist.ejs',{imgurl: testURL, url: url, name: artistName, bio: bio, works: rows});
                          });
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
});

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
