const Discord = require("discord.js")

module.exports = {
    name: 'howgay',
    description: "This is _howgay command.",
    async execute(message, args) {
        let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const gejembed = new Discord.MessageEmbed()
        .setTitle(`Gay machine`)
        .setDescription(`${member.username} is ` + rng + "% gay")
        .setColor("#ff0000")

        message.channel.send(gejembed);

    }
}