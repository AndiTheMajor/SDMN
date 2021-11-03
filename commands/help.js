module.exports = {
    name: 'help',
    description: "Ovo su embeds",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#40E0D0')
        .setTitle('Help')
        .setDescription('You can use this commands')
        .addFields(
            {name: 'Help', value: 'Use `=help-fun` to see all comands for fun\n \n Use `=help-moderation` to see al commands for moderation'}
        )
        .setImage()
        .setFooter('Enjoy my commands');

        message.channel.send(newEmbed);
    }
}