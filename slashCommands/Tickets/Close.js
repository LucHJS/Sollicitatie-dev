const {Discord, EmbedBuilder, PermissionsBitField} = require('discord.js');
const config = require('../../config.json')
const { createTranscript } = require('discord-html-transcripts')

module.exports.run = async (client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply("Jij kan deze ticket niet closen omdat je geen permissions hebt in dezze server")
    
    

    // require the logs
    const logChannel = interaction.guild.channels.cache.get(config.tickets.logs)

    // make the transcript
    const transcriptFile = await createTranscript(interaction.channel, {
        limit: -1,
        fileName: `${interaction.channel.name}.html`,
        returnBuffer: false
        
    });

    // send a succes message
    interaction.reply(`✅ | Ticket is gesloten door <@${interaction.user.id}> en wordt over 5 seconden gesloten!` , interaction)


    // send the logs
    const logEmbed = new EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
        .setTitle("🗑・gesloten")
        .setDescription("Er is een ticket gesloten!")
        .addFields(
            {
                name: `📃・Gesloten Door:`,
                value: `<@${interaction.user.id}>`
            },
            {
                name: "❓・kanaal",
                value: `${interaction.channel.name}`
            })
        .setColor(config.embedColor)
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
        .setTimestamp();

    logChannel.send({ embeds: [logEmbed] })
    logChannel.send({ files: [transcriptFile] })

    setTimeout(function () {
        interaction.channel.delete()
    }, 5000);
}









module.exports.help = {
    name: 'close'
}