import { Schema, model, Document } from "mongoose";

export interface IError extends Document {
  errorID: string;

  serverID: string;
  command: string;
  errorMessage: string;
}

const errorSchema = new Schema({
  errorID: String,

  serverID: String,
  command: String,
  errorMessage: String,
});

const Error = model<IError>("error", errorSchema);

export default Error;
