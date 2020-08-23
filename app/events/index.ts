//? Require the two events, and then module.exports them. This is to make it easier to import only the needed functions
import guildCreate from "./guildCreate";
import onMessage from "./message";

export  { guildCreate, onMessage as message };
