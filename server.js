var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var xslt = require('node_xslt');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// GET request to dislay index.html located inside /client folder
router.get('/', function(req, res) {
  res.render('index');
});

// GET request to send back JSON file
router.get('/get/json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var obj = JSON.parse(fs.readFileSync('Countries.json', 'utf8'));
  res.end(JSON.stringify(obj));
});

// HTML produced by XSL Transformation
router.get('/get/html', function(req, res) {
  
  // Read in XML and XSL files
  var stylesheet = xslt.readXsltFile('Countries.xsl');
  var doc = xslt.readXmlFile('Countries.xml');
  
  // Apply transformation
  var result = xslt.transform(stylesheet, doc, []);
  
  // Render the result
  res.send(result);
  
});

// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {

    // Read in a JSON file
    var JSONfile = fs.readFileSync('Countries.json', 'utf8');

    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);

    // Add a new record into country array within the JSON file    
    JSONparsed.country.push(obj);

    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);

    // Write the updated JSON file back to the system 
    fs.writeFileSync('Countries.json', JSONformated);

    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser("countries", JSONformated);

    // Write the resulting XML back to the system
    fs.writeFileSync('Countries.xml', XMLformated);

  }

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});