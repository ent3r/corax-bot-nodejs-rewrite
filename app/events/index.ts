//? Import the two events, and then export them. This is to make it easier to import only the needed functions
import guildCreate from "./guildCreate";
import onMessage from "./message";

export { guildCreate, onMessage as message };
