import { Schema, Document } from "mongoose";

// We make a new interface to be able to use it in the schema interface
interface IChallengeSchema {
  name: string;
  channel_id: number;
  solved: boolean;
  creator: number;
}

// This is basically the same as the above, except with Schema() to make a schema
const challengeSchema = new Schema({
  name: String,
  channel_id: Number,
  solved: Boolean,
  ready_to_delete: Boolean,
});

// We make a new interface here so it can be applied when doing model<ISchema>("something", schema)
interface ISchema extends Document {
  ctf_name: string;
  ctf_channel_id: number;
  challenges: IChallengeSchema[];
}

const schema = new Schema({
  ctf_name: String,
  ctf_channel_id: Number,
  challenges: [challengeSchema],
});

module.exports = schema;
