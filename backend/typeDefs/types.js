const {gql} = require("apollo-server-express")

const types = gql`    
    #Auth types
    input GoogleUserInput {
        idToken: ID
        type: String!
        googleAccount: GoogleAccountInput
    }
    
    input GoogleAccountInput {
        email: String
        name: String
        photo: String
        googleId: ID
    }
    
    #User types
    type newUser {
        id: ID
        name: String
        lastname: String
        profilePhoto: String
    }
    
#    User type for testing facebook auth
    type User {
        id: ID
        name: String
        lastname: String
        birthdate: String
    }
`

module.exports = types

