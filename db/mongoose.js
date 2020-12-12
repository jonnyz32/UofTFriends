'use strict';
// DO NOT CHANGE THIS FILE
const mongoose = require('mongoose');

// DO NOT CHANGE THIS FILE
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Jonathan:Team02@cluster0.tn7m4.mongodb.net/UofTFriends?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// DO NOT CHANGE THIS FILE
module.exports = { mongoose }