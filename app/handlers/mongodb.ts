import * as mongoose from "mongoose";

import logger from "./logging";

// Set two options globally instead of per connection, to minimize duplicate code
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

// #region configAndCacheDB
// Create a new connection to the database that will store server settings and the ctftime cache
logger.debug("Creating connection to config and cache database");
const configAndCacheDB = mongoose.createConnection(
  `${process.env.MONGODB_ROOT_URI}/discord-configCache`
);

// Create a handler for error messages. In this case just warn about it so the bot doesn't crash
configAndCacheDB.on("error", (err) => {
  throw err;
});

// Create a function that will be called once the database connection is open and ready
configAndCacheDB.once("open", () => {
  logger.info("Connected to Config and cache database");
});
// #endregion

// #region ctfDB
// Create a new connection to the database that will store CTFs per server.
logger.debug("Creating connection to the CTF database");
const ctfDB = mongoose.createConnection(
  `${process.env.MONGODB_ROOT_URI}/discord-ctf`
);

// Create a handler for error messages. In this case just warn about it so the bot doesn't crash
ctfDB.on("error", (err) => {
  throw err;
});

// Create a function that will be called once the database connection is open and ready
ctfDB.once("open", () => {
  logger.info("Connected to ctf database");
});
// #endregion

export { configAndCacheDB, ctfDB };
