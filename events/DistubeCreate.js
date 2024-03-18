const client = require('../index')
const { Discord, GuildMemberManager,PermissionsBitField, ChannelType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const { DisTube } = require('distube');
client.setMaxListeners(0);
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.DisTube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
});

client.DisTube

    .on('playSong', (queue, song) => {
        const embed = new EmbedBuilder()
            .setThumbnail(song.thumbnail)
            .setTitle('▶ | started playing')
            .setColor(client.Config.DistubeEmbedColor)
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\` requested by: **${song.user}**`)
        queue.textChannel.send({ embeds: [embed] })
    })

    .on('addList', (queue, playlist) => {

        const embed = new EmbedBuilder()

            .setThumbnail(playlist.thumbnail)
            .setTitle('▶ | song Added')
            .setColor(client.Config.DistubeEmbedColor)
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`[${playlist.name}](${playlist.url}) - \`${playlist.songs.length}\` requested by: **${playlist.user}**`)
        queue.textChannel.send({ embeds: [embed] })
    })

    .on('addSong', (queue, song) => {

        const embed = new EmbedBuilder()
            .setThumbnail(song.thumbnail)
            .setTitle('▶ | song Added')
            .setColor(client.Config.DistubeEmbedColor)
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\` requested by: **${song.user}**`)
        queue.textChannel.send({ embeds: [embed] })

    })

    .on('error', (channel, e) => {
        console.error(e)
    })



    .on('searchNoResult', (message, query) =>
        message.channel.send(` | Geen resultaat gevonden voor \`${query}\`!`)
    )

    .on('finish', queue => queue.textChannel.send('Alle liedjes zijn afgelopen en ik heb de voicechannel verlaten!'))

