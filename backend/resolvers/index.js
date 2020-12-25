const userResolvers = require('./user')
const envResolvers = require('./env')

const resolvers = [
    userResolvers,
    envResolvers
]

module.exports = resolvers
