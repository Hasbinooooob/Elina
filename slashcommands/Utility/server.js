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
          function trimArray(arr, maxLen = 20) {
            if ([...arr.values()].length > maxLen) {
              const len = [...arr.values()].length - maxLen;
              arr = [...arr.values()].sort((a, b) => b?.rawPosition - a.rawPosition).slice(0, maxLen);
              arr.map(role => `<@&${role.id}>`)
              arr.push(`${len} more...`);
            }
            return arr.join("  ");
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
            const nsfwLevels = {
              DEFAULT: "Default",
              EXPLICIT: "Explicit",
              SAFE: "Safe",
              AGE_RESTRICTED: "Age Restricted"
          }
            let emoji = interaction.guild.emojis.cache;
            let guildDescription = interaction.guild.description
                ? interaction.guild.description
                : "`none`";
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
                .addFields({name: "❱ Owner", value: `${owner}\n\`${owner.tag}\``, inline: true})
                .addFields({name: "❱ Description", value: `\`${guildDescription}\``, inline: true})
                .addFields({name: "❱ Created at", value: "\`" + moment(interaction.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(interaction.guild.createdTimestamp).format("hh:mm:ss") + "`", inline: true})
                .addFields({name: "❱ All Channels", value: "\`" + interaction.guild.channels.cache.size + "\`", inline: true})
                .addFields({name: "❱ Category Channels", value: "\`" + interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_CATEGORY").size + "\`", inline: true})
                .addFields({name: "❱ Text Channels", value: "\`" + interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size + "\`", inline: true})
                .addFields({name: "❱ Voice Channels", value: "\`" + interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size + "\`", inline: true})
                .addFields({name: "❱ Total Members", value: `\`${interaction.guild.memberCount} / ${interaction.guild.maximumMembers}\``, inline: true})
                .addFields({name: "❱ Total Humans", value: " \`" + interaction.guild.members.cache.filter(member => !member.user.bot).size + "\`", inline: true})
                .addFields({name: "❱ Total Bots", value: "\`" + interaction.guild.members.cache.filter(member => member.user.bot).size + "\`", inline: true})
                .addFields({name: "❱ ONLINE", value: "\`" + interaction.guild.members.cache.filter(member => member.presence && member.presence && member.presence.status != "offline").size + "\`", inline: true})
                .addFields({name: "❱ OFFLINE", value: "\`" + interaction.guild.members.cache.filter(member => !member.presence || member.presence && member.presence.status == "offline").size + "\`", inline: true})
                .addFields({name: "❱ Total Boosts",  value: "\`" + interaction.guild.premiumSubscriptionCount + "\`", inline: true})
                .addFields({name: "❱ Boost Level", value: "\`" + boostlevel + "\`", inline: true})
                .addFields({name: "❱ Verification Level", value: `\`${verificationLevels[interaction.guild.verificationLevel]}\``, inline: true})
                .addFields({name: "❱ NSFW Level", value: `\` ${nsfwLevels[interaction.guild.nsfwLevel]} \``, inline: true})
                .addFields({name: "❱ Max-Talk-Bitrate", value: "\`" + maxbitrate + " kbps\`", inline: true})
                .addFields({name: `❱ [${interaction.guild.emojis.cache.size}] Emojis: `, value: `**Regular: ${emoji.filter(emo => !emo.animated).size}\nAnimated: ${emoji.filter(em => em.animated).size}**`, inline: true})
                .addFields({name: `❱ Stickers`, value: `\` ${interaction.guild.stickers.cache.size} \``, inline: true})
                .addFields({name: `❱ [${interaction.guild.roles.cache.size}] Roles: `, value: `${interaction.guild.roles.cache.size < 20 ? interaction.guild.roles.cache.filter((roles) => roles.id !== interaction.guild.id).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(", ") : interaction.guild.roles.cache.size > 20 ? trimArray(interaction.guild.roles.cache) : '`None`'}`})
                .setThumbnail(interaction.guild.iconURL({ dynamic: true}))
                .setFooter({text: "ID: " + interaction.guild.id, iconURL: interaction.guild.iconURL({ dynamic: true })})
                if(!interaction.guild.banner) {
                    interaction.followUp({embeds: [embed]})
                } else {
                    embed.setImage(interaction.guild.fetch(true).then(async g => g.bannerURL({size: 4096})))
                    interaction.followUp({embeds: [embed]})
                }
        }
        if(interaction.options.getSubcommand() === "icon") {

        let guild = interaction.guild
        let embed = new MessageEmbed()
        .setTitle(`${guild.name} Icon`)
        .setImage(guild.iconURL({dynamic: true, size: 4096}))
        .addFields([
          {
              name: "❱ PNG",
              value: `[\`LINK\`](${guild.iconURL({ format: "png", size: 4096 })})`,
              inline: true
          },
          {
              name: "❱ JPG",
              value: `[\`LINK\`](${guild.iconURL({ format: "jpg", size: 4096 })})`,
              inline: true
          },
          {
              name: "❱ JPEG",
              value: `[\`LINK\`](${guild.iconURL({ format: "jpg", size: 4096 })})`,
              inline: true
          },
          {
              name: "❱ WEBP",
              value: `[\`LINK\`](${guild.iconURL({ format: "webp", size: 4096 })})`,
              inline: true
          }
      ])
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
