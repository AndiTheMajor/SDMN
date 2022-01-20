const { MessageEmbed, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { GOOGLE_KEY } = "AIzaSyBcRTZDXUqX8K3dssqg4WIooXIjhCAq51Y";
const youtube = new YouTube("AIzaSyBcRTZDXUqX8K3dssqg4WIooXIjhCAq51Y");
module.exports = {
  meta: {
    name: 'play',
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

    let error = new MessageEmbed()
      .setColor(client.boja)
      .setDescription(`${client.x} Unesite ime ili link pesme.`)

    try {
      if (args.length < 1) return message.channel.send(error);
      const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
      const voiceChannel = message.member.voice.channel;
      if (!message.member.voice.channel) return message.channel.send(`${client.x}` + ' Morate biti u **voice** kanalu kako biste koristili ovu komandu.');

      await message.channel.send(`<:youtube:766718751910395914> **Searching** :mag_right: \`${args.join(" ")}\``);

      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        const playlist = await youtube.getPlaylist(url).catch(erro => {
          return message.reply("A Playlist é privada ou não existe!")
        });
        const videos = await playlist.getVideos().catch(erro => {
          message.reply("Ocorreu um problema ao colocar um dos vídeos da playlist na fila!'")
        });
        for (const video of Object.values(videos)) {
          try {
            const video2 = await youtube.getVideoByID(video.id)
            await this.handleVideo(client, video2, message, voiceChannel, true);
          } catch {
          }
        }
        //console.log(playlist.videos.Video)
        let queuee = [];
        playlist.videos.forEach((x, i) => {
          if (i !== 0) {
            if (x.title === "Private video") return playlist.videos.length - 1
            queuee.push(x);
          }
        });

        let pl = queuee.length

        let plTag = pl ? `${pl}` : "Nothing";

        const embedf = new MessageEmbed()
          .setColor('GRAY')
          .setAuthor(`Playlist added to queue`, message.author.avatarURL(), "https://top.gg/bot/707225574405570642")
          .setTitle(`**${playlist.title}**`)
          // .setURL(playlist.url)
          .setThumbnail(playlist.thumbnails.default.url)
          .addField("Estimated time until playing", `now`, false)
          .addField("Position in queue", `now`, true)
          .addField("Enqueued", `\`${plTag}\``, true)//${playlist.videos.length - 1} ${playlist.videos.length === 50 ? '50+' : playlist.videos.length}
        message.channel.send(embedf)


        if (playlist) {
          if (queuee.length > Math.floor(maxqueuelength) && maxqueuelength !== 0) {
            exports.queueelength = maxqueuelength
            return message.channel.send(`**:warning: Shortening playlist due to reaching the song queue limit**`)
          }
        }
        return
      }


      try {


        const video = await youtube.getVideo(url);
        const song = {
          id: video.id,
          title: video.title
        }

        return this.handleVideo(client, video, message, voiceChannel);
      } catch (e) {
        try {
          const videos = await youtube.searchVideos(args.join(' '), 1);

          const txtchannel = message.channel

          exports.argsj = args.join(' ')

          const oneUrl = await youtube.getVideoByID(videos[0].id);

          return this.handleVideo(client, oneUrl, message, voiceChannel);

        } catch (err) {
          return message.channel.send('🚫 No result found');
        }
      }
    } catch (e) {
      //return message.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
    }
  }
}
exports.handleVideo = async (client, video, message, voiceChannel, playlist = false, force = false) => {
  const serverQueue = client.queue.get(message.guild.id);
  const song = {
    id: video.id,
    title: video.title,
    thumbnail: video.thumbnails.high.url,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationmm: video.durationSeconds
      ? video.durationSeconds
      : video.duration / 1000,
    votes: [],
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    duration: video.duration,
    requester: message.author,
    uploadedby: video.channel.title,
    loop: false
  }


  exports.songdur = video.duration



  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      guildID: message.guild.id,
      connection: null,
      songs: [],
      volume: 50,
      playing: true
    }
    client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);
    try {
      const connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      //playlist ? undefined : embed(message, song, 'addQueue');
      const serverQueue = client.queue.get(message.guild.id);

      play(client, message.guild, queueConstruct.songs[0]);
      if (!playlist) serverQueue.textChannel.send(`**Playing** :notes: \`${song.title}\` - Now!`);


    } catch (e) {
      client.queue.delete(message.guild.id);
      return message.channel.send(`Oh no an error occured :( \`${e.message}\``);
    }
  } else {

    force ? serverQueue.songs.splice(1, 0, song) : serverQueue.songs.push(song);
    if (!playlist) return embed(message, song, 'addQueue');

  }
}


