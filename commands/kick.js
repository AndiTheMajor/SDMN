module.exports = {
    name: 'kick',
    description: "Ovo je _kick komanda.",
    execute(message, args) {
        const member = message.mentions.members.first();

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