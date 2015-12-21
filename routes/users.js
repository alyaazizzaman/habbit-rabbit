'use strict';

var express = require('express');
var router = express.Router();



// reqire pg that interacts with knex
var pg = require('pg');
//database requires
var knex = require('knex')({
  client: 'pg', //we will be using pg to connect to postgres
  connection: {
    host: '127.0.0.1', //localhost server
    port: 5432, //default pg server port
    user: 'Mundizzle', //your username
    database: 'habbitrabbit' //yourdatabase name
  }
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// Get USER by ID
router.get('/get/:id', function(req, res) {
  var id = req.params.id;
  knex.select('*').table('users').where('id', id).then(function(success) {
    console.log(success[0].firstname);
    res.write(success[0].firstname);
    res.end();

  }, function(failure) {
    console.log('You Failed: ' + failure);
  });
});

// Creat User

router.get('/create/', function(req, res) {
  res.write("Its here");
  res.end('THing');
  // set
  console.log(req.body.user.firstname);
  console.log(req.body.user.lastname);
  console.log(req.body.user.email);
  console.log(req.body.user.phone);
  console.log(req.body.user.username);
  console.log(req.body.user.password);

  console.log(req.body.user.firstname);
  console.log(req.body.user.lastname);
  console.log(req.body.user.email);
  console.log(req.body.user.phone);
  console.log(req.body.user.username);
  console.log(req.body.user.password);


}, function(failure) {
  console.log('You Failed: ' + failure);
});


module.exports = router;
