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
app.set('view engine', 'ejs'); // set up ejs for templating
app.listen(8000);

app.get("/countryCounts",function(req, res){
  var year =    parseInt(req.query.year); //TODO: don't parse in probably
  var medal =   req.query.medals;
  var type =    req.query.type;
  var dataType = req.query.type;

	//TODO santize these
	conditions = "year="+year+" ";

	var awardConditions = [];
	var typeConditions  = [];

	if(req.query.gold=="true") awardConditions.push("Rank='1'");
	if(req.query.silver=="true") awardConditions.push("Rank='2' OR Rank='2T'");
	if(req.query.bronze=="true") awardConditions.push("Rank='3' OR Rank='3T'");
	if(req.query.hm=="true") awardConditions.push("Rank='HM'");
	if(req.query.none=="true") awardConditions.push("Rank='AC'");

	if(req.query.literature=="true") typeConditions.push("`General Category`='Literature'");
	if(req.query.music=="true") typeConditions.push("`General Category`='Music'");
	if(req.query.sculpture=="true") typeConditions.push("`General Category`='Sculpture'");
	if(req.query.unknown=="true") typeConditions.push("`General Category`='Unknown'");
	if(req.query.painting=="true") typeConditions.push("`General Category`='Painting'");
	if(req.query.architecture=="true") typeConditions.push("`General Category`='Architecture'");

	if(awardConditions.length>0){
		conditions += "and ("+awardConditions.join(" OR ")+") ";
	}

	if(typeConditions.length>0){
		conditions += "and ("+awardConditions.join(" OR ")+") ";
	}

  db.query("select Team as country, count(*) as entries, \
            count(gold) as golds, \
            count(silver) as silvers, \
            count(bronze) as bronzes \
            from olympic_results where "+conditions+" group by Team order by count(*) DESC;",
            [year],
    function(err,rows){
      if(err){
      	console.log(err);
      }else{
        res.end( JSON.stringify(rows) );
      }
    });
  });

//gets entries (Title, Artist, Category, Award, id) for given filters
app.get("/getEntries",function(req, res){
  var year = parseInt(req.query.year);
  var country = req.query.country;

  db.query("select Title as title, Athlete as competitor, personID as artistid,\
            Medal as award, `General Category` as cat, id from olympic_results where Team=? and year=?",
          [country, year], function(err, rows){
            if(err){
            	console.log(err);
            }else{
              res.end( JSON.stringify(rows) );
            }
          });
});

//displays a web page for a given entry - ejs?
app.get("/entry",function(req,res){
  var id = parseInt(req.query.id);
  var testURL = "https://s-media-cache-ak0.pinimg.com/originals/c3/d7/7f/c3d77f5f73a4f03041cb854d8dce6b82.jpg";
  db.query("select Title as title, Athlete as competitor, personID as pid,\
            Medal as award, `General Category` as gcat, event as speccat from olympic_results where id=?",
            [id],function(err, rows){
              if(err){
              	console.log(err);
              }else{
                var r = rows[0];
                res.render('entry.ejs',{imgurl: testURL, title: r.title, competitor: r.competitor, gencat: r.gcat, speccat: r.speccat, award: r.award, pid: r.pid});
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
