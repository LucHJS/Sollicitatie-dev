const { Discord, ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');

module.exports.run = async (client, interaction) => {

    const query = interaction.options.get("song").value
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) return interaction.reply({ content: 'Je moet in een voice channel zitten', ephemeral: true });
    await interaction.reply({ content: 'Song added', ephemeral: true })

    client.DisTube.play(voiceChannel, query, { 
        textChannel: interaction.channel,
        member: interaction.member
    });
    
 

     
    
}



module.exports.help = {
    name: 'play'
}