const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BetSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    type: {type: String, required: true, enum: ["up", "down"]},
    amount: {type: Number, required: true},
    done: {type: Boolean, default: false},
    successful: {type: Boolean}
    // code: {type: String, required: true},
    // method: {type: String, required: true},
    // description: {type: String},
    // address: {type: String}
}, {timestamps: true});

const Bet = mongoose.model('Bet', BetSchema);
module.exports = Bet;