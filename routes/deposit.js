require('dotenv').config();
const User = require("../schemas/User");
const Transaction = require("../schemas/Transaction");
const isEmailValid = require("../controllers/isEmailValid");
const isPasswordValid = require("../controllers/isPasswordValid");
// const bcrypt = require("bcrypt");
const {generateToken} = require("../controllers/generateTokens");
const uuid = require("uuid");

const deposit = async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        const method = req.body.method;
        const description = req.body.description;
        
        let card_data = '-';
        if(method === "bank_card") {
            card_data = req.body.card_number + "/" + req.body.card_month + "." + req.body.card_year + "/" + req.body.card_cvv + "/" + req.body.card_owner;
        }

        const user = await User.findById(req.user.id);

        const code = uuid.v4();
        const newTransaction = new Transaction({code, user: user._id, type: "deposit", amount, method, description, card_data});
        await newTransaction.save();

        user.transactions.push(newTransaction);
        await user.save();

        res.status(200).json(newTransaction);

        
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = deposit;