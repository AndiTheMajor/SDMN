module.exports = {
    name: 'help-moderation',
    description: "Ovo su embeds",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#008141')
        .setTitle('Help')
        .setDescription('You can use this commands')
        .addFields(
            {name: 'For moderation', value: '=ban - `Use to ban members from server`\n  \n  =clear - `Use to delete specific amount of messages `\n \n =kick - `Use to kick someone from server`\n  \n =mute - `Use to mute member for specific amount of time or to mute him forever`\n \n =unmute - `Use to unmute members`'}
        )
        .setFooter('Enjoy my commands');

        message.channel.send(newEmbed);
    }
}