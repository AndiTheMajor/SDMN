const { handleVideo } = require("../../handlers/music");
module.exports = {
	meta: {
		name: 'p',
		aliases: ['play'],
		usage: '[link | args]',
		description: 'Play',
		hasArgs: false,
		category: 'music',
		devOnly: false,
		perms: {
			require: false
		},
	},
	pokreni: async (client, message, args, cfg, Discord) => {
    const youtube =  client.youtube
    
const searchString = args.slice(0).join(" ");
const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} - Error`, client.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.no} Moraš biti u **voice kanalu** da bi mogo pustit muziku.`)
      .setColor(cfg.colors.no)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp());
  if (!args[0])
    return message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} - Error`, client.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.no} Koristi **[Ime pesme]/[Link pesme]/[Link playliste]**`)
      .setColor(cfg.colors.no)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp());
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT"))
    return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} - Error`, client.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.no} Nemam dozvolu \` CONNECT \``)
      .setColor(cfg.colors.no)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp())

  if (!permissions.has("SPEAK"))
    return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} - Error`, client.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.no} Nemam dozvolu \` SPEAK \``)
      .setColor(cfg.colors.no)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp())

  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

    const playlist = await youtube.getPlaylist(url).catch(erro => {
		return console.log(erro)
	});
	const videos = await playlist.getVideos().catch(erro => { 
	console.log(erro)
	});
	for(const video of Object.values(videos)){
		try{
		const video2 = await youtube.getVideoByID(video.id)
				await client.handleVideo(video2, message, voiceChannel, true);
	} catch {
	}
	}

    let queuee = [];
    return  youtube.getPlaylist(url)
    .then(playlist => {
        playlist.getVideos()
            .then(videos => {
          videos.forEach((x, i) => {
			if(i !== 0){
        if(x.title === "Private video")return playlist.videos.length - 1
        if(x.title === "Deleted video")return playlist.videos.length - 1
queuee.push(x);
			}
		});
   message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`🎶 Playlist:`)
      .setDescription(`\n> \n> \ ${cfg.emojis.music} **Ime:** **[${playlist.title}](https://www.youtube.com/playlist?list=${playlist.id})**\n> \n> \ ${cfg.emoji.autor} **Autor:** [${playlist.channelTitle}](https://www.youtube.com/channel/${playlist.channel.id})\n> \n> \ ${cfg.emoji.playlist} **Broj:** ${queuee.length}`)
      .setThumbnail(playlist.thumbnails.default.url)
      .setColor(cfg.colors.music)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp())
            })
            .catch(console.log);
    })
    .catch(console.log);
    

  } else {
    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(searchString, 1);
        var video = await youtube.getVideoByID(videos[0].id);
      } catch (err) {
        return message.channel.send(new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} - Error`, client.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.no} Ne mogu **pronaći** pesmu.`)
      .setColor(cfg.colors.no)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp());
      }
    }
    return client.handleVideo(video, message, voiceChannel);
  }
    
  }
}