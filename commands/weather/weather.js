require('dotenv').config();

const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

// const fetch = require('node-fetch');
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
        
        var city = weatherData.location.name;
        var state = weatherData.location.region;
        var country = weatherData.location.country;
        var temp = weatherData.current.temp_f;
        var feelsLike = weatherData.current.feelslike_f;
        var conditionText = weatherData.current.condition.text;
        var conditionIcon = weatherData.current.condition.icon;
        var humidity = weatherData.current.humidity;
        
        const { avatar } = await request(interaction.user.displayAvatarURL({ extension: 'png' }));

        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Weather for ' + city + ', ' + state + ', ' + country)
            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            // .setDescription('Some description here')
            .setThumbnail('https:' + conditionIcon)
            .addFields(
                { name: 'It is currently', value: temp + '°F', inline: false },
                { name: 'It feels like', value: feelsLike + '°F', inline: false },
                // { name: '\u200B', value: '\u200B' },
                { name: 'Condition', value: conditionText, inline: false },
                { name: 'Humidity', value: humidity + '%', inline: false },
            )
            // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            // .setImage('https:' + conditionIcon)
            .setTimestamp()
            .setFooter({ text: 'Requested by ' + interaction.user.username, iconURL: avatar });

        
        await interaction.reply({embeds: [exampleEmbed]});
    },
};