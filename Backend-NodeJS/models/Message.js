const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
