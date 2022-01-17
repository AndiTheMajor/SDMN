module.exports = {
    meta: {
        name: 'clear',
        aliases: ['clear', 'c'],
        usage: '[number]',
        description: 'clear cmd',
        hasArgs: false,
        category: 'ostalecmd',
        devOnly: false,
        perms: {
            require: ["ADMINISTRATOR"]
        },
    },
    pokreni: async (client, message, args, cfg, Discord) => {
        if (!args[0]) return message.reply("Pleas specify a number");

        if (isNaN(args[0])) return message.reply("Pleas type in REAL number!");

        if (args[0] > 100) return message.reply("Maximum ammount of messages is 100!");

        if (args[0] < 1) return message.reply("Minimal ammount of messages is 1!")

        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages);
            message.channel.send(" **Sucesfuly cleared " + "`" + args[0] + " messages`**")
                .then(msg => {
                    msg.delete({ timeout: 3000 })
                })
        });

    }
}