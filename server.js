var express = require('express');
var app = express();
var fs = require("fs");
var url = require('url');

var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017/";
var options = { useNewUrlParser: true };



app.all('/*', function(req, res, next) {
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'content-type');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Expose-Headers', 'Content-Range');
	res.header('Access-Control-Expose-Headers', 'X-Total-Count');
	res.header('Vary', 'Origin, Access-Control-Request-Headers');
	if (req.method === 'OPTIONS') {
		res.header('Content-Length','0');
	}

	next();
});

app.get('/users', function (req, res) {

	MongoClient.connect(dburl,  { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydb");

		var q = url.parse(req.url, true).query;
		console.log(q)

		var mysort = {
			[(q._sort == undefined ? "id" : q._sort)] : (q._order == "ASC" ? 1 : -1) 
		}

		if (q.id_like !== undefined) {
			var mywhere = {
				id : { $in: q.id_like.split('|').map(i => parseInt(i)) }
			} 
		}else{
			var mywhere = {
				id: {
					$gt: (q._start == undefined ? 1 : parseInt(q._start)) - 1,
					$lt: (q._end == undefined ? 10 : parseInt(q._end)) + 1
				}
			}
		}

		dbo.collection("users").find(mywhere).sort(mysort).toArray(function(err, result) {
			if (err) throw err;
			res.header('X-Total-Count', '10');
			res.json(result);
			res.end();
			db.close();
		});

	});

})

app.get('/posts', function (req, res) {
	MongoClient.connect(dburl,  { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydb");

		var q = url.parse(req.url, true).query;
		console.log(q)

		var mysort = {
			[(q._sort == undefined ? "id" : q._sort)] : (q._order == "ASC" ? 1 : -1) 
		}

		if (q.id_like !== undefined) {
			var mywhere = {
				id : { $in: q.id_like.split('|').map(i => parseInt(i)) }
			} 
		}else{
			var mywhere = {
				id: {
					$gt: (q._start == undefined ? 1 : parseInt(q._start)) - 1,
					$lt: (q._end == undefined ? 10 : parseInt(q._end)) + 1
				}
			}
		}

		dbo.collection("posts").find(mywhere).sort(mysort).toArray(function(err, result) {
			if (err) throw err;
			res.header('X-Total-Count', '101');
			res.json(result);
			res.end();
			db.close();
		});

	});
})

app.get('/comments', function (req, res) {
	fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
		console.log( data );
		res.end( data );
	});
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})