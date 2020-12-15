const User = require('../models/User')

const user = {

    Mutation: {

        loginUser: async (_, {input}, ctx, info) => {
            //See if user exists if not then create, store user in ctx and return user
            console.log('loginUser', input)
            const {type, idToken, googleAccount: {email, name, photo, googleId}} = input

            const googleLogin = async () => {
                console.log('running google')
                try {
                    const user = await User.find({email})
                    //console.log('user', user)
                    if(user.length === 0){
                        //User does not exists in DB
                        const newUser = await User.create({name, email, profilePhoto: photo, googleAccount: {idToken, googleId: googleId}})
                        // console.log('newUser', newUser)
                        return {
                            id: newUser.id,
                            name: newUser.name,
                            lastname: newUser.lastname,
                            profilePhoto: newUser.profilePhoto
                        }
                    } else {
                        return {
                            id: user[0].id,
                            name: user[0].name,
                            lastname: user[0].lastname,
                            profilePhoto: user[0].profilePhoto
                        }
                    }
                } catch (err) {
                    console.log(err)
                    throw new Error(err)
                }
            }

            //Run function for each social media login strategy
            switch (type){
                case 'google':
                    return await googleLogin()
                default:
                    throw new Error('Incorrect type provided in mutation argument')
            }
        }
    },

    Query: {

        currentUser: (parent, args, ctx, info) => {
            console.log('current user', ctx)
            if(ctx){
                const {id} = ctx
                return {
                    id,
                    name: '',
                    lastname: '',
                    profilePhoto: ''
                }
            } else {
                throw new Error('not_logged')
            }
        },

    }
}

module.exports = user
