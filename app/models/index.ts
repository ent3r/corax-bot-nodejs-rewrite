import { Schema, model, Document } from "mongoose";

// #region Server config

export interface IConfigSchema extends Document {
  serverID: string;
  prefix: string;
  channelSettings: {
    ctfCategoryId: string;
    archiveCategoryID: string;
    workingCategoryID: string;
    doneCategoryID: string;
    deleteCategoryID: string;
  };
}

const configSchema = new Schema({
  serverID: { type: String, default: "", required: true },
  prefix: { type: String, default: "cb;" },
  channelSettings: {
    ctfCategoryId: { type: String, default: "" },
    archiveCategoryID: { type: String, default: "" },
    workingCategoryID: { type: String, default: "" },
    doneCategoryID: { type: String, default: "" },
    deleteCategoryID: { type: String, default: "" },
  },
});

export const ServerConfig = model<IConfigSchema>("config", configSchema);

// #endregion Server config

// #region CTFTime cache

export interface ICTFTimeCache extends Document {
  fetched_at: Date;
  data: JSON;
}

const ctftimeSchema = new Schema({
  fetched_at: Date,
  data: JSON,
});

export const CTFTimeCache = model<ICTFTimeCache>(
  "ctftime-cache",
  ctftimeSchema,
  "ctftime-cache"
);

// #endregion CTFTime cache

// #region Server CTFs

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

export const ServerCTFs = model("serverCTF", ServerCTFsSchema);
// #endregion Server CTFs
