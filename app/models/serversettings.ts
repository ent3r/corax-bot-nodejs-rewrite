import { Schema, Document } from "mongoose";

//? Require the database everything will be stored to
import { configAndCacheDB } from "../handlers/mongodb";

//? Making our own interface for the settings
interface IChannelSettings {
  ctf_category_id: string;
  archive_category_id: string;
  working_category_id: string;
  done_category_id: string;
  delete_category_id: string;
}

//? We need to make our own Schema that extends Document or else TS is mad that properties dont exist
interface ISchema extends Document {
  server_id: string;
  prefix: string;
  channel_settings: IChannelSettings;
}

//? Create the schema that will be used
const schema = new Schema({
  server_id: { type: String, default: "", required: true },
  prefix: { type: String, default: "cb;" },
  channel_settings: {
    ctf_ategory_id: { type: String, default: "" },
    archive_category_id: { type: String, default: "" },
    working_category_id: { type: String, default: "" },
    done_category_id: { type: String, default: "" },
    delete_category_id: { type: String, default: "" },
  },
});

//? Create the model. This can be done here because it doesn't dynamically create collections
const model = configAndCacheDB.model<ISchema>("setting", schema);

export default model;
