const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require("../../config/embed.json")
  let passwords = [
    "111111",
    "123123",
    "12345",
    "123456",
    "1234567",
    "12345678",
    "123456789",
    "1234567890",
    "111111",
    "222222",
    "55555",
    "666666",
    "1q2w3e,",
    "1qaz2wsx",
    "aaaaaa",
    "abcd",
    "abcdef",
    "abc123",
    "aa123456",
    "admin123",
    "arsenal",
    "bismillah",
    "computer",
    "cookie",
    "iloveyou",
    "liverpool",
    "monkey",
    "password",
    "password1",
    "passw0rd",
    "pussy,",
    "princess",
    "qwerty123.",
    "sunshine",
    "superman",
    "whatever",
    "welcome",
    "YNTKTS",
    "zxcvbnmm",
    "zaq1zaq1"
  ];
  let ips = [
    "10.313.523.502.00.1",
    "25.537.753.462.29.2",
    "21.175.866.974.07.08",
    "32.653.587.825.35.5",
    "12.172.764.781.22.8",
    "91.723.242.452.09.3",
    "92.743.116.896.85.6",
    "84.091.000.853.54.7",
    "51.071.124.129.12.0",
  ];
module.exports = {
    name: 'hack',
    aliases: [],
    category: 'Fun',
    memberpermissions: [],
    cooldown: 5,
    description: 'Hack user',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let taggedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!taggedUser) return message.channel.send("Tag the person who you want to hack!");
        const answer = `${taggedUser.nickname ? taggedUser.nickname: taggedUser.user.username}@gmail.com`
        const passwrd = passwords[Math.floor(Math.random() * passwords.length)];
        const ip = ips[Math.floor(Math.random() * ips.length)];
        function wait(ms) {
            let start = new Date().getTime();
            let end = start;
            while (end < start + ms) {
              end = new Date().getTime();
            }
          }
          message.channel.send(`Hacking  \`${taggedUser.user.tag}\`...`);
          message.channel.send("Status: ■□□□□□□□□□□ 0%").then((msg) => {
            wait(200);
            msg.edit("Status: ■■□□□□□□□□□ 7%: Hacking Email...");
            wait(600);
            msg.edit(
              `Status: ■■■□□□□□□□□ 8%:\n \`Email: ${taggedUser.nickname ? taggedUser.nickname: taggedUser.user.username}@yousuck.noob\`\n \`Password: ${passwrd}\` `
            );
            wait(600);
            msg.edit("Status: ■■□□□□□□□□□ 9%: Logging in to the Email...");
            wait(2000);
            msg.edit("Status: ■■■□□□□□□□□ 12%: Turning off the antivirus");
            wait(1000);
            msg.edit("Status: ■■■■□□□□□□□ 14%: Downloading Virus...");
            wait(100);
            msg.edit("Status: ■■■□□□□□□□□ 17%: Deleting Captcha...");
            wait(100);
            msg.edit("Status: ■■□□□□□□□□□ 20%: Deleting Paypal account...");
            wait(10);
            msg.edit("Status: ■■■□□□□□□□□ 21%");
            wait(12);
            msg.edit("Status: ■■■■□□□□□□□ 22%");
            wait(100);
            msg.edit("Status: ■■■■■□□□□□□ 24%: Paypal account deleted");
            wait(1000);
            msg.edit("Status: ■■■■□□□□□□□ 29%: Hacking is almost ready...");
            wait(80);
            msg.edit("Status: ■■■□□□□□□□□ 31%");
            wait(80);
            msg.edit("Status: ■■■■□□□□□□□ 36%");
            wait(40);
            msg.edit("Status: ■■■■■□□□□□□ 41%");
            wait(60);
            msg.edit("Status: ■■■■□□□□□□□ 47%");
            wait(50);
            msg.edit("Status: ■■■■■■□□□□□ 53%");
            wait(3000);
            msg.edit(
              `Status: ■■■■■■■□□□□ 58%: Email password changed so ${taggedUser.nickname ? taggedUser.nickname: taggedUser.user.username} can not login`
            );
            wait(500);
            msg.edit("Status: ■■■■■■□□□□□ 66%");
            wait(60);
            msg.edit("Status: ■■■■■□□□□□□ 74%");
            wait(20);
            msg.edit(`Status: ■■■■■□□□□□□ 79%: IP address found: ${ip}`);
            wait(83);
            msg.edit("Status: ■■■■■■□□□□□ 80%");
            wait(50);
            msg.edit("Status: ■■■■■■■□□□□ 85%");
            wait(14);
            msg.edit("Status: ■■■■■■■■■□□ 93%");
            wait(70);
            msg.edit("Status: ■■■■■■■■■■□ 97%");
            wait(90);
            msg.edit("Status: ■■■■■■■■■■■ 100%").then((m) => {
              const embed = new MessageEmbed()
                .setTitle("Hacking success!😱")
                .setThumbnail(taggedUser.displayAvatarURL({dynamic: true}))
                .setDescription(`\`${taggedUser.user.tag}\` has been hacked!`)
                .addField("INFO", "\`Information about the user that you hacked.\`")
                .addField("EMAIL", `\`${answer}\``)
                .addField("PASSWORD", `\`${passwrd}\``)
                .addField("IP address", `\`${ip}\``)
                .setFooter({text: "It is for fun!"})
                .setColor(ee.color);
                m.delete();
              message.reply({embeds: [embed]});
            });
          });
    }
}