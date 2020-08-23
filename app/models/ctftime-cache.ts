import { Schema, Document } from "mongoose";

//? Require the database everything will be stored to
import { configAndCacheDB } from "../handlers/mongodb";

//? Make a new interface that is used when creating the model
interface ISchema extends Document {
  last_fetched: Date;
  data: JSON;
}

//? Create the schema used by mongodb
const schema = new Schema({
  last_fetched: Date,
  data: JSON,
});

//? Create the model used by mongodb
const model = configAndCacheDB.model<ISchema>("ctftime-cache", schema, "ctftime-cache");

//? And export that model
export default model;
