import { Schema, Document } from "mongoose";


interface IChallengeSchema{
  name: string,
  channel_id: number,
  solved: boolean,
  creator: number
}

const challengeSchema = new Schema({
  name: String,
  channel_id: Number,
  solved: Boolean,
  ready_to_delete: Boolean,
});


interface ISchema extends Document {
  ctf_name: string,
  ctf_channel_id: number,
  challenges: Array<IChallengeSchema>
}


const schema = new Schema({
  ctf_name: String,
  ctf_channel_id: Number,
  challenges: [challengeSchema],
});

module.exports = schema;
