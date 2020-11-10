const {gql} = require("apollo-server-express")

const mutations = gql`    
type Mutation {
    #User Auth
        createUser(input: GoogleUserInput): newUser
    }
`
module.exports = mutations
