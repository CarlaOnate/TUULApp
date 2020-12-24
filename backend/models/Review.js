const {Schema, model} = require('mongoose')

const reviewSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    score: String,
    owner: [{type: Schema.Types.ObjectID, ref: 'User'}],
    comments: String,
}, { timestamps: true })


module.exports = model('Review', reviewSchema);
