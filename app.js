const express = require('express')
const app = express()
const http = require('http').Server(app)
const mysql = require('mysql')
const bodyParser = require('body-parser');
const topicRouter= require('./routes/topic');

// global constant
const port = 3003

// server init
http.listen(port, "0.0.0.0", function(){
  console.log('listening on :', port);
});

// config
app.use(express.static('public'))
app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/topic',topicRouter);


// routes
app.get('/', (req, res) => {
  connection.query('SELECT * FROM topic',(err,rows)=>{
    if(err) console.log(err);
    
    res.render('index', {topics:rows})
  })
})

// database
const connection = mysql.createConnection({
  host     : 'localhost',
  user : 'root',
  password: '111111',
  database : 'dohyunwoo'
});

connection.connect()