async function play(client, guild, song, type = 'biasa', seek = 0) {

  const serverQueue = client.queue.get(guild.id);
  exports.serverQueue = client.queue.get(guild.id);


  if (!song) {
    serverQueue.voiceChannel.leave();
    return client.queue.delete(guild.id);
  }

  let options = {
    quality: 'highestaudio',
    highWaterMark: 1 << 25
  };

  const dispatcher = serverQueue.connection.play(ytdl(song.url, options))
    .on('finish', res => {
      if (res !== 'Stream is not generating quickly enough.') console.error(res);
      //if(res.includes('seek')){
      if (res === 'seek') {

        const seekTo = parseInt(res.split(' ')[1], 10);
        serverQueue.songs.shift();
        play(client, guild, serverQueue.songs[0], 'seek', seekTo);

      } else {
        const shiffed = serverQueue.songs.shift();
        if (serverQueue.loop) serverQueue.songs.push(shiffed);
        play(client, guild, serverQueue.songs[0]);
      }
    })
    .on('error', err => console.error(err));
  dispatcher.setVolume(serverQueue.volume / 50);
  type !== 'seek' ? embed(serverQueue.textChannel, song) : undefined;
  //serverQueue.textChannel.send(`**Playing** :notes: \`${song.title}\` - Now!`);


  let zz = await client.queue.get(serverQueue.guildID);

  let np = exports.qsong
  //if(np === undefined) np = "Nothing"
  //if(np === null) np = "Nothing"
  if (serverQueue.songs.length - 1 === 0) np = "Nothing"
  else np = exports.qsong
  //if(!np) np = "Nothing"
  if (exports.playlist) np = "playlist"
  if (serverQueue.loop === true) np = "Loop"
  if (zz.songs.length - 1 === 0) np = "Nothing"
  //else np = zz.songs[1].title

  let npTag = np ? `${np}` : "Nothing";

  //!ev let zz = client.queue.get("712115507884720209");
  //zz.songs[1].title

  let pjesma = new MessageEmbed()
    .setTitle(`**Now Playing :musical_note:**`)
    .setURL("https://rythmbot.co/")
    .setDescription(`[${song.title}](${song.url})

\`Length:\` ${require("../../util.js").timeString(song.durationmm)}

\`Requested by:\` ${song.requester.tag}

\`Up Next:\` ${npTag}`)
    .setThumbnail(song.thumbnail)
    .setColor("BLUE");

  setTimeout(function () {
    serverQueue.textChannel.send(pjesma)
  }, 3500);
}

function embed(message, song, type = 'biasa') {
  if (type === 'addQueue') {

    const duration = (exports.serverQueue.songs[0].duration.minutes * 60000) + ((exports.serverQueue.songs[0].duration.seconds % 60000) * 1000);

    const durmin = exports.serverQueue.songs[0].duration.minutes < 10 ? `0${exports.serverQueue.songs[0].duration.minutes}` : exports.serverQueue.songs[0].duration.minutes;
    const dursec = exports.serverQueue.songs[0].duration.seconds < 10 ? `0${exports.serverQueue.songs[0].duration.seconds}` : exports.serverQueue.songs[0].duration.seconds;
    exports.qsong = song.title
    exports.nexsong = require("../../util.js").timeString(song.durationmm)
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`Dodano na listu`, song.requester.avatarURL, "https://top.gg/bot/707225574405570642")
      .setTitle(`**${song.title}**`)
      .setURL(song.url)
      .setThumbnail(song.thumbnail)
      .addField("Kanal", song.uploadedby, true)
      .addField("Duzina pesme", ` ${require("../../util.js").timeString(song.durationmm)}`, true)
      .addField("Pozicija na listi", exports.serverQueue.songs.length - 1, true)

    return message.channel.send(embed)//.then(m => m.delete({timeout:60000}))
  }

}
