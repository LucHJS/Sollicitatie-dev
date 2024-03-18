
const { Discord, GuildMemberManager,PermissionsBitField, ChannelType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const client = require('../index')
const { Permissions } = require('discord.js')

const fs = require('fs')




const config = require('../config.json')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const { createTranscript } = require('discord-html-transcripts');

client.on("interactionCreate", async (interaction, message) => {




    // require the logs
    const logChannel = interaction.guild.channels.cache.get(config.tickets.logs)


    if (interaction.isStringSelectMenu()) {

        if (interaction.values[0] === 'sollicitatie_option') {

            const everyrole = interaction.guild.roles.cache.find(x => x.name === "@everyone").id;
            interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: `Sollicitatie・${interaction.user.username}`,

                parent: config.tickets.solicitatie,
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: everyrole,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: config.tickets.support,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                    },


                ],
            }).then(async c => {

                const embed = new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・Nieuwe Ticket!')
                    .setDescription(`Uw ticket is succesvol geopend! <#${c.id}>`)
                    .setColor(`${config.embedColor}`)
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true })

                const embed1 = new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・New Ticket!')
                    .setDescription(`<@${interaction.user.id}>, Het Support Team van **${interaction.guild.name}** helpt je zo snel mogelijk`)
                    .addFields({ name: '❓・Onderwerp:', value: 'Wil Solliciteren' })
                    .setColor(`${config.embedColor}`)
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('options_ticket_menu')
                            .setPlaceholder('❌・Niets geselecteerd')
                            .addOptions([
                                {
                                    label: 'Close',
                                    description: 'Close the ticket',
                                    value: 'close_option',
                                    emoji: '🔒'
                                },
                                {
                                    label: 'Claim',
                                    description: 'Claim a ticket',
                                    value: 'claim_option',
                                    emoji: '👋'
                                },
                            ]),
                    )
                await c.send({ content: `${interaction.user}, <@&${config.tickets.support}>` })
                await c.send({ embeds: [embed1], components: [row1] })
            }
            )
        }

        if (interaction.values[0] === 'partner_option') {

            const everyrole = interaction.guild.roles.cache.find(x => x.name === "@everyone").id;
            interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: `Partner・${interaction.user.username}`,

                parent: config.tickets.partner,
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: everyrole,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: config.tickets.support,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                    },


                ],
            }).then(async c => {

                const embed = new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・Nieuwe Ticket!')
                    .setDescription(`Uw ticket is succesvol geopend! <#${c.id}>`)
                    .setColor(`${config.embedColor}`)
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true })

                const embed1 = new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・New Ticket!')
                    .setDescription(`<@${interaction.user.id}>, Het Support Team van **${interaction.guild.name}** helpt je zo snel mogelijk`)
                    .addFields({ name: '❓・Onderwerp:', value: 'Wil Partner worden' })
                    .setColor(`${config.embedColor}`)
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('options_ticket_menu')
                            .setPlaceholder('❌・Niets geselecteerd')
                            .addOptions([
                                {
                                    label: 'Close',
                                    description: 'Close the ticket',
                                    value: 'close_option',
                                    emoji: '🔒'
                                },
                                {
                                    label: 'Claim',
                                    description: 'Claim a ticket',
                                    value: 'claim_option',
                                    emoji: '👋'
                                },
                            ]),
                    )
                await c.send({ content: `${interaction.user}, <@&${config.tickets.support}>` })
                await c.send({ embeds: [embed1], components: [row1] })
            }
            )
        }


        if (interaction.values[0] === 'support_option') {

            const everyrole = interaction.guild.roles.cache.find(x => x.name === "@everyone").id;
            interaction.guild.channels.create({
                type: ChannelType.GuildText,
                name: `Support・${interaction.user.username}`,

                parent: config.tickets.vragen,
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: everyrole,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: config.tickets.support,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                    },


                ],
            }).then(async c => {

                const embed = new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・Nieuwe Ticket!')
                    .setDescription(`Uw ticket is succesvol geopend! <#${c.id}>`)
                    .setColor(`${config.embedColor}`)
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true })

                const embed1 = new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・Nieuwe Ticket!')
                    .setDescription(`<@${interaction.user.id}>, Het Support team van **${interaction.guild.name}** helpt je zo snel mogelijk`)
                    .addFields({ name: '❓・Onderwerp:', value: 'Heb een vraag/heb support nodig' })
                    .setColor(`${config.embedColor}`)
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('options_ticket_menu')
                            .setPlaceholder('❌・None selected')
                            .addOptions([
                                {
                                    label: 'Close',
                                    description: 'Close the ticket',
                                    value: 'close_option',
                                    emoji: '🔒'
                                },
                                {
                                    label: 'Claim',
                                    description: 'Claim a ticket',
                                    value: 'claim_option',
                                    emoji: '👋'
                                },
                            ]),
                    )
                await c.send({ content: `${interaction.user}, <@&${config.tickets.support}>` })
                await c.send({ embeds: [embed1], components: [row1] })
            }
            )
        }
       

    }

    //=================== Ticket Select Menu ========================

    if (interaction.isStringSelectMenu()) {



        if (interaction.values[0] === "claim_option") {


             if (!interaction.guild.members.me.permissions.has(config.tickets.support)) return interaction.reply("ik heb geen perms")

            const embed_claim = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTitle('✋・Claimed')
                .setDescription(`U wordt nu geholpen door: ${interaction.user}`)
                .setColor(`${config.embedColor}`)
                .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTimestamp();

            interaction.deferUpdate()
            interaction.channel.send({ embeds: [embed_claim] })

        }


        if (interaction.values[0] === "close_option") {

            // make the transcript
            const transcriptFile = await createTranscript(interaction.channel, {
                limit: -1,
                fileName: `${interaction.channel.name}.html`,
                returnBuffer: false
            });


            // send a succes message
            interaction.reply(`Ticket is gesloten door <@${interaction.user.id}> en wordt over 5 seconden gesloten!`)

            const user = interaction.channel.topic
            const us = interaction.guild.members.cache.get(user)


            // send the logs
            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTitle("🗑・Gesloten")
                .setDescription("Er is een ticket gesloten!")
                .addFields(
                    {
                        name: `📃・Gesloten Door:`,
                        value: `<@${interaction.user.id}>`
                    },
                    {
                        name: "❓・Channel",
                        value: `${interaction.channel.name}`
                    })
                    .setColor(`${config.embedColor}`)
                .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTimestamp();

            logChannel.send({ embeds: [logEmbed] })
            logChannel.send({ files: [transcriptFile] })

            setTimeout(function () {
                interaction.channel.delete()
            }, 5000);
        }


    }
   

});


