
module.exports = {
	meta: {
		name: 'loop',
		aliases: ['repeat'],
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
	if (!message.member.voice.channel) return message.channel.send(':x: **I am not connected to a voice channel**, Use the summon command to get me in one');
	if(!serverQueue) return message.channel.send(':x: **Nothing to loop because queue is empty**');
	try{
		serverQueue.loop = !serverQueue.loop;
		if(serverQueue.loop) return message.channel.send('🔂 **Enabled!**');
		return message.channel.send('🔂 **Disabled!**');
	}catch(e){
		return message.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
    
  }
}