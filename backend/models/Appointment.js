const {Schema, model} = require('mongoose')

const appointmentSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    issue: String,
    vet: {
        type: Schema.Types.ObjectID,
        ref: 'Vet'
    },
    owner: [{type: Schema.Types.ObjectID, ref: 'User'}],
    pet: [{type: Schema.Types.ObjectID, ref: 'Pet'}],
    prescription: {},
    comments: String,
}, { timestamps: true })


module.exports = model('Appointment', appointmentSchema);
