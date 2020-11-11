const {gql} = require('apollo-server-express')

const queries = gql`    
type Query {
        currentUser: newUser
    }
`

module.exports = queries

