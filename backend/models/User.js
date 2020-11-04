const {Schema, model} = require('mongoose')
// const plm = require('passport-local-mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
    },
    birthdate: String,
    googleAccount: {},
    facebookAccount: {},
    instagramAccount: {},
    appleAccount: {},
    profilePhoto: {},
    address: {},
    favorites: {
        vet: [Schema.Types.ObjectId],
        clinic: [Schema.Types.ObjectId]
    },
    pets: [Schema.Types.ObjectId],
    paymentMethods: {}
}, { timestamps: true })

// userSchema.plugin(plm)

module.exports = model('User', userSchema);
