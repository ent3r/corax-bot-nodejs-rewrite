import * as mongoose from "mongoose";

import logger from "./logging";

// Set two options globally instead of per connection, to minimize duplicate code
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const initMongo = async (): Promise<mongoose.Connection> => {
  logger.info("Connecting to database");
  mongoose
    .connect(
      `${process.env.MONGODB_ROOT_URI}/${
        process.env.MONGODB_DATABASE || "coraxbot-database"
      }`,
      { serverSelectionTimeoutMS: 15000 }
    )
    .then()
    .catch((err) => {
      logger.error(err);
      throw err;
    });
  mongoose.connection.on("error", (err) => {
    throw err;
  });
  mongoose.connection.once("open", () => {
    logger.info(
      `Connected to database. "${process.env.MONGODB_ROOT_URI}/${
        process.env.MONGODB_DATABASE || "coraxbot-database"
      }"`
    );
  });
  mongoose.connection.on("disconnected", (..._) => {
    logger.warn("Disconnected from database");
  });
  return mongoose.connection;
};

export default initMongo;
