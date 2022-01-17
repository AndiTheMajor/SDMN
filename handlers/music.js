const cfg = require('../data/config.json');
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const { Discord, MessageEmbed, Util, Collection } = require('discord.js');

module.exports = (client, handleVideo) => {
const youtube = new YouTube("AIzaSyBlAMo_vfMq41ASL7HdFj43o4HLKGTQZUg")//"AIzaSyAfX-wXhDFEAvVVG92-3cpZRaUTYBDC50A");
const queue = new Collection();
client.util = require("../util.js");
client.queue = queue;
  
client.handleVideo = handleVideo;
client.queue = queue;
client.youtube = youtube;

async function handleVideo(video, msg, voiceChannel, playlist = false) {

  const serverQueue = client.queue.get(msg.guild.id);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationmm: video.durationSeconds
      ? video.durationSeconds
      : video.duration / 1000,
    channel: msg.member.voice.channel.name,
    uploadedby: video.channel.title,
    channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
    author: msg.author,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    duration: video.duration
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true,
      loop: false,
      loopqueue: false
    };
    client.queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      connection.sendVoiceStateUpdate({ self_deaf: true });
      queueConstruct.connection = connection;
      exports.cursong = queueConstruct.songs[0]
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Error: ${error}`);
      client.queue.delete(msg.guild.id);
      return msg.channel.send(`Error: ${error}`);
    }
  } else {
      
    serverQueue.songs.push(song);
    if (playlist) return;

    return msg.channel.send(
new MessageEmbed()
    .setAuthor(`🎶 Dodano u queue:`)
    .setDescription(`\n> \ ${cfg.emojis.music} **Ime:** **[${song.title}](${song.url})**\n> \n> \ 👨 **Autor:** [${song.uploadedby}](${song.channelurl})\n> \n> \ 🕰️ **Trajanje:** ${require("../util.js").timeString(song.durationmm)}`)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
    .setColor(cfg.colors.music)
    .setFooter(`${song.author.tag}`, song.author.displayAvatarURL({dynamic: true, size: 32, format: "png"}))
    .setTimestamp());
  }
  return;
}

function play(guild, song, msg) {
  const serverQueue = client.queue.get(guild.id);
  if (!song) {
    serverQueue.textChannel.send(new MessageEmbed()
 
    .setDescription(`Dodaj vise pjesama u q brale`)
    .setColor(cfg.colors.music)

    .setTimestamp())
    serverQueue.voiceChannel.leave();
    client.queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url, {filter: "audio"}, { quality: "highestaudio" }))
    .on("finish", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else;
      
if (serverQueue.loop === true) {
  const shifed = serverQueue.songs.shift();
  serverQueue.songs.push(shifed);

play(guild, serverQueue.songs[0]);
}  
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

  if(serverQueue.loop || serverQueue.loopqueue) return
  else serverQueue.textChannel.send(
new MessageEmbed()
    .setAuthor(`🎶 Upravo slušate:`)
    .setDescription(`\n> \ ${cfg.emojis.music} **Ime:** **[${song.title}](${song.url})**\n> \n> \ 👨 **Autor:** [${song.uploadedby}](${song.channelurl})\n> \n> \ 🕰️ **Trajanje:** ${require("../util.js").timeString(song.durationmm)}`)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
    .setColor(cfg.colors.music)
    .setFooter(`${song.author.tag}`, song.author.displayAvatarURL({dynamic: true, size: 32, format: "png"}))
    .setTimestamp());
}

};
