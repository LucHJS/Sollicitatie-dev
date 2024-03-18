const Discord = require('discord.js');
const schema = require('../../Shema/reactionmodels')
const config = require('../../config.json')

module.exports.run = async (client, interaction) => {

    
    
    const guildData = await schema.findOne({
        guildId: interaction.guild.id,
    })
    
    if (!guildData?.roles) return interaction.reply(`er is geen rol in de server`)
    
    const options = guildData.roles.map(x => {
        const role = interaction.guild.roles.cache.get(x.roleId);

        return {
            label: role.name,
            value: role.id,
            description: x.roledesciption || 'Geen Beschrijving',
            emoji: x.emoji.id


        }

    })

    if(options.length != 4) return interaction.reply({content: "Je moet nog een rol toevoegen wil je de panel kunnen sturen! (er moeten 4+ rollen toegevoegd zijn voordat je de panel kan laten werken)", ephemeral: true})

    const panelembed = new Discord.EmbedBuilder()
        .setColor(config.embedColor)
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
        .setTitle('🌴 | Daily Café Reactie rollen')
        .setDescription("Wil jij nou een ping rol of iets anders kijk dan welke rollen jij kan krijgen!")
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
        .setTimestamp()
   

       const components = new Discord.ActionRowBuilder()
            .setComponents(
                new Discord.SelectMenuBuilder()
                    .setCustomId('reaction-roles')
                    .setMaxValues(4)
                    .addOptions(options))
    

    interaction.reply({embeds: [panelembed], components: [components]})
}



module.exports.help = {
    name: 'reaction-panel'
}