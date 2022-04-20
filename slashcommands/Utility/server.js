const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
const moment = require("moment")

module.exports = {
  name: "server",
  description: "gets server info",
  type: 1,
  memberpermissions: [],
  options: [{
      name: "info",
      description: "server info",
      type: "SUB_COMMAND"
  },
{
    name: "icon",
    description: "get server icon",
    type: "SUB_COMMAND"
}],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {

        if(interaction.options.getSubcommand() === "info") {

            function trimArray(arr, maxLen = 40) {
                if ([...arr.values()].length > maxLen) {
                  const len = [...arr.values()].length - maxLen;
                  arr = [...arr.values()].sort((a, b) => b?.rawPosition - a.rawPosition).slice(0, maxLen);
                  arr.map(role => `<@&${role.id}>`)
                  arr.push(`${len} more...`);
                }
                return arr.join(", ");
              }

              

            
            await interaction.guild.members.fetch()
            function emojitrimarray(arr, maxLen = 20) {
                if (arr.length > maxLen) {
                    const len = arr.length - maxLen;
                    arr = arr.slice(0, maxLen);
                    arr.push(`${len} more...`);
                }
                return arr.join(", ");
            }

            const verificationLevels = {
                NONE: 'None',
                LOW: 'Low',
                MEDIUM: 'Medium',
                HIGH: 'High',
                VERY_HIGH: 'Very High'
            };

            let emoji = interaction.guild.emojis.cache;

            let guildDescription = interaction.guild.description
                ? interaction.guild.description
                : null;

                let role = interaction.guild.roles;

                


            let boosts = interaction.guild.premiumSubscriptionCount;
            var boostlevel = 0;
            if (boosts >= 2) boostlevel = "1";
            if (boosts >= 15) boostlevel = "2";
            if (boosts >= 30) boostlevel = "3 / ∞";
            let maxbitrate = 96000;
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;

            let owner = interaction.guild.members.cache.get(interaction.guild.ownerId)?.user
            let embed = new MessageEmbed()
                .setColor(ee.color)
                .setAuthor({name: "Server Information About: " + interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .addField("❱ Owner", `${owner}\n\`${owner.tag}\``, true)
                .addField("❱ Created On", "\`" + moment(interaction.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(interaction.guild.createdTimestamp).format("hh:mm:ss") + "`", true)
                .addField("❱ Category Channels", "\`" + interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_CATEGORY").size + "\`", true)
                .addField("❱ All Channels", "\`" + interaction.guild.channels.cache.size + "\`", true)
                .addField("❱ Text Channels", "\`" + interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size + "\`", true)
                .addField("❱ Voice Channels", "\`" + interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size + "\`", true)
                .addField("❱ Stage Channels", "\`" + interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_STAGE_VOICE").size + "\`", true)
                .addField("❱ Rules Channels",   `${interaction.guild.rulesChannel ? interaction.guild.rulesChannel : "`none`"}`, true)
                .addField("❱ Announcement Channels", `\` ${interaction.guild.channels.cache.filter((ch) => ch.type === "GUILD_NEWS").size} \``, true)
                .addField("❱ AFK Channels", `${interaction.guild.afkChannel ? interaction.guild.afkChannel : "`none`"}`, true)
                .addField("❱ Total Members", `\`${interaction.guild.memberCount} / ${interaction.guild.maximumMembers}\``, true)
                .addField("❱ Total Humans", " \`" + interaction.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
                .addField("❱ Total Bots", "\`" + interaction.guild.members.cache.filter(member => member.user.bot).size + "\`", true)
                .addField("❱ ONLINE", "\`" + interaction.guild.members.cache.filter(member => member.presence && member.presence && member.presence.status != "offline").size + "\`", true)
                .addField("❱ OFFLINE", "\`" + interaction.guild.members.cache.filter(member => !member.presence || member.presence && member.presence.status == "offline").size + "\`", true)
                .addField("❱ Total Boosts", "\`" + interaction.guild.premiumSubscriptionCount + "\`", true)
                .addField("❱ Boost Level", "\`" + boostlevel + "\`", true)
                .addField("❱ Verification Level", `\`${verificationLevels[interaction.guild.verificationLevel]}\``,true)
                .addField("❱ Max-Talk-Bitrate", "\`" + maxbitrate + " kbps\`", true)
                .addField(`❱ [${interaction.guild.emojis.cache.size}] Emojis: `, `**Regular: ${emoji.filter(emo => !emo.animated).size}\nAnimated: ${emoji.filter(em => em.animated).size}**`, true)
                .addField(`❱ Stickers`, `\` ${interaction.guild.stickers.cache.size} \``, true)
                .addField(`❱ [${interaction.guild.roles.cache.size}] Roles: `, interaction.guild.roles.cache.size < 25 ? interaction.guild.roles.cache.filter((roles) => roles.id !== interaction.guild.id).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(", ") : interaction.guild.roles.cache.size > 25 ? trimArray(interaction.guild.roles.cache) : 'None')
                .setThumbnail(interaction.guild.iconURL({ dynamic: true}))
                .setFooter({text: "ID: " + interaction.guild.id, iconURL: interaction.guild.iconURL({ dynamic: true })})
                if(!interaction.guild.banner) {
                    interaction.followUp({embeds: [embed]})
                } else {
                    embed.setImage(message.guild.fetch(true).then(async g => g.bannerURL({size: 4096})))
                    interaction.followUp({embeds: [embed]})
                }

        }
        if(interaction.options.getSubcommand() === "icon") {

        let guild = interaction.guild
        let embed = new MessageEmbed()
        .setTitle(`${guild.name} Icon`)
        .setImage(guild.iconURL({dynamic: true, size: 4096}))
        .addField("❱ PNG", `[\`LINK\`](${guild.iconURL({dynamic: true, size: 4096, format: "png"})})`, true)
        .addField("❱ JPG", `[\`LINK\`](${guild.iconURL({dynamic: true, size: 4096, format: "jpg"})})`, true)
        .addField("❱ JPEG", `[\`LINK\`](${guild.iconURL({dynamic: true, size: 4096, format: "jpeg"})})`, true)
        .addField("❱ WEBP", `[\`LINK\`](${guild.iconURL({dynamic: true, size: 4096, format: "webp"})})`, true)
        .setColor(ee.color)
        interaction.followUp({embeds: [embed]})
}
    } catch (error) {
      console.log(error.stack);
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`ERROR | An error occurred!`)
            .setDescription(`\`${error.message}\``),
        ],
      });
    }
  },
};
