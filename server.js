const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');
//const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors  = require('cors');
const bodyParser = require("body-parser");
const session = require("express-session");


const keys = require("./config/keys");

mongoose.connect(keys.database,{useMongoClient:true});
mongoose.connection.on('connected',() => {
  console.log('Connected to Database' + keys.database);
})

mongoose.connection.on('error',(err) => {
  console.log('Database error' + err);
})



app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



//app.set('view engine','ejs');

app.use(session({
  secret:'mdebwedokskadklaskldnasndsk',
  resave:true,
  saveUninitialized:true
}));
app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());

require('./services/passport')(passport);

require("./routes/authRoutes")(app);

app.get('/',(req,res) => {
  res.json({status:true,msg:"It works"});
})

app.listen(PORT, () => {
  console.log("App Listening on 5000");
});
