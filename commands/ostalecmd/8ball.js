module.exports = {
    meta: {
        name: '8ball',
        aliases: ['8ball', 'av'],
        usage: '[@member]',
        description: '8ball cmd',
        hasArgs: false,
        category: 'ostalecmd',
        devOnly: false,
        perms: {
            require: false
        },
    },
    pokreni: async (client, message, args, cfg, Discord) => {
        if (!args[0]) return message.reply('Please ask a question')
        let replies = ['As I see it, yes.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            `Don't count on it.`,
            `It is certain.`,
            `It is decidedly so.`,
            `Most likely.`,
            `My reply is no.`,
            `My sources say no.`,
            `Outlook not so good.`,
            `Outlook good.`,
            `Reply hazy, try again.`,
            `Signs point to yes.`,
            `Very doubtful.`,
            `Without a doubt.`,
            `Yes.`,
            `Yes - definitely.`,
            `You may rely on it.`]

        let question = args.slice(0).join(" ");
        let result = replies[Math.floor(Math.random() * replies.length)];
        let ballembed = new Discord.MessageEmbed()
            .setAuthor(`8 ball`)
            .setColor("RANDOM")
            .addField("Question", question)
            .addField("Answer", result)

        message.channel.send(ballembed);

    }
}