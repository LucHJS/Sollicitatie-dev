const Discord = require('discord.js');
const schema = require('../../Shema/reactionmodels')
const config = require('../../config.json')
module.exports.run = async (client, interaction) => {

    const role = interaction.options.getRole("role")
    const roledesciption = interaction.options.getString("description") || null
    const emoji = interaction.options.getString("emoji") || "🌴"


    const guildData = await schema.findOne({
        guildId: interaction.guild.id,

    })

    const newrole = {
        roleId: role.id,
        roledesciption,
        emoji,

    }

    if (guildData) {
        const roleData = guildData.roles.find((x) => x.roleId === role.id)

        if (roleData) {
            roleData = newrole;
        } else {
            guildData.roles = [...guildData.roles, newrole]
        }

        await guildData.save()
    } else {
        await schema.create({
            guildId: interaction.guild.id,
            roles: newrole
        })
    }
    const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
        .setTitle('🌴 | Daily Café Reactie rollen')
        .addFields(
            { name: '**📝 | Rol toegevoegd**', value: `De rol is toegevoegd` },
            { name: `**📕 | Naam van rol: **`, value: `${role.name}` },
            { name: '**🌐 | Id van de rol:**', value: `${role.id}` },
            { name: '📃 | Description:', value: `${roledesciption}` },
            { name: '📨 | Emoji', value: `${emoji}` }
        )
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setColor(config.embedColor)
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
    interaction.reply({ embeds: [embed] })

}



module.exports.help = {
    name: 'add-role'
}