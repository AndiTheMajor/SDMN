const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const a = ['aliases', 'commands'];
a.forEach((h) => (client[h] = new Discord.Collection()));
['events', 'commands', 'music'].forEach((h) => require(`./handlers/${h}`)(client));

client.login("OTI3MjM5NjI1NjkxNTA4ODI4.YdHVMg._yQJSBtIjNqYahgBXHTWh2ZnC5A")