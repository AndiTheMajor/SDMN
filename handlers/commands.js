const { readdirSync } = require('fs');
const signale = require('signale');
const cfg = require('../data/config.json');
module.exports = (client) => {
	const citaj = (dirs) => {
		const komande = readdirSync(`./commands/${dirs}/`).filter((d) =>
			d.endsWith('.js'),
		);
		for (let komanda of komande) {
			let siEmDi = require(`../commands/${dirs}/${komanda}`);
			client.commands.set(siEmDi.meta.name, siEmDi);
			if (siEmDi.meta.aliases)
				siEmDi.meta.aliases.forEach((a) =>
					client.aliases.set(a, siEmDi.meta.name),
				);
			let imeKomande = komanda.split('.')[0];
			signale.success(`Ucitana komanda: ${imeKomande}`);
		}
	};
	cfg.kategorije.forEach((h) => citaj(h));
};
