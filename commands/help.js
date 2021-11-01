module.exports = {
    name: 'help',
    description: "Ovo su embeds",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#40E0D0')
        .setTitle('Help')
        .setDescription('You can use this commands')
        .addFields(
            {name: 'Help', value: '`ban` - Koristi kako bi banovao nekog\n\n `clear` - koristi kako bi obrisao odredjen broj poruka\n\n `kick` - koristi kako bi izbacio nekog sa servera\n\n `mute` - koristi kako bi mute nekoga\n\n ` unmute` - koristi kako bi unmute nekoga\n\n `p` - koristi kako bi pustio pesmu koju zelis\n\n `leave` - koristi kako bi izbacio bota iz kanala'}
        )
        .setImage()
        .setFooter('Enjoy my commands');

        message.channel.send(newEmbed);
    }
}