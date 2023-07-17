const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { useQueue } = require('discord-player'); // useMainPlayer is a function that returns the main player instance
const { colorError, colorSuccess } = require('../../config.json');

const data = new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes the current song.');
module.exports = {
    data: data,
    async execute(interaction) {
        const queue = useQueue(interaction.guildId);
        if (!queue.node.isPaused()) { // check if queue is paused
            const embed = new EmbedBuilder()
                .setColor(colorError)
                .setTitle('Error')
                .setDescription(`The queue is not paused!`);
            await interaction.reply({ embeds: [embed] });
            return;
        }

        queue.node.setPaused(false);
        const embed = new EmbedBuilder()
            .setColor(colorSuccess)
            .setTitle('Success')
            .setDescription(`Resumed the queue. :arrow_forward:`);
        await interaction.reply({ embeds: [embed] });
    }
};