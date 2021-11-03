module.exports = {
    name: 'help-fun',
    description: "Ovo su embeds",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ffcc5c')
        .setTitle('Help')
        .setDescription('You can use this commands')
        .addFields(
            {name: 'For fun', value:'=8ball - `Ask magic 8ball all sort of questions`\n\n =av/avatar - `Use to see someones pfp (tag that person)`\n\n =howgay - `Use to tell how much someone is gay (tag that person)`\n\n =joke - `Use to see some funny jokes`\n\n =meme - `Use to look at some good memes`\n\n =penis - `Use to see how long someones pp is (tag that person)`\n Suggested by: Ardalic8464\n\n =ping - `We all know whats going to happen`\n\n =say - `Use to make bot to say whatever u want`\n\n =simp - `Use to see how much someone is a simp (tag that person)`'}
        )
        .setImage()
        .setFooter('Enjoy my commands');

        message.channel.send(newEmbed);
    }
}