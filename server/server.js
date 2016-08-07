/****** Require et dépendences *******/

var express = require('express');           //express
var app = express();                        //express init
var http = require('http').Server(app);     //Http server
var path = require('path');                 //path 
var nunjucks = require('nunjucks');         //templating engine
var storage = require('node-persist');      //local storage
var formReader = require('multer')();       //form file + data
const fs = require('fs');

/**************************************/
/********* Globales et config *********/

var client_path = path.resolve(__dirname, '../client'); //adresse du dossier client
var port = 80;

var defaultStorage = storage.create(); //init local storage

// Configuration Nunjucks
nunjucks.configure(['views',client_path],{
	autoescape : true,
	express : app,
    noCache  : true   //dev only. force recompile
});

// Configuration storages
defaultStorage.initSync({
  dir : __dirname + '/data/default',
  interval : 5000 // persist every 5s
});

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
  res.render('index.html',{
    "global"  : "global"
  });
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