const {gql} = require('apollo-server-express')

const queries = gql`    
type Query {
        currentUser: newUser
        checkUserLogin(email: String): Boolean
        loginUser(email: String): newUser
    }
`

module.exports = queries

