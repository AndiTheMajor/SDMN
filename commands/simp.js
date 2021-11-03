const Discord = require("discord.js")

module.exports = {
    name: 'simp',
    description: "This is _simp command.",
    async execute(message, args) {
        let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const simpembed = new Discord.MessageEmbed()
        .setTitle(`Simp machine`)
        .setDescription(`${member.username} is ` + rng + "% simp :heart:")
        .setColor("#884c9a")

        message.channel.send(simpembed);

    }
}