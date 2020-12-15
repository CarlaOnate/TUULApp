const {gql} = require('apollo-server-express')

const queries = gql`    
type Query {
        currentUser: User
    }
`

module.exports = queries

