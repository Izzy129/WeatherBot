const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Replies with a random joke!'),  
    async execute(interaction) {
        
        const jokeResult = await request('https://official-joke-api.appspot.com/jokes/random');
        const jokeData = await jokeResult.body.json();
        const joke =  "**Joke #" + jokeData.id + "**\n" + jokeData.setup + "\n\n" + jokeData.punchline;        
        await interaction.reply(joke);
    },
};