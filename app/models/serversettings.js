const { Schema } = require("mongoose");

const schema = new Schema({
  server_id: { type: Number, default: null, required: true },
  prefix: String,
  channel_settings: {
    ctf_category_id: { type: Number, default: null },
    archive_category_id: { type: Number, default: null },
    working_category_id: { type: Number, default: null },
    done_category_id: { type: Number, default: null },
    delete_category: { type: Number, default: null },
  },
});

module.exports = schema;
