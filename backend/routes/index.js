const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));



router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:4000/graphql',
    failureRedirect: 'http://localhost:4000/graphql',
}), () => console.log('running callback facebook'))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:4000/graphql',
    failureRedirect: 'http://localhost:4000/graphql',
}), () => console.log('running callback facebook'))

router.get('/user', (req, res) => {
    console.log('userRoute', req.user)
    res.send(req.user)
})

module.exports = router
