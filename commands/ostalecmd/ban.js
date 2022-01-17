module.exports = {
    meta: {
        name: 'ban',
        aliases: ['ban'],
        usage: '[@member]',
        description: 'ban cmd',
        hasArgs: false,
        category: 'ostalecmd',
        devOnly: false,
        perms: {
            require: ["ADMINISTRATOR"]
        },
    },
    pokreni: async (client, message, args, cfg, Discord) => {
        const member = message.mentions.users.first();
        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.ban();
            message.channel.send(`Member is banned`)
        } else {
            message.reply('Plese tag who you want to ban!');
        }

    }
}