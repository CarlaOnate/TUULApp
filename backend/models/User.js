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
    role: {
        type: [String],
        default: ['USER']
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    birthdate: String,
    googleAccount: {},
    facebookAccount: {},
    instagramAccount: {},
    appleAccount: {},
    profilePhoto: {},
    address: {
        street: {type: String},
        number: {type: String},
        neighbourhood: {type: String},
        city: {type: String},
        state: {type: String},
        zipCode: {type: String}
    },
    favorites: {
        vet: [{type: Schema.Types.ObjectId, ref: 'Vet'}],
        clinic: [Schema.Types.ObjectId]
    },
    pets: [{type: Schema.Types.ObjectId, ref: 'Pet'}],
    paymentMethods: {}
}, { timestamps: true })

// userSchema.plugin(plm)

module.exports = model('User', userSchema);
