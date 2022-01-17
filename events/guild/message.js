const Discord = require('discord.js');
const fs = require('fs');
const cfg = require('../../data/config.json');
module.exports = async (client, message) => {
	if (message.author.bot || message.channel.type === 'dm') return;
 const prefix = "!";
    
	let args = message.content.slice(prefix.length).trim().split(/ +/g);
	let siEmDi = args.shift().toLowerCase();

	if (!message.content.startsWith(prefix)) return;

	let komanda =
		client.commands.get(siEmDi) ||
		client.commands.get(client.aliases.get(siEmDi));
	if (!komanda) return;


	if (komanda.meta.perms.require) {
		if (!message.member.hasPermission(komanda.meta.perms.permissions)) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setAuthor(`${client.user.username} - ${komanda.meta.name.charAt(0).toUpperCase() + komanda.meta.name.slice(1)}`, client.user.displayAvatarURL())
                    .setDescription(`${cfg.emoji.no} | Nemate permisiju za ovu komandu.`)
                    .setColor(cfg.boja.ne)
					.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
					.setTimestamp()
			);
		}
	}

	if (komanda.meta.hasArgs && !args.length)
		return message.channel.send(
			new Discord.MessageEmbed()
				.setColor(cfg.colors.no)
				.setAuthor(`${client.user.username} - ${komanda.meta.name.charAt(0).toUpperCase() + komanda.meta.name.slice(1)}`,client.user.displayAvatarURL())
				.setDescription(`${cfg.emojis.no} | Iskoristite komandu pravilno.\nKoristite: ${prefix}${komanda.meta.name} \`${komanda.meta.usage}\``)
                .setColor(cfg.colors.no)
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
				.setTimestamp(),
		);

	if (komanda.meta.devOnly) {
		if (message.author.id !== '294225541316476928' ) return;
	}

	try {
		komanda.pokreni(client, message, args, cfg, Discord);
	} catch (error) {
		return message.channel.send(`Error: \n \```${error}\````);
  }
  
};