module.exports = {
	meta: {
		name: 'stop',
		aliases: ['fckoff'],
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
    
try {
    const serverQueue = client.queue.get(message.guild.id);
    if (!message.member.voice)
      return message.channel.send({
        embed: {
          color: 0xff0000,
          description: "You are not in a voice channel!"
        }
      });
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: 0xff0000,
          description: "There is nothing playing that I could stop for you."
        }
      });
    if (serverQueue.voiceChannel.id !== message.member.voice.channelID)
      return message.channel.send({
        embed: {
          color: 0xff0000,
          description: `You must be in **${serverQueue.voiceChannel.name}** to stop the song`
        }
      });
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop command has been used!");
    return message.channel.send({
      embed: {
        color: 0xff0000,
        description: "Stopped music and leaving voice channel."
      }
    });
  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e}\` try again later.`);
  }
    
  }
}