const {Schema, model} = require('mongoose')
// const plm = require('passport-local-mongoose')

const clinicSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    slogan: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
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
    vets: [{type: Schema.Types.ObjectId, ref: 'Vet'}],
    openHours: [String],
    services: {
        type: [String],
        enum: ['APPOINTMENT', 'EMERGENCY', 'VACCINATION', 'DEWORMING', 'PET-GROOMING', 'PENSION', 'DOG-WALK']
    },
    costs: {
        appointment: {type: String},
        emergency: {type: String},
        vaccination: {type: String},
        deworming: {type: String}
    },
    //Missing Appointment ref
    appointments: [{type: Schema.Types.ObjectId}],
    paymentMethods: {}
}, { timestamps: true })

// clinicSchema.plugin(plm)

module.exports = model('Clinic', clinicSchema);
