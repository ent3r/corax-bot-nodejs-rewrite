const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

// #region configAndCacheDB
const configAndCacheDB = mongoose.createConnection(
  `${process.env.MONGODB_ROOT_URI}/discord-configCache`
);

configAndCacheDB.on("error", (err) => {
  console.warn(err);
});

configAndCacheDB.once("open", () => {
  console.log("Connected to Config and cache database");
});
// #endregion

// #region ctfDB
const ctfDB = mongoose.createConnection(
  `${process.env.MONGODB_ROOT_URI}/discord-ctf`
);

ctfDB.on("error", (err) => {
  console.warn(err);
});

ctfDB.once("open", () => {
  console.log("Connected to ctf database");
});
// #endregion

/**
 * Connects to MongoDB
 *
 */
module.exports = {
  configAndCacheDB: configAndCacheDB,
  ctfDB: ctfDB,
};
