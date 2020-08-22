const { Schema } = require("mongoose");

const { configAndCacheDB } = require("../handlers/mongodb");

const schema = new Schema({
  server_id: { type: String, default: undefined, required: true },
  prefix: { type: String, default: "cb;" },
  channel_settings: {
    ctf_category_id: { type: Number, default: null },
    archive_category_id: { type: Number, default: null },
    working_category_id: { type: Number, default: null },
    done_category_id: { type: Number, default: null },
    delete_category: { type: Number, default: null },
  },
});

const model = configAndCacheDB.model("setting", schema);

module.exports = model;
