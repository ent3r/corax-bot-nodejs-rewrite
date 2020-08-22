const mongoose = require("mongoose");

//? Set two options globally instead of per connection, to minimize duplicate code
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

// #region configAndCacheDB
//? Create a new connection to the database that will store server settings and the ctftime cache
const configAndCacheDB = mongoose.createConnection(
  `${process.env.MONGODB_ROOT_URI}/discord-configCache`
);

//? Create a handler for error messages. In this case just warn about it so the bot doesn't crash
configAndCacheDB.on("error", (err) => {
  console.warn(err);
});

//? Create a function that will be called once the database connection is open and ready
configAndCacheDB.once("open", () => {
  console.log("Connected to Config and cache database");
});
// #endregion

// #region ctfDB
//? Create a new connection to the database that will store CTFs per server.
const ctfDB = mongoose.createConnection(
  `${process.env.MONGODB_ROOT_URI}/discord-ctf`
);

//? Create a handler for error messages. In this case just warn about it so the bot doesn't crash
ctfDB.on("error", (err) => {
  console.warn(err);
});

//? Create a function that will be called once the database connection is open and ready
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
