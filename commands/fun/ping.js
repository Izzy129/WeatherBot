const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {colorSuccess} = require('../../config.json');   
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),  
    async execute(interaction) {
        
        const start = Date.now();
        await interaction.deferReply();
        const end = Date.now();

        // get api ping
        const botLatency = end - start;
        const apiLatency = interaction.client.ws.ping;

        const embed = new EmbedBuilder()
            .setTitle('Pong! :ping_pong:')
            .setDescription(`Bot latency: ${botLatency}ms \n \n API latency: ${apiLatency}ms`)
            .setColor(colorSuccess);

        await interaction.editReply({ embeds: [embed] });
    },
};