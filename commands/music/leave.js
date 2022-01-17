module.exports = {
	meta: {
		name: 'leave',
		aliases: ['disconnect', 'dc', 'leave', 'dis', 'fuckoff'],
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

        if(!message.member.voice.channel) {
            return message.channel.send(":x: **You have to be in a voice channel to use this command.**")
        }
        
        if(!message.guild.me.voice.channel) {
            return message.channel.send(":x: **I am not connected to a voice channel**, Use the summon command to get me in one")
        }
      
		serverQueue.songs = [];
		client.queue.delete(message.guild.id);

        serverQueue.connection.dispatcher.();
        message.guild.me.voice.channel.leave();
        message.channel.send("**:mailbox_with_no_mail: Successfully disconnected**");
    
  }
}

//destroy