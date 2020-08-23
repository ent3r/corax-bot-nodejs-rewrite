import { Schema, Document } from "mongoose";

//? Require the database everything will be stored to
import { configAndCacheDB } from "../handlers/mongodb";

interface ISchema extends Document {
  last_fetched: Date;
  data: JSON;
}

const schema = new Schema({
  last_fetched: Date,
  data: JSON,
});

const model = configAndCacheDB.model<ISchema>("ctftime-cache", schema, "ctftime-cache");

export default model;
