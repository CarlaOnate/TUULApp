const passport = require('passport')
const User = require('../models/User')
const facebookStrategy = require('passport-facebook')
var GoogleStrategy = require('passport-google-oauth20').Strategy;


//strategies options
const fbOptions = {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/facebook/callback',
    profileFields: ['id', 'first_name', "last_name", "email"]
}

const googleOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
}

//strategies callbacks
const fbCallback = async function (accessToken, refreshToken, profile, done) {
    const {email, first_name, last_name, id} = profile._json
    await User.find({email}, async (err, user) => {
        if(err) {
            await User.create({
                email,
                name: first_name,
                lastname: last_name,
                facebookAccount: {
                    id,
                    email
                }
            }, (err, user) => {
                done(err, user[0])
            })
        }
        done(err, user[0])
    })
}

const googleCallback = async (accessToken, refreshToken, profile, done) => {
    console.log('googleProfile', profile)
    // const {email, first_name, last_name, id} = profile._json
    // await User.find({email}, async (err, user) => {
    //     if(err) {
    //         await User.create({
    //             email,
    //             name: first_name,
    //             lastname: last_name,
    //             facebookAccount: {
    //                 id,
    //                 email
    //             }
    //         }, (err, user) => {
    //             done(err, user[0])
    //         })
    //     }
    //     done(err, user[0])
    // })
    //passportjs sample
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return done(err, user);
    // });
}


passport.use(new facebookStrategy( fbOptions, fbCallback ))
passport.use(new GoogleStrategy( googleOptions, googleCallback));

passport.serializeUser( function(user, done) {
    done(null, user);
});

passport.deserializeUser(async function(user, done) {
        done(null, user);
});


module.exports = passport
