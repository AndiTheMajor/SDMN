module.exports = {
    name: 'clear',
    description: "Ovo je _clear komanda",
    async execute(message, args) {
        if (message.member.permissions.has("KICK_MEMBERS")) {
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
        } else {
            message.reply("You dont have permision to use this command!");
        }
    }
} 