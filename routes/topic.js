const express = require('express')
const app = express()
const http = require('http').Server(app)
const mysql = require('mysql')
const bodyParser = require('body-parser');
var router = express.Router();

// create
router.get('/create',(req,res)=>{
  res.render('create');
})

router.post('/create',(req,res)=>{
  connection.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?,?,NOW(),?)`,
    [req.body.title,req.body.description,1],(err,rows)=>{
      if (err) throw err
      res.redirect('/');
    })
})

// update
router.get('/update/:topicId',(req,res)=>{
  connection.query(`SELECT * FROM topic WHERE id=?`,[req.params.topicId],(err,rows)=>{
    let topic =rows[0];
    res.render('update',{topic:topic,topicId:topic.id});
  })
})

router.put('/update/:topicId',(req,res)=>{
  connection.query(`UPDATE topic SET title=?,description=? WHERE id=?`,
    [req.body.title,req.body.description,req.params.topicId],(err,rows)=>{
      if (err) throw err
      res.send(req.body.title);
    })
})

// delete
router.delete('/delete/:topicId',(req,res)=>{
  connection.query(`DELETE FROM topic WHERE id=?`,
    [req.params.topicId],(err,rows)=>{
      if (err) throw err
      res.send('success');
    })
})

// read
router.get('/:title',(req,res)=>{
    let topics, topic;

    connection.query('SELECT * FROM topic',(err,rows)=>{
      if(err) console.log(err);
      topics = rows;
      connection.query(`SELECT * FROM topic WHERE title=?`, [req.params.title], (err,rows)=>{
        if(err) console.log(err);
        topic = rows[0];
        res.render('index', {topics: topics, topic: topic})
      })
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

module.exports=router;