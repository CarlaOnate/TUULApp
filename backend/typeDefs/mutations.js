const {gql} = require("apollo-server-express")

const mutations = gql`    
type Mutation {
    #User Auth
        loginUser(input: GoogleUserInput): newUser
    }
`
module.exports = mutations
