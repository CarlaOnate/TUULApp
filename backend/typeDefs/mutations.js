const {gql} = require("apollo-server-express")

const mutations = gql`    
type Mutation {
    #User
        #Auth
        loginUser(input: GoogleUserInput): String
        #Write
        addAddress(input: AddressInput): String
    
    }
`
module.exports = mutations
