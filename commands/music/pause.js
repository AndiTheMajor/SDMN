module.exports = {
	meta: {
		name: 'pause',
		aliases: ['stopiraj'],
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
        if(!msg.member.voice.channel) {
         return msg.channel.send(":x: **You have to be in a voice channel to use this command.**")
     }
     
     if(!msg.guild.me.voice.channel) {
         return msg.channel.send(":x: **I am not connected to a voice channel**, Use the summon command to get me in one")
     }
 
  if (serverQueue && serverQueue.playing) {
       serverQueue.playing = false;
       serverQueue.connection.dispatcher.pause(true);
       return msg.channel.send(`**Paused** ⏸️`);
     }
 if (serverQueue.connection.dispatcher.pause()); return msg .channel.send(`❌ **The player is already paused**`)
  }
}