
const express = require('express')
const mysql = require('mysql');

var cors = require('cors')

const app = express()
app.use(cors())
const port = 3000

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
// app.use('/images', express.static('images'))


var con = mysql.createConnection({
  host: "uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "ubi1zqjgepmd1bnv",
  password: "snkjiu4kn73q3bk8",
  database: "xuoo1749kiqvekc2"
});



app.get('/', (req, res) => {
  res.render('index.html');
})

app.post('/login', async (req,res) => {
  con.query(`SELECT * FROM user WHERE username = "${req.body.username}" and password = "${req.body.password}"`, function (err, result, fields) {
    if (err) throw err;
    
    var response = {};

    if (result.length == 0) {
      response.statusCode = 401;
      response.username = null;
    }

    if (result.length !== 0) {
      response.statusCode = 200;
      response.username = result[0].username;
    }

    res.send(response);
  });


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/signup', async (req,res) => {
  // var username = await con.query(`SELECT * FROM user WHERE username = "${req.body.username}" and password = "${req.body.password}"`);
  // console.log("username: " + JSON.stringify(username, null, `\t`));
  con.query(`INSERT INTO user (email, username, password) VALUES ("${req.body.email}", "${req.body.username}", "${req.body.password}")`, function (err, result, fields) {
    if (err) throw err;
    
    console.log(JSON.stringify(result, null, '\t'));
    var response = {};

    if (result.length == 0) {
      response.statusCode = 401;
      response.username = null;
    }

    if (result.length !== 0) {
      response.statusCode = 200;
      response.username = req.body.username;
    }

    res.send(response);
  });


})