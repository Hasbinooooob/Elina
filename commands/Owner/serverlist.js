const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'serverlist',
    aliases: [''],
    category: ' ',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            const owner = "779348805920227358";

            if (owner.includes(message.author.id) === false) {
                return;
            }
            //code
            const bot = client;
            let i0 = 0;
            let i1 = 10;
            let page = 1;

            let description =
                `Total Servers - ${bot.guilds.cache.size}\n\n` +
                bot.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(r => r)
                    .map(
                        (r, i) =>
                            `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id
                            }\nLink Owner - [\`${client.users.cache.get(r.ownerId).tag}\`](https://discordapp.com/users/${r.ownerId}/)`
                    )
                    .slice(0, 10)
                    .join("\n\n");

            let embed =  new MessageEmbed()
 .setColor(ee.color)
                .setAuthor(bot.user.tag, bot.user.displayAvatarURL({ dynamic: true }))

                .setColor("F037A5")
                .setFooter(`Page - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
                .setDescription(description);


            let kanan = new MessageButton()
            .setCustomId("serverlist_kanan")
            .setEmoji("954224609979424768")
            .setStyle("PRIMARY")

            let kiri = new MessageButton()
            .setCustomId("serverlist_kiri")
            .setEmoji("954224873499131964")
            .setStyle("PRIMARY")

            let trash = new MessageButton()
            .setCustomId("serverlist_sampah")
            .setEmoji("❌")
            .setStyle("SECONDARY")

            let row = new MessageActionRow()
            .addComponents([kiri, trash, kanan])

            let msg = await message.channel.send({embeds: [embed], components: [row]});

            

            

            let collector = msg.createMessageComponentCollector({filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id ,time: 60000, componentType: "BUTTON"})

            collector.on("collect", async (button) => {

                let custom = button.customId

                if(button.user.id !== config.ownerID) return button.reply({ephemeral: true, content: `you can't use this button`})

                switch (custom) {
                    case "serverlist_kiri":


                        i0 = i0 - 10;
                        i1 = i1 - 10;
                        page = page - 1;
                        // if there is no guild to display, delete the message
                        if (i0 + 1 < 0) {
                            console.log(i0);
                            return button.reply({ephemeral: true, content: "nope"})
                        }
                        description =
                            `Total Servers - ${bot.guilds.cache.size}\n\n` +
                            bot.guilds.cache
                                .sort((a, b) => b.memberCount - a.memberCount)
                                .map(r => r)
                                .map(
                                    (r, i) =>
                                        `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id
                                        }\nLink Owner - [\`${client.users.cache.get(r.ownerId).tag}\`](https://discordapp.com/users/${r.ownerId}/)`
                                )
                                .slice(i0, i1)
                                .join("\n\n");
    
                        // Update the embed with new informations
                        embed
                            .setFooter({text: `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`})
                            .setDescription(description);
    
                        // Edit the message
                        button.update({embeds: [embed]});
                        
                    break;

                    case "serverlist_kanan":

                        i0 = i0 + 10;
                        i1 = i1 + 10;
                        page = page + 1;
                        if (i1 > bot.guilds.cache.size + 10) {
                            return button.reply({ephemeral: true, content: "gak ada kak"})
                        }
                        if (!i0 || !i1) {
                            return button.reply({ephemeral: true, content: "gak ada kak"})
                        }
                        description =
                            `Total Servers - ${bot.guilds.cache.size}\n\n` +
                            bot.guilds.cache
                                .sort((a, b) => b.memberCount - a.memberCount)
                                .map(r => r)
                                .map(
                                    (r, i) =>
                                        `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id
                                        }\nLink Owner - [\`${client.users.cache.get(r.ownerId).tag}\`](https://discordapp.com/users/${r.ownerId}/)`
                                )
                                .slice(i0, i1)
                                .join("\n\n");
    
                        // Update the embed with new informations
                        embed
                            .setFooter(
                                `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
                            )
                            .setDescription(description);
    
                        // Edit the message
                        button.update({embeds: [embed]});



                    break;

                    case "serverlist_sampah":

                    button.reply({ephemeral: true, content: "this message will be deleted for 1 minute"})

                    collector.stop()

                    break
                
                    default:
                        console.log(custom)
                    break;
                }
                
            });

            collector.on("end", () => {

                try {

            let kanan_2 = new MessageButton()
            .setCustomId("serverlist_kanan")
            .setEmoji("954224609979424768")
            .setStyle("SECONDARY")
            .setDisabled(true)

            let kiri_2 = new MessageButton()
            .setCustomId("serverlist_kiri")
            .setEmoji("954224873499131964")
            .setStyle("SECONDARY")
            .setDisabled(true)

            let trash_2 = new MessageButton()
            .setCustomId("serverlist_sampah")
            .setEmoji("❌")
            .setStyle("SECONDARY")
            .setDisabled(true)

            let row_2 = new MessageActionRow()
            .addComponents([kiri_2, trash_2, kanan_2])


            msg.edit({components: [row_2]})

            setTimeout(() => {
                msg.delete()
            }, 60000);
                    
                } catch (error) {
                    console.log(error.stack)
                }

            

            
                
            })

        } catch (e) {
            console.log(e.stack)
            message.channel.send({embeds: [new MessageEmbed()
                .setColor("F037A5")
                .setDescription(e.message)]})

        }
    }
}