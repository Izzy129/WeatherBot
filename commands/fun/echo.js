const {SlashCommandBuilder} = require('discord.js');

const data = new SlashCommandBuilder() 
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The input to echo back')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('input2')
            .setDescription('The 2nd input to echo back')
            .setRequired(true)
    );
module.exports = {
    data: data,
    async execute(interaction) {
        const input = interaction.options.getString('input');
        const input2 = interaction.options.getString('input2');
        await interaction.reply(`You said: ${input} and ${input2}`);
    }
};
