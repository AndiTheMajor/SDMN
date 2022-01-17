module.exports = {
	meta: {
		name: 'resume',
		aliases: ['odstopiraj'],
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
    
      if (serverQueue && !serverQueue.playing) {
          serverQueue.playing = true;
          serverQueue.connection.dispatcher.resume();
          return msg.channel.send(`:play_pause: **Resuming** :thumbsup:`);
        }
    if (serverQueue.connection.dispatcher.resume()); return msg.channel.send(`:x: **The player is not paused**`)
  }
}