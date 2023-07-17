const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),  
    async execute(interaction) {

        await interaction.deferReply(); // Defer the reply to ensure the command is acknowledged
        const currentTimestamp = Date.now();
        const replyTimestamp = interaction.createdTimestamp;
        
        const latency = currentTimestamp - replyTimestamp;

        await interaction.followUp(`Pong! Latency: ${latency}ms`);
    },
};