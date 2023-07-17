// todo: add error handler 

const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { colorSuccess } = require('../../config.json');
const { request } = require('undici');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Replies with a random joke!'),  
    async execute(interaction) {
        
        const jokeResult = await request('https://official-joke-api.appspot.com/jokes/random');
        const jokeData = await jokeResult.body.json();
        const embed = new EmbedBuilder()
            .setColor(colorSuccess)
            .setTitle('Joke #' + jokeData.id)
            .setDescription(jokeData.setup + '\n \n' + jokeData.punchline);
        await interaction.reply({ embeds: [embed] });
    },
};