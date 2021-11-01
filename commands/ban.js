module.exports = {
    name: 'ban',
    description: "Ovo je _ban komanda.",
    execute(message, args) {
        const member = message.mentions.users.first();
        if (message.member.permissions.has("BAN_MEMBERS")) {
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.ban();
            message.channel.send(`Member is banned`)
        }else{
            message.reply('Plese tag who you want to ban!');
            }
        }
    }
}