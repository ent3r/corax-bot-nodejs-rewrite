import { Schema, model, Document } from "mongoose";

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

const ServerConfig = model<IConfigSchema>("config", configSchema);

export default ServerConfig;
