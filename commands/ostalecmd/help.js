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

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#40E0D0')
        .setTitle('Help')
        .setDescription('You can use this commands')
        .addFields(
            {name: 'Help', value: 'Use `!help-fun` to see all comands for fun\n \n Use `!help-moderation` to see al commands for moderation'}
        )
        .setImage()
        .setFooter('Enjoy my commands');

        message.channel.send(newEmbed);
        
    }
}          