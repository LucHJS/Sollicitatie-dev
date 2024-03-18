const {Discord, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const cooldown = new Set();
const daysUntilChristmas = require("days-until-christmas");
const client = require('..');
const config = require('../config.json')
module.exports.run = async (client, message, args, prefix) => {

           
            const embed = new EmbedBuilder()
                
                .setTitle('🌴 Daily Café | Partner Formulier')
                .setDescription(`🌴 Daily Café | 2.0 | Partner Formulier
                ➥ Leuk dat je wilt Partneren met 🌴 Daily Café | 2.0, om een zo goed mogelijk beeld te krijgen van u server zouden wij het fijn vinden als u de onderstaande vragen zo goed mogelijk invult:
                
                ➥ Server Naam?
                ➥ Hoelang bestaat de server?
                ➥ Waarom een Partnership met 🌴 Daily Café | 2.0?
                ➥ Welke voordelen ziet u in deze Partnership?
                
                ➥ Geen StaffLeden taggen na het invullen! Succes`)
                .setColor(config.embedColor)
    

            message.channel.send({embeds: [embed]})

      
        
       
}

module.exports.help = {
    name: 'partner',
    aliases: [],
    timeout: 2000
}