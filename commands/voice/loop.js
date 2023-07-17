// todo: possibly add autoplay option
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { useQueue } = require("discord-player");
const { colorError, colorSuccess } = require('../../config.json');
const data = new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loops the current song in the queue.');

function getMode(mode) {
    switch (mode) {
        case 0:
            return 'Disabled';
        case 1:
            return 'Looping current track';
        case 2:
            return 'Looping the queue';
        case 3:
            return 'Autoplaying similar songs';
    }
}

module.exports = {
    data: data,
    getMode: getMode,
    async execute(interaction) {
        const queue = useQueue(interaction.guildId);
        if (queue.repeatMode !== 0) { // check if queue is already looping
            const embed = new EmbedBuilder()
                .setColor(colorError)
                .setTitle('Error')
                .setDescription(`The queue is already looping! 
                \n \n Current loop mode: **${getMode(queue.repeatMode)}**
                `);    
            await interaction.reply({ embeds: [embed] });
            return;
        } 
        queue.setRepeatMode(1);
        const embed = new EmbedBuilder()
            .setColor(colorSuccess)
            .setTitle('Success')    
            .setDescription(`Looping the current song. :repeat:`);
        await interaction.reply({ embeds: [embed] });
    }
};