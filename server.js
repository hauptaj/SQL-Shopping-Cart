var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var connectionString = 'postgres://postgres:MayaGirl!4@localhost:5432/postgres';
var client = new pg.Client(connectionString);

var config = { user: 'postgres', database: 'postgres', password: 'MayaGirl!4',
host: 'localhost', port: 5432, max: 100, idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

app.use(bodyParser.json({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/get-item', function (req, res, next) {
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT * FROM shoppingcart ORDER BY price');
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      console.log(results);
      client.end();
      return res.json(results);
    });
  });
});

app.post('/add-item', function (req, res, next) {
  var results = [];
  var data = {
    product: req.body.product,
    price: req.body.price
  }
  pg.connect(connectionString, function(err, client, done) {
    client.query('INSERT INTO shoppingcart(product, price) VALUES ($1, $2)',[data.product, data.price]);
    var query = client.query('SELECT * FROM shoppingcart');
    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      console.log(results);
      client.end();
      return res.json(results);
    });
  });
});




var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('PostgreSQL server running at http://localhost:%s', port);
});
