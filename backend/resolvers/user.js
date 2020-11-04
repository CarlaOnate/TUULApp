const {gql} = require('apollo-server-express')
const User = require('../models/User')

const user = {

    Mutation: {
        createUser: async (_, {input}, ctx) => {
            console.log('createUser', input)
            const {name, lastname, email, googleAccount} = input
            try {
                const newUser = await User.create({name, lastname, googleAccount: {value: googleAccount}})
                console.log('newUser', newUser)
                return {
                    name,
                    lastname,
                    googleAccount
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    },

//  User query and mutation for testing facebook auth using context in app.js
    Query: {
        currentUser: (parent, args, {req}, info) => {
            console.log('resolver req.user', req.user)
            return {
                id: 'asdfasdfas',
                name: 'wabaladudubu',
                lastname: 'asdfasdfasdf',
                birthdate: 'asdfasdfasdf'
            }
        }
    },

    Mutation: {
        logout: (parent, args, context) => context.logout()
    }
}

module.exports = user
