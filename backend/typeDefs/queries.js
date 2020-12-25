const {gql} = require('apollo-server-express')

const queries = gql`    
type Query {
#    User
        currentUser: User
#    Env
        env(variable: String): String
    }
`

module.exports = queries

