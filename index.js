const Discord = require("discord.js");
const config = require("./config.json");

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    // ...
  ],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on("messageCreate", function (msg) {
    kickGuy();
    function kickGuy() {
      if (msg.content.startsWith("!k")) {
        const user = msg.mentions.members.first();
        if (user) {
          user
            .voice.disconnect()
            .then(() => console.log("Aw " + user.displayName))
            .catch((error) => console.log("error"));
        } else {
          msg.channel.send("User not found in this server");
        }
      }
    }
    setInterval(function () {
      kickGuy();
    }, 1000);
  });
  

client.login(config.token);
