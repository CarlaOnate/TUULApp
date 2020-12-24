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
    
    type User {
#        Para mandar como string usar JSON.stringify() - maybe luego cambiamos a hacer los tipos de cada uno.
        id: ID
        name: String
        lastname: String
        email: String
        birthdate: String
        photo: String
        address: String
        favorites: String
        pets: String
        paymentMethods: String
    }
`

module.exports = types

