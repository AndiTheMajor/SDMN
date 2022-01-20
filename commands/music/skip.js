
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
        if (!message.member.voice.channel) return message.channel.send(':x: **You have to be in a voice channel to use this command.**');
        if(!serverQueue) return message.channel.send(':x: **Nothing playing in this server**');
        message.channel.send(`⏩ _**Skipped**_ 👍`);
        serverQueue.connection.dispatcher.end("skipping");
        try{
        }catch(e){
            return message.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
        } 
       
  }
}