var express = require('express'),
   http = require('http'),
   bodyParser = require('body-parser'),
   cookieParser = require('cookie-parser'),
   session = require('express-session'),
   constants = require('./model/constants'),
	passport = require('passport'),
	GoogleStrategy = require('passport-google').Strategy,
   app = express();

app.set(constants.ENVIRONMENT, constants.DEV_ENVIRONMENT);
if(app.get(constants.ENVIRONMENT) == constants.DEV_ENVIRONMENT) {
	app.set(constants.URL, constants.LOCAL_HOST_URL);
}
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname+'/public'));
app.use(cookieParser('SmallSlate'));
app.use(session({secret: 'SmallSlate', key: 'smallslate', cookie: { secure: true }}));
app.use(bodyParser());
app.locals.basedir = 'views';

app.use(passport.initialize());
app.use(passport.session());

//TO-DO Just init with ID to session instead of whole user obj
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
   done(null, user);
});
	
passport.use(new GoogleStrategy({
    returnURL: app.get(constants.URL)+'auth/google/return',
    realm: app.get(constants.URL)
  },
  function(identifier, profile, done) {
    done(null, profile);
  }
));

var authRoute = require('./routes/authRoute'),
indexRoute = require('./routes/indexRoute');
authRoute(app);
app.all('*',function(req,res,next) {
	console.log(req.user);
	next();
});
indexRoute(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
