const {gql} = require("apollo-server-express")

const mutations = gql`    
type Mutation {
    #User Auth
        loginUser(input: GoogleUserInput): String
    }
`
module.exports = mutations
