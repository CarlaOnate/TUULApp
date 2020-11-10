const {gql} = require("apollo-server-express")

const types = gql`
    input UserInput {
        email: String
        googleAccount: String
    }
    
    input GoogleUserInput {
        idToken: ID!
        googleAccount: GoogleAccountInput
    }
    
    input GoogleAccountInput {
        email: String
        name: String
        photo: String
        googleId: ID
    }
    
    type newUser {
        name: String
        lastname: String
        birthdate: String
        googleAccount: String
        facebookAccount: String
        instagramAccount: String
        appleAccount: String
        profilePhoto: String
        address: String
        favorites: String
        pets: String
        paymentMethods: String
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

