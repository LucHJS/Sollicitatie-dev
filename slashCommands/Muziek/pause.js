const { Discord, ApplicationCommandOptionType } = require('discord.js');

module.exports.run = async (client, interaction) => {

    
    const voiceChannel = interaction.member.voice.channel
    const queue = client.DisTube.getQueue(voiceChannel)
    console.log(queue.song)
    if (!queue) return interaction.reply(`❌ | Er staat nu niets in de wachtrij!`)
    client.DisTube.pause(voiceChannel)
    interaction.reply(`⏸ | op pauze gezet!`)


}



module.exports.help = {
    name: 'pause'
}