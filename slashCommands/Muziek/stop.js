const Discord = require('discord.js');

module.exports.run = async (client, interaction) => {

    const voiceChannel = interaction.member.voice.channel
    const queue = client.DisTube.getQueue(voiceChannel)
    if (!queue) return interaction.reply(`❌ | Er staat nu niets in de wachtrij!`)
    queue.stop()
    interaction.reply(`⏹ | Gestopt!`)

 


}



module.exports.help = {
    name: 'stop'
}