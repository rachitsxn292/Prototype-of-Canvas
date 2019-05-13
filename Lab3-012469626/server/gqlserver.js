var express = require('express');

var app = express();

var cors = require('cors');

var md5 = require('md5');

var mongoose = require('mongoose');

const graphqlHTTP = require('express-graphql');
const schema = require('../../../server/schema/schema');
///////JWT PASSPORT///////////
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
///////JWT PASSPORT///////////

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'Canvas',
  resave: false,
  saveUninitialized: false,
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

app.use("/graphql", graphqlHTTP(
  {
    schema,
    graphiql: true
  }));


app.listen(8080);
console.log('GraphQL Server running on 8080');
