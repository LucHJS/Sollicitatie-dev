const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildId: String,
    roles: Array
})

module.exports = mongoose.model('reaction-roles', schema)