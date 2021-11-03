const Discord = require('discord.js')

module.exports = {
    name: 'joke',
    description: "Ovo je _ping komanda.",
    execute(message, args) {

        let jokes = [ 'Why do we tell actors to “break a leg?\n\n Because every play has a cast.',
        'What did the blanket say when it fell off the bed?\n\n Oh sheet!',
        'Did you hear about the claustrophobic astronaut?\n\n He just needed a little space.',
    'How does Moses make tea?\n\n He brews.',
    'Why should the number 288 never be mentioned?\n\n It’s two gross',
    'What did the left eye say to the right eye?\n\n Between you and me, something smells.',
    'What do you call a pony with a cough?\n\n A little horse.',
    'What did the shark say when he ate the clownfish?\n\n This tastes a little funny.',
    'Why couldn’t the leopard play hide and seek?\n\n Because he was always spotted.',
    'Can February march?\n\n No, but April may.',
    'Why does Humpty Dumpty love autumn?\n\n Because Humpty Dumpty had a great fall.',
    'Why did the M&M go to school?\n\n He wanted to be a Smartie.',
    'Why didn’t the melons get married?\n\n Because they cantaloupe.',
    'How do you throw a space party?\n\n You planet!']

    let result = jokes[Math.floor(Math.random() * jokes.length)];
    let jokeEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Joke\n", result)

        message.channel.send(jokeEmbed)
    }
}