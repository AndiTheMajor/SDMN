const { readdirSync } = require('fs');
const signale = require('signale');

module.exports = (client) => {
	const citaj = (dirs) => {
		const eventi = readdirSync(`./events/${dirs}`).filter((d) =>
			d.endsWith('js'),
		);
		for (let event of eventi) {
			const clientEvent = require(`../events/${dirs}/${event}`);
			let event_ime = event.split('.')[0];
			client.on(event_ime, clientEvent.bind(null, client));
			signale.success(`Ucitan event: ${event_ime}`);
		}
	};
	['client', 'guild'].forEach((e) => citaj(e));
};
