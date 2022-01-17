const { MessageEmbed } = require('discord.js');
module.exports = {
	meta: {
		name: 'np',
		aliases: ['nowplaying'],
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

try{
		const serverQueue = client.queue.get(message.guild.id);
		if(!serverQueue) return message.channel.send(':x: **Nothing playing in this server**');
	  const progBar = this.getProgressBar(serverQueue);
		const dur = this.getTime(serverQueue);
  client.getProgressBar = this.getProgressBar(serverQueue);
	client.getTime = this.getTime(serverQueue);
		return message.channel.send(
new MessageEmbed()
    .setAuthor(`🎶 Upravo slušate:`)
    .setDescription(`\n> \  **Ime:** **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**\n> \n> \ **Progres:** ${progBar}\n> \n> \ **Trajanje:** ${dur}`)
    .setThumbnail(`https://i.ytimg.com/vi/${serverQueue.songs[0].id}/default.jpg?width=80&height=60`)
    .setColor("red")
    .setFooter(`${serverQueue.songs[0].author.tag}`, serverQueue.songs[0].author.displayAvatarURL({dynamic: true, size: 32, format: "png"}))
    .setTimestamp());
	}catch(e){
		return message.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}

}

}
exports.getProgressBar = (serverQueue)=> {
  const duration = (serverQueue.songs[0].duration.minutes*60000) + ((serverQueue.songs[0].duration.seconds%60000)*1000);
	const percent = serverQueue.connection.dispatcher.streamTime/duration;
	const num = Math.floor(percent*10);
	let str = '';
	for(let i = 0; i < 10; i++){
		str += i === num ? '\🔘' : '▬';
  }
	return str;
}

exports.getTime = (serverQueue) => {
	const curentDurationMinute = Math.floor(serverQueue.connection.dispatcher.streamTime/60000) < 10 ? `0${Math.floor(serverQueue.connection.dispatcher.streamTime/60000)}` : Math.floor(serverQueue.connection.dispatcher.streamTime/60000);
	const currentDurationSeconds = Math.floor((serverQueue.connection.dispatcher.streamTime%60000)/1000) < 10 ? `0${Math.floor((serverQueue.connection.dispatcher.streamTime%60000)/1000)}` : Math.floor((serverQueue.connection.dispatcher.streamTime%60000)/1000);
	const endDurationMinute = serverQueue.songs[0].duration.minutes < 10 ? `0${serverQueue.songs[0].duration.minutes}` : serverQueue.songs[0].duration.minutes;
	const endDurationSeconds = serverQueue.songs[0].duration.seconds < 10 ? `0${serverQueue.songs[0].duration.seconds}` : serverQueue.songs[0].duration.seconds;
	return `${curentDurationMinute}:${currentDurationSeconds} / ${endDurationMinute}:${endDurationSeconds}`;
}