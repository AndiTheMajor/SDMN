module.exports = {
    meta: {
        name: 'avatar',
        aliases: ['avatar', 'av'],
        usage: '[@member]',
        description: 'av cmd',
        hasArgs: false,
        category: 'ostalecmd',
        devOnly: false,
        perms: {
            require: false
        },
    },
    pokreni: async (client, message, args, cfg, Discord) => {
        if (message.mentions.users.size > 0) {
            let member = message.mentions.members.first();
            if (member) {
                const emb = new Discord.MessageEmbed().setImage(member.user.displayAvatarURL()).setTitle(member.user.username);
                message.channel.send(emb);

            }
        } else {
            const emb = new Discord.MessageEmbed()
                .setImage(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
                .setTitle(message.author.username)

            message.channel.send(emb);
        }

    }
}