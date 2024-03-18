const client = require('../index')

client.on("interactionCreate", async (interaction, message) => {


    if(interaction.isStringSelectMenu()){
        if(interaction.customId !== 'reaction-roles') return
        const roleId = interaction.values[0]
        const role = interaction.guild.roles.cache.get(roleId)
        const memberRoles = interaction.member.roles
        const hasRole = memberRoles.cache.find(r => r.id === roleId)
        console.log(roleId)

        if(hasRole){
            interaction.member.roles.remove(roleId)
            interaction.reply({content: `✅ | ${role.name} is verwijdert bij jou`, ephemeral: true})
        }else{
            interaction.member.roles.add(roleId)
            interaction.reply({content:`✅ | ${role.name} is toegevoegd bij jou`, ephemeral: true})
        }
    }
})