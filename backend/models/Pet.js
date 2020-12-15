const {Schema, model} = require('mongoose')

const petSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    age: String,
    characteristics: {
        color: String,
        size: {
            type: String,
            enum: ['XS', 'S', 'M', 'L', 'XL']
        },
        weight: String,
        gender: {
            type: String,
            enum: ['MALE', 'FEMALE']
        },
        breed: String,
    },
    species: {
        type: String,
        enum: ['DOG', 'CAT', 'BIRD', 'WILD']
    },
    anamnesis: String,
    medicalHistory: {
        //needs ref of Appointment
        type: [Schema.Types.ObjectID]
    },
    personalTraits: {
        //Add enum of available traits.
        type: [String],
    }
}, { timestamps: true })

// petSchema.plugin(plm)

module.exports = model('Pet', petSchema);
