'use strict';

var express = require('express');
var router = express.Router();
// reqire pg that interacts with knex
var pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});


var streakArray = [];

function getMaxofArray(numArray) {
  return Math.max.apply(null, numArray);
}

var data = [{
  habits: 'coding',
  streak: '4',
  streakHabit: 'coding',
  goal: '10',
  progressBar: '60'
}, {
  habits: 'jogging',
  streak: '6',
  streakHabit: 'jogging',
  goal: '10',
  progressBar: '80'
}, {
  habits: 'breathing',
  streak: '3',
  streakHabit: 'breathing',
  goal: '10',
  progressBar: '10'
}, {
  habits: 'eating',
  streak: '10',
  streakHabit: 'eating',
  goal: '10',
  progressBar: '100'
}];

//********* USER ROUTES***********//
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  // HABITS DATA REQUEST BASED ON USER ID
  knex.select('*').table('goodhabits').where('userid', id).then(function(success) {
    // NEED TO ADD VIEWS BASED ON DATA RETURNED
    console.log(success);
  }, function(failure) {
    console.log('The query Failed: ' + failure);
  });

  // router.get('/:id', function(req, res, next) {
  //   // var longestStreak = getMaxofArray(streakArray);
  //   // var longStreak = getMaxofArray(streakArray);
  //   // for (var i = 0; i <= data.length-1; i++) {
  //   //   streakArray.push(data[i].streak);
  //   //   return streakArray;
  //   //   console.log(streakArr);
  //   // }
  //   var userData = {
  //     name: "Alya",
  //     habits: data,
  //     // streak:
  //     // longestStreak: longStreak
  //   };
  //
  //   res.render('show', userData);
  //   // var longestStreak = getMaxofArray(streakArray);
  // });

  // HABIT LOG DATA REQUEST BASED ON USER ID
  knex.select('*').table('habitlog').where('userid', id).then(function(success) {
    // NEED TO ADD VIEWS BASED ON DATA RETURNED
    console.log(success);
  }, function(failure) {
    console.log('The query Failed: ' + failure);
  });
});


router.get('/', function(req, res, next) {

  res.render('users', {
    title: 'Habbit Rabbit'
  });

});

<<<<<<< HEAD
router.get('/:id', function(req, res, next) {
  // var longestStreak = getMaxofArray(streakArray);
  // var longStreak = getMaxofArray(streakArray);
  // for (var i = 0; i <= data.length-1; i++) {
  //   streakArray.push(data[i].streak);
  //   return streakArray;
  //   console.log(streakArr);
  // }
  var userData = {
    name: "Alya",
    habits: data,
    streak: data[0].streak
    // streak:
    // longestStreak: longStreak
  };

  res.render('show', userData);
  // var longestStreak = getMaxofArray(streakArray);
=======
// Get USER by ID
router.get('/get/:id', function(req, res) {

  var id = req.params.id;
  knex.select('*').table('users').where('id', id).then(function(success) {
    console.log(success[0].firstname);
    res.write(success[0].firstname);
    res.end();

  }, function(failure) {
    console.log('The query Failed: ' + failure);
  });

>>>>>>> 14a51ae694ca5fc005f873f77654f77506d38aa2
});

// Create User /users/create
router.post('/create', function(req, res) {
  var user = {};
  // set variables to the post request
  // user.id = ;
  user.firstname = req.body.firstName;
  user.lastname = req.body.lastName;
  user.email = req.body.userEmail;
  user.phone = req.body.phoneNum;

  user.username = req.body.newUsername;
  user.password = req.body.newPassword;

  res.write('this is the new page');
  res.end();

  // Write queries to interact with postgres
  knex('users').insert(user).then(function(success) {
    res.end('You Have signed up');
  }, function(failure) {
    console.log(failure);
  });


  // NEED TO HAVE VIEW MADE FOR THIS

}, function(failure) {

  res.write('this is the new page and you failed');
  res.end();

});

// ***** HABBIT ROUTES ******//
// The naming convention might be a little not good
// Create a habit for a user
router.post('/habits/create/:userid', function(req, res) {
  var userid = req.params.userid;
  var habit = {};

  //Set Object to have the key value pairs for the query
  habit.userid = userid;
  habit.habitname = req.body.habitname;
  habit.description = req.body.habitdescription;
  habit.interval = 24;
  habit.duration = 720;
  habit.reminderfreq = 24;
  habit.remindertype = req.body.notification;


  // INSERT INTO goodhabits VALUES(default, 1, 'Code', 'Code Every day', 24, 5000, 24, 'text');
  // Write queries to interact with postgres
  knex('goodhabits').insert(habit).then(function(success) {
    res.render('createHabit', {
      habit: 'Habit created'
    });
  }, function(failure) {
    console.log(failure);

  });

}, function(failure) {
  console.log('You failed to retrive route: ' + failure);
});

// Log a habit
router.post('/habits/log/:userid/:habitid', function(req, res) {
  var userid = req.params.userid;
  var habitid = req.params.habitid;
  var log = {};

  log.userid = userid;
  log.habitid = habitid;

  knex('habitlog').insert(habit).then(function(success) {
    console.log(success);
  }, function(failure) {
    console.log(failure);

  });

});


// Get habits based on user ID
router.get('/habits/get/:userid/:habitid', function(req, res) {
  var userid = req.params.userid;
  var habitid = req.params.habitid;
  res.write('/habits/create/' + userid + habitid);
  res.end();
}, function(failure) {
  console.log('You Failed: ' + failure);
});

router.get('/:id/habits/create', function(req, res, next) {
  res.render('createHabit', {
    title: 'Habbit Rabbit'
  });
});

router.post('/:id/habits/create', function(req, res, next) {
  console.log(req.body);
  res.render('createHabit', {
    title: 'Habbit Rabbit'
  });
});

// get habits based on user and habbit id
router.get('/habits/get/:userid/:habitid', function(req, res) {

}, function(failure) {
  console.log('You Failed: ' + failure);
});



module.exports = router;
