
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var sites = require('./routes/sites');
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var io = require('socket.io');
var request = require('request'); //https://github.com/mikeal/request

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/your_sites', sites.site_list);
app.get('/check', function (req, res) {
	var start = process.hrtime();
	request({
		//uri : "http://127.0.0.1:12/",
		uri : "http://google.com",
		method : "GET"
	}, function (e, r, body) {
		if (e != null) {
			res.send("Couldn't connect to the host : "+e.code);
			return false;
		}

		var time = process.hrtime(start);
		r.responseTime = parseInt(time[0] * 1000000000 + time[1]);
		console.log("Response Status : ",r.statusCode);
		console.log('Response Time : ', (r.responseTime/1000000000).toFixed(2));
		
		res.send("Response : ");
		res.send(r);
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
