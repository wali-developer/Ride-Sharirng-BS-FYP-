const mongoose = require("mongoose");
const conversationSchema = mongoose.Schema({
  members: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
