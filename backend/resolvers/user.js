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
                    // console.log('user', user)
                    if(user.length === 0){
                        //Todo: Save user lastname, split name and save one in name and other in lastname
                        //User does not exists in DB
                        const newUser = await User.create({name, email, profilePhoto: photo, googleAccount: {idToken, googleId: googleId}})
                        // console.log('newUser', newUser)
                        //Todo: Check if newUser return array to return then newUser[0] or if it's an object
                        return JSON.stringify(newUser)
                    } else {
                        return JSON.stringify(user)
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
        },

        addAddress: async (_, {input}, ctx) => {
            console.log('inside add address')
            const {user: id} = ctx
            console.log(input, id)

            if(id === 'undefined') throw new Error('Id undefined')

            const updatedUser = await User.findByIdAndUpdate(id, {address: input}, {new: true})
            console.log('updatedUser', updatedUser)

            return JSON.stringify(updatedUser)
        }

    },

    Query: {

        currentUser: async (parent, args, ctx, info) => {
            console.log('current user', ctx)
            if(ctx){
                const {user: id} = ctx
                const user = await User.findById(id)
                console.log(user)
                return {
                    id,
                    name: user.name,
                    lastname: user.lastname,
                    photo: user.profilePhoto,
                    email: user.email,
                    birthdate: user.birthdate,
                    address: user.address,
                    favorites: user.favorites,
                    pets: user.pets,
                    paymentMethods: user.paymentMethods
                }
            } else {
                throw new Error('not_logged')
            }
        },

    }
}

module.exports = user
