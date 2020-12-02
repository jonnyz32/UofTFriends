/*Models */

const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    sender: String,
    Message: String,
});

const GroupsSchema = new mongoose.Schema({
    name: String,
    members: [String],
    messages: [{Message}]
});

// Reservations will be embedded in the Restaurant model


const Group = mongoose.model('Group', GroupsSchema);

module.exports = { Group };