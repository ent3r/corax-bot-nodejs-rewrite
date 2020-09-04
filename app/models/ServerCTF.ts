import { Schema, model, Document } from "mongoose";

export interface ICTFChallenge {
  name: string;
  channelID: string;
  isCompleted: boolean;
  toDelete: boolean;
}

const CTFChallenge = new Schema({
  name: String,
  channelID: String,
  isCompleted: Boolean,
  toDelete: Boolean,
});

export interface ICTF {
  name: string;
  roleID: string;
  channelID: string;
  isArchived: boolean;
  challenges: ICTFChallenge[];
}

const CTF = new Schema({
  name: String,
  roleID: String,
  channelID: String,
  challenges: [CTFChallenge],
});

export interface IServerCTFs extends Document {
  serverID: string;
  CTFs: ICTF[];
}

const ServerCTFsSchema = new Schema({
  serverID: String,
  CTFs: [CTF],
});

const ServerCTFs = model("serverCTF", ServerCTFsSchema);

export default ServerCTFs;
