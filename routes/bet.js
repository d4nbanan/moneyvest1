require('dotenv').config();
const User = require("../schemas/User");
const Bet = require("../schemas/Bet");

const bet = async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        const type = req.body.type;

        const user = await User.findById(req.user.id);

        if(amount > user.wallet) {
            res.status(400).json({message: "Недостаточно средств"});
            return;
        }

        // const code = uuid.v4();
        const newBet = new Bet({user: user._id, type, amount});
        await newBet.save();

        user.wallet = user.wallet - amount;
        user.bets.push(newBet);
        await user.save();

        res.status(200).json(user);
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = bet;