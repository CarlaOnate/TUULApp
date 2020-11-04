const {gql} = require("apollo-server-express")

const mutations = gql`
#    type Mutation {
#        createUser(input: UserInput!): String
#    }

#    User mutation for testing facebook auth
type Mutation {
        logout: Boolean
    }

`
module.exports = mutations
