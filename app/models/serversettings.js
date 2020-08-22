const { Schema } = require("mongoose");

//? Require the database everything will be stored to
const { configAndCacheDB } = require("../handlers/mongodb");

//? Create the schema that will be used
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

//? Create the model. This can be done here because it doesn't dynamically create collections
const model = configAndCacheDB.model("setting", schema);

module.exports = model;
