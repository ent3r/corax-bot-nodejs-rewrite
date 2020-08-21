const { Schema } = require("mongoose");

const challengeSchema = new Schema({
  name: String,
  channel_id: Number,
  solved: Boolean,
  ready_to_delete: Boolean,
});

const schema = new Schema({
  ctf_name: String,
  ctf_channel_id: Number,
  challenges: [challengeSchema],
});

module.exports = schema;
