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

        if (message.member.permissions.has("KICK_MEMBERS")) {
            if(member){
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick();
                message.channel.send(`Member is kicked!`);
            }else{
                message.reply('Please tag who do you want to kick');
            }
        }
        
    }
} 