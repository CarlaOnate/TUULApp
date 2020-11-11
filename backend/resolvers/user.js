const User = require('../models/User')

const user = {

    Mutation: {

        loginUser: async (_, {input}, ctx) => {
            //See if user exists if not then create, store user in ctx and return user
            console.log('createUser', input)
            const {type, idToken, googleAccount: {email, name, photo, googleId}} = input

            const googleLogin = async () => {
                console.log('inside googleLogin')
                try {
                    const user = await User.find({email})
                    console.log('user', user)
                    if(user.length === 0){
                        //User does not exists in DB
                        const newUser = await User.create({name, email, profilePhoto: photo, googleAccount: {idToken, googleId: googleId}})
                        console.log('newUser', newUser)
                        ctx.user = newUser
                    } else {
                        ctx.user = user[0]
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

            return {
                id: ctx.user.id,
                name: ctx.user.name,
                lastname: ctx.user.lastname,
                profilePhoto: ctx.user.profilePhoto
            }
        }
    },

    Query: {

        currentUser: (parent, args, ctx, info) => {
            if(ctx.user){
                const {id, name, lastname, profilePhoto} = ctx.user
                return {
                    id,
                    name,
                    lastname,
                    profilePhoto
                }
            }
            throw new Error('not_logged')
        },

    }
}

module.exports = user
