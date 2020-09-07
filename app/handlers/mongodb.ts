import * as mongoose from "mongoose";

import logger from "./logging";

// Set two options globally instead of per connection, to minimize duplicate code
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

logger.debug("Connecting to database");
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

const database = mongoose.connection;

// Create a handler for errors
database.on("error", (err) => {
  throw err;
});

// Create a function that will be called once the database connection is open and ready
database.once("open", () => {
  logger.info(
    `Connected to database. "${process.env.MONGODB_ROOT_URI}/${
      process.env.MONGODB_DATABASE || "coraxbot-database"
    }"`
  );
});

database.on("disconnected", (..._) => {
  logger.warn("Disconnected from database");
});

export default database;
