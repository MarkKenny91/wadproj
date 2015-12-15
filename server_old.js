//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'public')));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/', function(req, res){
  res.render('index'); //Tells router to look in client for index.html
});

router.get('/get/json', function(req, res) {
   res.setHeader('content-type', 'application/json');//setting header for http request as application/json - sends application & json back
   
});

router.post('/post/json', function(req, res){
  console.log(req.body);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});