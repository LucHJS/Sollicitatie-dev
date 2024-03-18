
const Discord = require('discord.js');

const config = require('../../config.json')
module.exports.run = async (client, interaction) => {

   

    const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
        .setTitle(`🎫・${interaction.guild.name} Support Tickets`)
        .setDescription('Heb je vragen over de bot, wil je solliciteren of partner worden? Maak dan een ticket aan!\n\n**:question:・Hoe kan ik een ticket aanmaken?\n**Klik op het vervolgkeuzemenu en kies waarvoor je een ticket wilt aanmaken. Als je op de optie klikt, maakt hij direct een ticket aan!\n\n**:exclamation:・Let op**\nMaak geen onnodige tickets of meerdere tickets!')
        .setColor(`${config.embedColor}`)
     
        .setTimestamp();

    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('ticket_menu')
                .setPlaceholder('❌・Nothing selected  ')
                .addOptions([
                    {
                        label: 'Vraag',
                        description: 'Vraag Option',
                        value: 'support_option',
                        emoji: '❓'
                    },
                    {
                        label: 'Sollicitatie', 
                        description: 'Maak een sollicitatie ticket',
                        value: 'sollicitatie_option',
                        emoji: '💼'
                    },
                    {
                        label: 'Partner', 
                        description: 'Wordt Partner',
                        value: 'partner_option',
                        emoji: '🤝'
                    },
                    
                ]),
        );

        interaction.reply({ embeds: [embed], components: [row] })

}



module.exports.help = {
    name: 'panel'
}