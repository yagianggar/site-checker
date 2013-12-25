var database = require('../libs/database.js'); // https://github.com/felixge/node-mysql
var connection = database.connect();
exports.site_list = function(req, res){
	console.log("Inside Routes");
	var connection = database.connect();
	connection.query('SELECT * from divisi', function(err, rows, fields) {
	  if (err) throw err;
	  console.log(rows);
	});

	connection.end();

  	res.render('your_sites', { title: 'Your Sites', msg : 'This is site page' });
};

exports.add = function(req, res){
  res.render('add_sites', { title: 'Add New Sites', msg : 'This is site page' });
};

exports.save = function (req, res) {
	var post = req.body
	var insertQuery = null;

	if (post.site_id == "" || typeof post.site_id === "undefined") {
		insertQuery = "INSERT INTO sites (user_id,sites,intervals,active) VALUES ('111','"+post.url+"','"+post.interval+"',true)";
	} else {
		insertQuery = "UPDATE sites SET sites='"+post.url+"',intervals='"+post.interval+"' WHERE id="+post.site_id;
	}
	
	connection.query(insertQuery, function (err, rows, fields) {
		//if (err) throw err;

		if (err) {
			data = {
				'error' : true,
				'error_msg' : err.code
			}
			res.writeHead(200, { 'Content-Type': 'application/json' }); 
      		res.end(JSON.stringify(data));

		} else {
			data = {
				'error' : false,
				'msg' : 'Site saved successfully'
			}
			res.writeHead(200, { 'Content-Type': 'application/json' }); 
      		res.end(JSON.stringify(data));
		}
	});
	//connection.end();
}

exports.view = function (req, res) {
	connection.query("SELECT * FROM sites", function (err, rows, fields) {
		res.render('site', {title : 'Sites List', msg : 'This is sites management', data : JSON.stringify(rows)});
	});
}

exports.update = function (req, res) {
	connection.query("SELECT * FROM sites WHERE id="+req.params.id, function (err, rows, fields) {
		res.render('update_sites', {title : 'Update Sites', msg : 'This is sites management', data : JSON.stringify(rows)});
	});
}

exports.delete = function (req, res) {
	connection.query("DELETE FROM sites WHERE id="+req.params.id, function (err, rows, fields) {
		res.redirect('/sites/view');
	});
}