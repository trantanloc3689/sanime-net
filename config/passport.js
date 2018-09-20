var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/users');
var flash    =        require('connect-flash');
module.exports = (passport)=>{
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local-login', new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
    function(name, password, done) { // callback with email and password from our form
    
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
        User.findOne({name :  name }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
        
            // if no user is found, return the message
            if (!user)
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
        
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false); // create the loginMessage and save it to session as flashdata
        
            // all is well, return successful user
            return done(null, user);
        });
    
    }));
};
