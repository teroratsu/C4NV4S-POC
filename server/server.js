/****** Require et dépendences *******/

var express = require('express');           //express
var app = express();                        //express init
var http = require('http').Server(app);     //Http server
var path = require('path');                 //path 
var nunjucks = require('nunjucks');         //templating engine
var storage = require('node-persist');      //local storage
var formReader = require('multer')();       //form file + data
var locale = require("locale");             //locale (ex : fr/FR)
var sass = require('node-sass');            //Sass
var coffeebar = require('coffeebar');       //CoffeeScript compiler
const fs = require('fs');

/**************************************/
/********* Globales et config *********/

var client_path = path.resolve(__dirname, '../client'); //adresse du dossier client
var port = 8080;

var subscriberStorage = storage.create(); //init local storage
var devPostStorage = storage.create(); //init local storage
var artPostStorage = storage.create(); //init local storage
var userStorage = storage.create();

// Configuration Nunjucks
nunjucks.configure(['views',client_path],{
	autoescape : true,
	express : app,
  noCache  : true   //dev only. force recompile
});

// Configuration storages
subscriberStorage.initSync({
  dir : __dirname + '/data/subscriber',
  interval : 5000 // persist every 5s
});
devPostStorage.initSync({
  dir : __dirname + '/data/blog/dev',
  interval : 5000 // persist every 5s
});
artPostStorage.initSync({
  dir : __dirname + '/data/blog/art',
  interval : 5000 // persist every 5s
});
userStorage.initSync({
  dir : __dirname + '/data/tero',
  interval : 5000 // persist every 5s
});

//supported languages : locale
var supported = ["en", "en_GB", "en_US", "fr", "fr_FR", "fr_BE", "fr_CH", "fr_CA"];
app.use(locale(supported));

//mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    first_name: String,
    last_name: String
});

// Mongoose Model definition
var User = mongoose.model('users', UserSchema);

User.find(function (err, users) {
  if (err) return console.error(err);
  console.log(users);
})

//sass renderer
sass.render({
  file: "src/scss/main.scss",
  includePaths: [ 'lib/', 'mixins/', 'inc/' ],
  outputStyle: 'compressed',
  watch: true
}, function(err, result) {
    if (err) {
        console.log(err.message);
    }
    else
        fs.writeFile("../client/public/css/client.min.css", result.css);
});

//coffeescript compiler
coffeebar('src/cs/', {output: '../client/public/js/client.min.js', minify: true, watch: true})

/**************************************/
/************** Routing ***************/

app.use(express.static(client_path + '/public'));

//get
app.get('/', ctrlIndex); //presentation page
//@todo : add post route for comment

//post
//app.post('/', formReader.single('lobby_img'), ctrlPostNewImg);

/**************************************/
/************* Controller *************/

//Renvoie la page d'accueil
function ctrlIndex(req, res) {
  var global;
  if(supported.indexOf(req.locale,0) > -1){
    if(req.locale.includes('fr')) global = userStorage.getItem('fr_global');
    else global = userStorage.getItem('en_global');
  }
  else
  {
    global = userStorage.getItem('en_global');
  }
  res.render('index.html',{
    "global"  : global
  });
}

function ctrlBlog(req, res) {
      //blog page
  res.render('blog.njk',{
    postsDEV : devPostStorage.values(),
    postsART : artPostStorage.values()
  }); //which include dev and graph blog, which is nice
}

function ctrlDevBlog(req, res) {
  res.render('devblog.njk',{postsDEV : devPostStorage.values()}); //dev blog view
}

function ctrlArtBlog(req, res) {
      //graph page
  res.render('graphblog.njk',{postsART : artPostStorage.values()}); // graph blog view
}

//Renvoie la page d'un salon
function ctrlThread(req, res) {

  var tid = req.params.tid; //id du thread
  if (tid in ThreadList) { //ThreadList = list des post sur /dev et /graph
    /*res.setHeader('Content-Type', 'text/plain');
    res.end('Thread ' + tid + " is up, which is nice !\n"
    + ThreadList[tid].views + " views");*/
  }
  else {
    res.redirect("/"); // ou forward avec une erreur 'thread doesn't exist'
  }
}

/**************************************/
/************** SERVER ****************/

http.listen(port, function(){
  console.log('listening on *:' + port);
});


/**************************************/
/************* Functions ***************/

/*function genUUID() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}*/

/*************************************/