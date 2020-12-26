const types = require('./types')
const queries = require('./queries')
const mutations = require('./mutations')
// const subscriptions = require('./subscriptions')

const typeDefs = [types, queries, mutations]

module.exports = typeDefs
