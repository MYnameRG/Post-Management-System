const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://rohitgupta:rohitgupta@cluster0.tfamr.mongodb.net/PMS?retryWrites=true&w=majority');
        console.log('Database connection established');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = connectDB;