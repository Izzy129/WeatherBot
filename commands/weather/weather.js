require('dotenv').config();
const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { request } = require('undici');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Check the weather in your area!')
        .addStringOption(option =>
            option.setName('area')
                .setDescription('Enter US Zipcode, UK Postcode, Canada Postalcode, city name, Lat/Long, or IP (IPv4/IPv6)')
                .setRequired(true)
        ), 
    async execute(interaction) {
        

        const weatherResult = await request('https://api.weatherapi.com/v1/current.json?key=' + process.env.WEATHER_API_KEY + '&q=' + interaction.options.getString('area') + '&aqi=no');
        const weatherData = await weatherResult.body.json();
        
        const city = weatherData.location.name;
        const state = weatherData.location.region;
        const country = weatherData.location.country;
        const temp = weatherData.current.temp_f;
        const feelsLike = weatherData.current.feelslike_f;
        const conditionText = weatherData.current.condition.text;
        const conditionIcon = weatherData.current.condition.icon;
        const humidity = weatherData.current.humidity;
        
        const { avatar } = await request(interaction.user.displayAvatarURL({ extension: 'png' }));

        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Weather for ' + city + ', ' + state + ', ' + country)
            .setThumbnail('https:' + conditionIcon)
            .addFields(
                { name: 'It is currently', value: temp + '°F', inline: false },
                { name: 'It feels like', value: feelsLike + '°F', inline: false },
                { name: 'Condition', value: conditionText, inline: false },
                { name: 'Humidity', value: humidity + '%', inline: false },
            )
            .setTimestamp()
            .setFooter({ text: 'Requested by ' + interaction.user.username, iconURL: avatar });

        await interaction.reply({embeds: [exampleEmbed]});
    },
};