const Discord = require('discord.js');

const client = new Discord.Client();

require('dotenv').config();

const a = ['aliases', 'commands'];
a.forEach((h) => (client[h] = new Discord.Collection()));
['events', 'commands', 'music'].forEach((h) => require(`./handlers/${h}`)(client));

client.login(process.env.token)//OTA0MDEyNDI0NDQzNzIzNzk2.YX1VLQ.ojRPkDo7J8Gyr1sSiRYEMkF0ZRU