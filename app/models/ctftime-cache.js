const { Schema } = require("mongoose");

const schema = new Schema({
  last_fetched: Date,
  data: JSON,
});

module.exports = schema;
