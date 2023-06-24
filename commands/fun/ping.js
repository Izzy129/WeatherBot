const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),  
    async execute(interaction) {

        // var ping = -(Date.now() - interaction.createdTimestamp)+ " ms";
        
        await interaction.reply('Pong!');
    },
};