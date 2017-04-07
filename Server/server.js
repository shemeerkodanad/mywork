// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');       // call express
var app        = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User     = require('./models/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/chartapp')

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
              // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST


var router = express.Router();

//var requestModel = require('./models/requests');
//mongoose.connect('mongodb://127.0.0.1:27017/myRequests');

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//var requests = [{title :"Request from Jim",status:"Approved",updated:"2014-02-13",created:"2013-05-23"},{title :"Request from John",status:"Approved",updated:"2014-02-13",created:"2013-05-23"},{title :"Request from mithun",status:"Approved",updated:"2014-02-13",created:"2013-05-23"},{title :"Request from Jim",status:"Denied",updated:"2014-02-13",created:"2013-05-23"}]

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
 var barchartData = {
 title: { text: 'Dress Sale' },
 tooltip: {},
 xAxis: {
     data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
 },
 yAxis: {},
 series: [{
     name: 'sales',
     type: 'bar',
     data: [5, 20, 36, 25, 10, 35]
 }]
}
var piechartData = {
title: { text: 'population' },
tooltip: {},
series: [{
    name: 'population',
    type: 'pie',
    data: [5, 20, 36, 25, 10, 35]
}]
}

var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
  console.log('Socket connected')
    socket.emit('message', { message: {bar:barchartData ,pie:piechartData} });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
})

router.get('/', function(req, res) {


});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


router.route('/users/register')
          .post(function(req, res) {
           var user = new User();
           user.email = req.body.email;   // create a new instance of the Bear model
           user.uname = req.body.uname;

           user.setPassword(req.body.password)
           // set the bears name (comes from the request)
   // save the bear and check for errors
         user.save(function(err) {
       if (err)
           res.send(err);

       res.json({ message: 'User created!' });
   });

});


router.route('/users/login')
        .post(function(req,res){

    var username = req.body.email ;
    var password = req.body.password ;
    User.findOne({ email: username }, function (err, user) {
   if (err) { res.send(err);}
   // Return if user not found in database
   if (!user) {

      res.status(401).json({message:'User not found', serverToken: null});
      return ;
   }else{
   // Return if password is wrong
   if (!user.validPassword(password)) {
     res.status(401).json({message:'Wrong Password', serverToken: null});
     return ;

   }
   }
   // If credentials are correct, return the user object
   token = user.generateJwt();

   res.json({ user: user ,serverToken: token});

 })


        })


        //get current user from token
    router.post('/users/verfytoken', function(req, res, next) {
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token;
      if (!token) {
       return res.status(401).json({message: 'Must pass token'});
      }
    // Check token that was passed by decoding token using secret
     jwt.verify(token, "MY_SECRET", function(err, user) {
        if (err) throw err;
       //return user using the id from w/in JWTToken
        User.findById({
        '_id': user._id
        }, function(err, user) {
           if (err) throw err;
            //  user = utils.getCleanUser(user);
            var u = user.toJSON();
            user =   {
           _id: u._id,
           name: u.uname,
           email: u.email

         }
           //Note: you can renew token by creating new token(i.e.
             //refresh it)w/ new expiration time at this point, but I’m
             //passing the old token back.
             // var token = utils.generateToken(user);
            res.json({
                user: user,
                token: token
            });
         });
      });
    });

// START THE SERVER
// =============================================================================

console.log('Magic happens on port ' + port);
