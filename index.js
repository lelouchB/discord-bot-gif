require("dotenv").config();
const Discord = require("discord.js");
const fetch = require("node-fetch");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.content === "ping") {
    message.reply("Pong!");
  }

  let splitMessage = message.content.split(" ");

  if (splitMessage[0] === "!gif") {
    const gifSearchText = splitMessage.slice(0, splitMessage.length).join(" ");

    const url = `http://api.giphy.com/v1/gifs/search?q=${gifSearchText}&api_key=${process.env.GIPHY_API_KEY}&limit=100`;

    const res = await fetch(url);

    const json = await res.json();
    
    const randomIndex = Math.floor(Math.random() * json.data.length);

    message.channel.send(json.data[randomIndex].url);
  }
});


client.login(process.env.BOT_TOKEN);
