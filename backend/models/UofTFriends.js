/*Models */

const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    sender: String,
    text: String,
});

const GroupsSchema = new mongoose.Schema({
    name: String,
    members: [{studentId: String}],
    messages: [Message]
});

// Reservations will be embedded in the Restaurant model


const Group = mongoose.model('Group', GroupsSchema);

module.exports = { Group };
