const {SlashCommandBuilder, ButtonBuilder, ButtonStyle ,ActionRowBuilder} = require('discord.js');
const {rps} = require('C:\\Users\\Izzy\\Desktop\\BaraBot\\commands\\fun\\rpsLogic.js');

const data = new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play rock paper scissors with the bot! 🪨 📄 ✂️');
module.exports = {
    data: data,
    async execute(interaction) {

		const rock = new ButtonBuilder( {
            label: 'Rock',
            style: ButtonStyle.Primary,
            customId: 'rock',
            emoji: '🪨'
        })

        const paper = new ButtonBuilder( {
            label: 'Paper',
            style: ButtonStyle.Primary,
            customId: 'paper',
            emoji: '📄'
        })

        const scissors = new ButtonBuilder( {
            label: 'Scissors',
            style: ButtonStyle.Primary,
            customId: 'scissors',
            emoji: '✂️'
        })

		const row = new ActionRowBuilder()
			.addComponents(rock, paper, scissors);

		const response = await interaction.reply({
			content: `Rock, Paper, Scissors, Shoot!`,
			components: [row],
		});


        // collect responses
        const filter = i => i.user.id === interaction.user.id; // checks if the button press was from the command user
        try {
            const collector = await response.awaitMessageComponent({ filter: filter, time: 15000}) 
            
            if (collector.customId === 'rock') {
                await collector.update({ content: 'You chose rock!\n' + rps(collector.customId), components: [] });
            } else if (collector.customId === 'paper') {
                await collector.update({ content: 'You chose paper!\n' + rps(collector.customId), components: [] });
            } else if (collector.customId === 'scissors') {
                await collector.update({ content: 'You chose scissors!\n' + rps(collector.customId), components: [] });
            }
        } catch (error) {
            await interaction.editReply({ content: 'You took too long to respond!', components: [] }); // idk if this will do anything tbh
        }

    }
};