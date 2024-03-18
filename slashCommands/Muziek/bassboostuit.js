const {Discord, EmbedBuilder} = require('discord.js');
const config = require('../../config.json')

module.exports.run = async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });
    const voiceChannel = interaction.member.voice.channel

    const queue = client.DisTube.getQueue(voiceChannel);
    if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
    const { channel } = interaction.member.voice;
    if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

    queue.filters.remove("bassboost")

    const embed = new EmbedBuilder()
        .setAuthor({ name: '✅ Turned off: Bassboost'})
        .setColor(config.embedColor);

    
    interaction.editReply({ content: ' ', embeds: [embed] })


}

module.exports.help = {
    name: 'bassboostremove'
}