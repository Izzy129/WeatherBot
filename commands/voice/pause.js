const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { useQueue } = require('discord-player'); // useMainPlayer is a function that returns the main player instance
const { colorError, colorSuccess } = require('../../config.json');

const data = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the current song.');
module.exports = {
    data: data,
    async execute(interaction) {
        const queue = useQueue(interaction.guildId);
        if (queue.node.isPaused()) { // check if queue is paused
            const embed = new EmbedBuilder()
                .setColor(colorError)
                .setTitle('Error')
                .setDescription(`The queue is already paused!`);
            await interaction.reply({ embeds: [embed] });
            return;
        }

        queue.node.setPaused(true);
        const embed = new EmbedBuilder()
            .setColor(colorSuccess)
            .setTitle('Success')
            .setDescription(`Paused the queue. :pause_button:`);
        await interaction.reply({ embeds: [embed] });
    }
};