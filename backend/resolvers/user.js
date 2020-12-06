const User = require('../models/User')

const user = {

    Mutation: {

        loginUser: async (_, {input}, ctx, info) => {
            //See if user exists if not then create, store user in ctx and return user
            console.log('loginUser', input)
            const {type, idToken, googleAccount: {email, name, photo, googleId}} = input

            const googleLogin = async () => {
                try {
                    const user = await User.find({email})
                    // console.log('user', user)
                    if(user.length === 0){
                        //User does not exists in DB
                        const newUser = await User.create({name, email, profilePhoto: photo, googleAccount: {idToken, googleId: googleId}})
                        // console.log('newUser', newUser)
                        ctx.logged = newUser
                    } else {
                        ctx.logged = user[0]
                    }
                } catch (err) {
                    throw new Error(err)
                }
            }

            //Run function for each social media login strategy
            switch (type){
                case 'google':
                    console.log('running google')
                    await googleLogin()
                break
                default:
                    throw new Error('Incorrect type provided in mutation argument')
            }
            console.log('logged', info.logged)
            return {
                id: info.logged.id,
                name: info.logged.name,
                lastname: info.logged.lastname,
                profilePhoto: info.logged.profilePhoto
            }
        }
    },

    Query: {

        currentUser: (parent, args, ctx, info) => {
            console.log('current user', info.logged)
            if(info.logged){
                const {id, name, lastname, profilePhoto} = info.logged
                return {
                    id,
                    name,
                    lastname,
                    profilePhoto
                }
            } else {
                throw new Error('not_logged')
            }
        },

    }
}

module.exports = user
