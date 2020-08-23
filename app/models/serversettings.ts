import { Schema, Document } from "mongoose";

//? Require the database everything will be stored to
import { configAndCacheDB } from "../handlers/mongodb";

//? Making our own interface for the settings
interface IChannelSettings {
  ctf_category_id: number;
  archive_category_id: number;
  working_category_id: number;
  done_category_id: number;
  delete_category: number;
}

//? We need to make our own Schema that extends Document or else TS is mad that properties dont exist
interface ISchema extends Document {
  server_id: string;
  prefix: string;
  channel_settings: IChannelSettings;
}

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
const model = configAndCacheDB.model<ISchema>("setting", schema);

export default model;
