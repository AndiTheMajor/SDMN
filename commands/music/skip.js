
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
     
        const serverQueue = client.queue.get(message.guild.id);
        if (!msg.member.voice.channel) return message.channel.send(':x: **You have to be in a voice channel to use this command.**');
        if(!serverQueue) return message.channel.send(':x: **Nothing playing in this server**');
        const members = serverQueue.voiceChannel.members.filter(x => !x.user.bot);
        if(serverQueue.songs[0].requester.id !== message.author.id && members.size > 2){
            if(serverQueue.songs[0].votes.includes(message.author.id)) return message.channel.send('**You already voted to skip this song**');
            serverQueue.songs[0].votes.push(message.author.id);
            if(serverQueue.songs[0].votes.length === 3){
                //msg.channel.send(`⏩ _**Skipped**_ 👍`);
          message.react('⏩')
                return serverQueue.connection.dispatcher.end();
            }
            return message.channel.send(`📢 You voted to skip this songs, need more votes! **${serverQueue.songs[0].votes.length} / 3**`);
        }
        message.channel.send(`⏩ _**Skipped**_ 👍`);
    
        return serverQueue.connection.dispatcher.end(); 
        try{
        }catch(e){
            return message.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
        } 
       
  }
}

//msg