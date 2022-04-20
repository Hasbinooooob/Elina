const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const colors = require("colors");
const fs = require("fs");
const emojis = require("./config/emojis.json");
const config = require("./config/config.json");



// client define
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  presence: {
    status: "idle",
  },
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  intents: 32767,
  ws: {
    properties: {
      $browser: "Discord iOS"
    }
  }
});
module.exports = client;


const mongoose = require("mongoose");
mongoose
  .connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(
    console.log(String(
      `
    ..............................................................................
    ........................ Mongo DB Connected ..................................
    ..............................................................................
    `).green)
  );

client.setMaxListeners(50);
require("events").defaultMaxListeners = 50;

// Global Variables
client.slashCommands = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.subcmd = new Collection();
client.category = fs.readdirSync("./commands/")
client.db = require("quick.db");

function requirehandlers() {
  client.basicshandlers = Array("command", "events", "distube", "slash");
  client.basicshandlers.forEach((handler) => {
    try {
      require(`./handlers/${handler}`)(client);
    } catch (e) {
      console.log(e.stack);
    }
  });
}
requirehandlers();

client.login(config.token);





module.exports.requirehandlers = requirehandlers;


process.on("unhandledRejection", (reason, p) => {
  console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log(" [Error_Handling] :: Multiple Resolves");
  console.log(type, promise, reason);
});









