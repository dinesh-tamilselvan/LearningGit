const User = require("../models/user")

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        console.log(req.cookies.user_id);
        User.findById({ _id: req.cookies.user_id }, function (err, user) {
            //if (err) { console.log('error in finding user in signing up'); return; }

            if (user) {
                console.log('user exists in the database');
                return res.render('profile', {
                    title: "Profile",
                    user: user
                })
            }
            else {
                return res.redirect('/users/sign-in');
            }
        })

    }
    else {
        return res.redirect('/users/sign-in');
    }

}
//renders the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_signup', {
        title: "Codeial | Sign Up"
    })
}

//renders the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_signin', {
        title: "Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.cnfm_password)
        return res.redirect('back');

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return; }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in finding user in signing up'); return; }

                return res.redirect('sign-in');
            })
        }
        else
            return res.redirect('sign-in');
    });
}

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
    //find the user
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing in'); return; }

        //handle user found
        if (user) {
            //handle password which don't match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else {
            //handle user not found
            return res.redirect('back');
        }

    });
}

module.exports.signOut = function (req, res) {
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}