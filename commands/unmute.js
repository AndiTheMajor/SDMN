module.exports = {
    name: 'unmute',
    description: "Ovo je _unmute komanda",
    execute(message, args){
        const target = message.mentions.users.first();
        if (message.member.permissions.has("BAN_MEMBERS")) {
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === '💯|Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');
 
            let memberTarget= message.guild.members.cache.get(target.id);
 
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> is not muted anymore`);
        } else{
            message.reply('I cant find that user!');
            }
        }
    }
}