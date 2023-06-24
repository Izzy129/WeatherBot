//slash command with discord.js v13 to kick a member

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user.'),  
    
        async execute(interaction) {
            //checks if the user has permission to kick members
            if (!interaction.member.permissions.has('KICK_MEMBERS')) {
                return await interaction.reply({ content: 'You do not have permission to kick members.' });
            }
            //checks if the user has permission to kick members
            if (!interaction.guild.me.permissions.has('KICK_MEMBERS')) {
                return await interaction.reply({ content: 'I do not have permission to kick members.' });
            }
            //gets the user to kick
            const user = interaction.options.getMember('user');
            //checks if the user is kickable
            if (!user.kickable) {
                return await interaction.reply({ content: 'This user is not kickable.' });
            }
            //gets the reason for the kick
            const reason = interaction.options.getString('reason') || 'No reason provided.';
            //kicks the user
            await user.kick(reason);
            //sends a message to the interaction channel
            await interaction.reply({ content: `Kicked ${user} for ${reason}` });
    },
};