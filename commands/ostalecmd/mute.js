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

        const target = message.mentions.users.first();
        if (message.member.permissions.has("KICK_MEMBERS")) {
        if (target) {
 
            let mainRole = message.guild.roles.cache.find(role => role.name === '💯|Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');
 
            let memberTarget = message.guild.members.cache.get(target.id);
 
            if (!args[1]) {
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> is muted`);
                return
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> is muted for ${ms(ms(args[1]))}`);
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
        } else {
            message.reply('Please tag who do you want to mute.');
            }
        }
        
    }
} 