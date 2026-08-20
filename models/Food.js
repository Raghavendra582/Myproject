const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    image: {
        type: String
    },

    availability: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Food", foodSchema);