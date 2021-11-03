const Discord = require('discord.js')

module.exports = {
    name: 'say',
    description: "Ovo je _kazi komanda.",
    execute(message, args){
        let dMessage = args.join(" ").slice(0);

        let ballembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField(`Sentance`, `${dMessage}`)

        message.channel.send(ballembed);

    }
}