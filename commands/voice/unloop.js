const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { useQueue } = require("discord-player");
const { colorError, colorSuccess } = require('../../config.json');

const data = new SlashCommandBuilder()
    .setName('unloop')
    .setDescription('Stops looping the current song.');
module.exports = {
    data: data,
    async execute(interaction) {
        const queue = useQueue(interaction.guildId);
        if (queue.repeatMode === 0) { // check if queue isn't looping
            const embed = new EmbedBuilder()
                .setColor(colorError)
                .setTitle('Error')
                .setDescription(`The queue isn't looping!`);
            await interaction.reply({ embeds: [embed] });
            return;
        }
        queue.setRepeatMode(0);
        const embed = new EmbedBuilder()
            .setColor(colorSuccess)
            .setTitle('Success')
            .setDescription(`Stopped looping the current song.`);
        await interaction.reply({ embeds: [embed] });
    }
};