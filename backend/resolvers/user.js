const {gql} = require('apollo-server-express')
const User = require('../models/User')

const user = {

    Mutation: {

        createUser: async (_, {input}, ctx) => {
            console.log('createUser', input)
            const {email, googleAccount} = input
            try {
                const newUser = await User.create({email, googleAccount})
                console.log('createUser', newUser)
                return newUser
            } catch (err) {
                throw new Error(err)
            }
        }
    },

    Query: {

        currentUser: (parent, args, context, info) => {
            if(context.user){
                return context.user
            }
            throw new Error('not_logged')
        },

        checkUserLogin: async (parent, {email}, context, info) => {
            console.log('checkuser', email)
            try{
                const user = await User.find({email})
                console.log('foundUser', user)
                return !user.length === 0;
            } catch(err) {
                throw new Error(err)
            }
        },

        loginUser: async (_, {email}, ctx) => {
            console.log('loginUser', email)
            try {
                const user = await User.find({email})
                ctx.user = user
                console.log('loginUser', user)
                return user
            } catch (err) {
                throw new Error(err)
            }
        },

    }
}

module.exports = user
