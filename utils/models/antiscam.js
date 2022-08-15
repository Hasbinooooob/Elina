const mongoose = require("mongoose");

const antiScamSchema = new mongoose.Schema({
    GuildID: String,
});
module.exports = mongoose.model('antiScam', antiScamSchema)