const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';
 
const fs = require('fs');
const { execute } = require('./commands/kick');

 
client.commands = new Discord.Collection();

 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {

    for(const[id,guild] of client.guilds.cache)
    {
        console.log(`${id} - ${guild.name}`)
    }

    console.log('SDMN is online!')

});


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
   
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }  
    if(command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }
    if(command === 'help'){
        client.commands.get('help').execute(message, args, Discord);
    }
    if(command === 'kick'){
        client.commands.get('kick').execute(message, args);
    }
    if(command === 'ban'){
        client.commands.get('ban').execute(message, args);
    }
    if(command === 'mute'){
        client.commands.get('mute').execute(message, args);
    }
    if(command === 'unmute'){
        client.commands.get('unmute').execute(message, args);
    }
    if(command === 'infractions'){
        client.commands.get('infractions').execute(message, args);
    }
    if(command == 'avatar'){
        client.commands.get('avatar').execute(message, args);
    }
    if(command == 'av'){
        client.commands.get('av').execute(message, args);
    }
    if(command == 'meme'){
        client.commands.get('meme').execute(message, args);
    }
    if(command === "help-fun"){
        client.commands.get("help-fun").execute(message, args, Discord);
    }
    if(command === "help-moderation"){
        client.commands.get("help-moderation").execute(message, args, Discord);
    }
    if(command == 'howgay'){
        client.commands.get('howgay').execute(message, args);
    }
    if(command === "simp"){
        client.commands.get("simp").execute(message, args);
    }
    if(command === "8ball"){
        client.commands.get("8ball").execute(message, args);
    }     
    if(command === "test"){
        client.commands.get("test").execute(message, args, Discord);
    } 
    if(command === "penis"){
        client.commands.get("penis").execute(message, args);
    }
    if(command === "say"){
        client.commands.get("say").execute(message, args);
    }
    if(command === "sendinv"){
        client.commands.get("sendinv").execute(client, message, args);
    }
    if(command === "joke"){
        client.commands.get("joke").execute(message, args, Discord)
    }
    if(command === "unban"){
        client.commands.get("unban").execute(message, args, Discord)
    }
});

client.login(process.env.token); //(process.env.token) / ('ODc2ODg1NTM0NTYyMjEzOTc5.YRqlSw.ibOYOhTL4blSHCA7hdmOZ0MsdeI')
