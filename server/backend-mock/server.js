/**
 * Mock server that serves static files.
 */
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var fs         = require('fs');
var path       = require('path');

// Configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var logger = function(req, res, next) {
  var resEnd = res.end;
  var status;
  var method;

  res.end = function(chunk, encoding) {
    res.end = resEnd;
    res.end(chunk, encoding);
    status = res.statusCode;
    method = res.req.method;
    var date = new Date();
    var now = date.getFullYear() + '-'
      + (pad(date.getMonth() + 1, 2)) + '-'
      +  pad(date.getDate(), 2) + ' '
      +  pad(date.getHours(), 2) + ':'
      +  pad(date.getMinutes(), 2) + ':'
      +  pad(date.getSeconds(), 2);
    console.log(status + ' * ' + now + ' >> ' + method + ' ' + req.originalUrl);
  };

  next();
};
app.use(logger);

var port = process.env.PORT || 3002;        // set our port

/**
 * Helper function that takes a response object and a file path.
 */
var respondWithFile = function(res, file) {
  var fileWithPath = path.resolve(__dirname, file);
  fs.readFile(fileWithPath, 'utf8', function(err, data) {
    var response =  err ? {error: 'File not found: ' + fileWithPath} : JSON.parse(data);
    res.json(response);
  });
};

var router = express.Router();

router.get('/contacts', function (req, res) {
  respondWithFile(res, 'models/contacts/contacts.json');
});

router.get('/contacts/:id', function (req, res) {
  respondWithFile(res, 'models/contacts/contact_' + req.params.id + '.json');
});

router.get('/', function(req, res) {
  respondWithFile(res, 'models/contacts/contact.json');
});

// Register our routes.
// All of our routes will be prefixed with /api
app.use('/app', router);

// Start the server
app.listen(port);

console.log('Server listening on port ' + port);
