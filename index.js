const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const config = require("./config.json");
const fs = require("fs");

bot.on("ready", async () => {
	console.log(`${bot.user.username} sudah online!`);
	bot.user.setActivity("w!help | v1.1 Beta", {type: "PLAYING"});
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = config.prefix; 
    let msg = message.content.toLowerCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(" ")
    let cmd = args.shift().toLowerCase();

  if (!msg.startsWith(prefix)) return;
 
        try {
            let commandFile = require(`./cmds/${cmd}.js`);
            commandFile.run(bot, message, args);
        } catch (e) {
            console.log(e.message);
        } finally {
            console.log(`${message.author.username} menggunakan command ${cmd}`);
        }
  });
  
  bot.login(config.token);
