const Discord = require("discord.js");



module.exports = {
    name: 'penis',
    description: "Ovo je _penis komanda.",
    async execute(message, args) {
        let replies = ['8D','8=D','8==D','8===D','8====D','8=====D','8======D','8=======D']
        let member = message.mentions.users.first() || message.author

        let result = replies[Math.floor(Math.random() * replies.length)];
        let ppembed = new Discord.MessageEmbed()
        .setAuthor(`Pp machine`)
        .setColor("RANDOM")
        .addField(`${member.username}'s  penis`, result)

        message.channel.send(ppembed);
     }   
}