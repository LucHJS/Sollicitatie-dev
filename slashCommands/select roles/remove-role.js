const Discord = require('discord.js');
const schema = require('../../Shema/reactionmodels')
const config = require('../../config.json')


module.exports.run = async (client, interaction) => {

    const role = interaction.options.getRole("role")
  
    const guildData = await schema.findOne({
        guildId: interaction.guild.id,

    })
    if(!guildData) return interaction.reply(`er is geen rol in de server`)

    const guildRoles = guildData.roles

    const findRole = guildRoles.find(x => x.roleId === role.id)
    if(!findRole) return interaction.reply("die rol is niet toegevoegd bij de reaction roles")

    const filteredRoles = guildRoles.filter(x => x.roleId !== role.id)
    guildData.roles = filteredRoles

    await guildData.save()

    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
    .setTitle('🌴 | Daily Café Reactie rollen')
    .addFields(
        { name: '**📝 | Rol Verwijdert**', value: `De rol is Verwijdert` },
        { name: `**📕 | Naam van rol: **`, value: `${role.name}` },
        { name: '**🌐 | Id van de rol:**', value: `${role.id}` }
    )
    .setTimestamp()
    .setThumbnail(interaction.guild.iconURL())
    .setColor(config.embedColor)
    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })

    await interaction.reply({embeds: [embed]})

}



module.exports.help = {
    name: 'remove-role1'
}