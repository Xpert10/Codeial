const express = require('express');
 const port = 8000
 const cookieParser = require('cookie-parser');
 const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const app =express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy')
const MongoStore = require('connect-mongo')(session);
const sassMiddleware =require('node-sass-middleware');
const flash = require('connect-flash')
const customMware = require('./config/middleware')
const passportGoogle = require('./config/passport-google-oauth2-strategy')


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));

    
 app.use(express.urlencoded());
 app.use(cookieParser());
 app.use(express.static('./assets'));  
 app.use('/uploads',express.static(__dirname+'/uploads'));

 app.use(expressLayouts);
  
 app.set('layout extractStyles',true);
 app.set('layout extractScripts',true);
 app.set('view engine','ejs');
 app.set('views','./views')

 app.use(session({
     name: 'codeial',
     secret: 'blahsomething',
     resave:false,
     cookie:{
         maxAge:(1000*60*100)
     },
     store : new MongoStore({
         mongooseConnection : db,
         autoRemove : 'disabled'
     },
     function(err){
         console.log(err);
     } )
 }))
 
 app.use(flash());
app.use(customMware.setFlash);

 app.use(passport.initialize());
 app.use(passport.session());
 app.use(passport.setAuthenticatedUser);
 
 app.use('/', require('./routes'))

 
 
 app.listen(port,function(err){
     if(err){
         console.log(`Error: ${err}`)

     }
     console.log(`Server on port : ${port}`);
 })

 // got to views script tag
