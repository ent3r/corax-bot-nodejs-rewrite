import { Schema, model, Document } from "mongoose";

export interface ICTFTimeCache extends Document {
  fetched_at: Date;
  data: JSON;
}

const ctftimeSchema = new Schema({
  fetched_at: Date,
  data: JSON,
});

const CTFTimeCache = model<ICTFTimeCache>(
  "ctftime-cache",
  ctftimeSchema,
  "ctftime-cache"
);

export default CTFTimeCache;
