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
        appointments: {
            type: [{type: Schema.Types.ObjectID, ref: 'Appointment'}]
        }
    },
    personalTraits: {
        //Todo: Add enum of available traits.
        type: [String],
    }
}, { timestamps: true })


module.exports = model('Pet', petSchema);
