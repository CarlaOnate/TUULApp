const {Schema, model} = require('mongoose')
// const plm = require('passport-local-mongoose')

const vetSchema = new Schema({
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
        default: ['VET']
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    phoneNumber: {
        type: String,
        default: '',
        unique: true
    },
    address: {
        street: {type: String},
        number: {type: String},
        neighbourhood: {type: String},
        city: {type: String},
        state: {type: String},
        zipCode: {type: String}
    },
    profilePhoto: {},
    birthdate: String,
    googleAccount: {},
    facebookAccount: {},
    instagramAccount: {},
    appleAccount: {},
    education: {
        schoolName: {type: String},
        graduationYear: {type: String},
        bachelorDegree: {type: String},
        specialty: {type: String}
    },
    animals: {
        type: [String],
        enum: ['DOG, CAT, BIRD, WILD']
    },
    clinic: {
        type: [{type: Schema.Types.ObjectID, ref: 'Clinic'}]
    },
    professionalLicence: {type: String},
    zones: {
        //Colonias dentro de su cuidad o de su zipcode
        type: [String]
    },
    currentLocation: {
        type: String
    },
    workingHours: {
        type: [String],
    },
    costs: {
        appointment: {type: String},
        emergency: {type: String},
        vaccination: {type: String},
        deworming: {type: String}
    },
    appointments: [{type: Schema.Types.ObjectID, ref: 'Appointment'}],
    averageScore: {type: String},
    review: {
        type: [Schema.Types.ObjectID]
    },
}, { timestamps: true })

// vetSchema.plugin(plm)

module.exports = model('Vet', vetSchema);
