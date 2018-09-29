var users = require('../models/users');

module.exports = (app, passport)=>{
    // app.get('/signup',function(req, res) {
    //     if(req.isAuthenticated()){
    //          res.send('admin')
    //     } else {
    //         res.render('signup.hbs'); 
    //     }    
    // });
    // app.post('/signup',function(req, res) { 
    //     users.findOne({name: req.body.name}, (err,user)=>{
    //         if (err) throw err;
    //         if(user){
    //             res.send('user da ton tai');
    //         } else{
    //             var newUser = new users();
    //             newUser.name = req.body.name;
    //             newUser.password = newUser.generateHash(req.body.password);
    //             newUser.save((err,data)=>{
    //                 if(err){
    //                 return console.log(err)
    //                 } 
    //                 else{
    //                 res.send(data)
    //                 }
    //             });
    //         }
    //     })
    // });

    app.get('/login', function(req, res) {
        if(req.isAuthenticated()){
            res.redirect('/admin')
        } else {
           res.render('login.hbs'); 
        } 
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admin',
        failureRedirect : '/login', 
        failureFlash : false
    }));
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}