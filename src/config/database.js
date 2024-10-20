const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://bhardwajamandeep17:Lo1ceo6NREafJoih@pranamnodejs.ido6x.mongodb.net/pranamnode"
    )
}

module.exports = {connectDB}

