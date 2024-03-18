const { Discord, ApplicationCommandOptionType } = require('discord.js');

module.exports.run = async (client, interaction) => {

    
    const voiceChannel = interaction.member.voice.channel
    const queue = client.DisTube.getQueue(voiceChannel)
    if (!queue) return interaction.reply(`❌ | Er staat nu niets in de wachtrij!`)
    client.DisTube.skip(voiceChannel)

    interaction.reply(`⏩ | Geskipt!`)

}



module.exports.help = {
    name: 'skip'
}