const { getTime, getProgressBar } = require('./np.js');
const { chunk } = require("../../util.js");
module.exports = {
	meta: {
		name: 'queue',
		aliases: ['q'],
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
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: 0xff0707,
          description: "Not playing anything right now"
        }
      });
    let queues = [];
    serverQueue.songs.forEach((x, i) => {
      if (i !== 0) {
        queues.push(x);
      }
    });
    const embed = new Discord.MessageEmbed().setColor("RANDOM");
    if (!queues || queues.length < 1)
      return message.channel.send(
        `🎶** | Now playing ${serverQueue.songs[0].title}**`,
        { embed: embed.setDescription("**No songs in queue**") }
      );
    if (queues.length > 10) {
      let index = 0;
      queues = queues.map(
        (x, i) =>
          `\`${i + 1}\`. __**[${x.title}](${
            x.url
          })**__ **by** ${x.author.toString()}`
      );
      queues = chunk(queues, 10);
      embed.setDescription(queues[index].join("\n"));
      embed.setFooter(`Page ${index + 1} of ${queues.length}`);
      const queuesMess = await message.channel.send(
        `🎶 ** | Now playing ${serverQueue.songs[0].title}**`,
        { embed: embed }
      );
      await queuesMess.react("⬅");
      await queuesMess.react("🔴");
      await queuesMess.react("➡");
      awaitReactions();
      function awaitReactions() {
        const filter = (rect, usr) =>
          ["⬅", "➡"].includes(rect.emoji.name) && usr.id === message.author.id;
        queuesMess
          .createReactionCollector(filter, { time: 30000, max: 1 })
          .on("collect", col => {
            if (col.emoji.name === "🔴") return queuesMess.delete();
            if (col.emoji.name === "⬅") index--;
            if (col.emoji.name === "➡") index++;
            index = ((index % queues.length) + queues.length) % queues.length;
            embed.setDescription(queues[index].join("\n"));
            embed.setFooter(`Page ${index + 1} of ${queues.length}`);
            queuesMess.edit(
              `🎶 ** | Now playing ${serverQueue.songs[0].title}**`,
              { embed: embed }
            );
            return awaitReactions();
          });
      }
    } else {
      embed.setDescription(
        queues
          .map(
            (x, i) =>
              `\`${i + 1}\`. __**[${x.title}](${
                x.url
              })**__ **by** ${x.author.toString()}`
          )
          .join("\n")
      );
      return message.channel.send(
        `🎶 ** | Now playing ${serverQueue.songs[0].title}**`,
        { embed: embed }
      );
    }
  } catch (e) {
    return message.channel.send(
      `Oh no an error occured :( \`\`\`${e.stack}\`\`\`try again later`
    );
  }
  }
}