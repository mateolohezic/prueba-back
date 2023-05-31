const { Schema, model } = require('mongoose');

const log = new Schema({
    date: String,
    description: String,
})

module.exports = model (`Log`, log)