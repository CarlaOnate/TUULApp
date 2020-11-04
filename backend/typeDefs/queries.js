const {gql} = require('apollo-server-express')

const queries = gql`
#    type Query {
#        getUser(id: ID!): String
#    }

#    User query for testing facebook auth
type Query {
        currentUser: User
    }
`

module.exports = queries

