var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var options = { useNewUrlParser: true };
var fs = require('fs');

MongoClient.connect(url, options, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");

	// users
	var obj = JSON.parse(fs.readFileSync('./resources/users.js', 'utf8'));
	dbo.collection("users").insertMany(obj, function(err, res) {
		if (err) throw err;
		console.log(res.insertedCount + " user documents inserted");
		// db.close();
	});

	// posts
	var obj = JSON.parse(fs.readFileSync('./resources/posts.js', 'utf8'));
	dbo.collection("posts").insertMany(obj, function(err, res) {
		if (err) throw err;
		console.log(res.insertedCount + " post documents inserted");
		// db.close();
	});

	// comments
	var obj = JSON.parse(fs.readFileSync('./resources/comments.js', 'utf8'));
	dbo.collection("comments").insertMany(obj, function(err, res) {
		if (err) throw err;
		console.log(res.insertedCount + " user comments inserted");
		// db.close();
	});

	// albums
	var obj = JSON.parse(fs.readFileSync('./resources/albums.js', 'utf8'));
	dbo.collection("albums").insertMany(obj, function(err, res) {
		if (err) throw err;
		console.log(res.insertedCount + " albums documents inserted");
		// db.close();
	});

	// photos
	var obj = JSON.parse(fs.readFileSync('./resources/photos.js', 'utf8'));
	dbo.collection("photos").insertMany(obj, function(err, res) {
		if (err) throw err;
		console.log(res.insertedCount + " photos documents inserted");
		// db.close();
	});

	db.close();

});