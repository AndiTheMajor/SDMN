
module.exports = {
	meta: {
		name: 'skip',
		aliases: ['s'],
		usage: '[link | args]',
		description: 'Play',
		hasArgs: false,
		category: 'music',
		devOnly: false,
		perms: {
			require: false,
		},
	},
	pokreni: async (client, message, args, cfg, Discord) => {
     
        const serverQueue = client.queue.get(msg.guild.id);
        if (!msg.member.voice.channel) return msg.channel.send(':x: **You have to be in a voice channel to use this command.**');
        if(!serverQueue) return msg.channel.send(':x: **Nothing playing in this server**');
        const members = serverQueue.voiceChannel.members.filter(x => !x.user.bot);
        if(serverQueue.songs[0].requester.id !== msg.author.id && members.size > 2){
            if(serverQueue.songs[0].votes.includes(msg.author.id)) return msg.channel.send('**You already voted to skip this song**');
            serverQueue.songs[0].votes.push(msg.author.id);
            if(serverQueue.songs[0].votes.length === 3){
                //msg.channel.send(`⏩ _**Skipped**_ 👍`);
          msg.react('⏩')
                return serverQueue.connection.dispatcher.end();
            }
            return msg.channel.send(`📢 You voted to skip this songs, need more votes! **${serverQueue.songs[0].votes.length} / 3**`);
        }
        msg.channel.send(`⏩ _**Skipped**_ 👍`);
    
        return serverQueue.connection.dispatcher.end(); 
        try{
        }catch(e){
            return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
        } 
       
  }
}