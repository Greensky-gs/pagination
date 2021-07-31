const Discord = require('discord.js');

const client = new Discord.Client();
const configs = require('./config.json');

client.on('message', async(message) => {
//DON'T FORGET async STATEMENT
  var args = message.content.slice(configs.prefix.length).trim().split(' ');
  const commandName = args.shift();
  
  if (commandName === 'bot') {
    const pages = ['PROGRAMMER: I am programmed by Greensky [*gs*]', `SERVERS: ${client.guilds.cache.size} servers`, `USERS: ${client.users.cache.size} users`, `PREFIX: ${configs.prefix}`]
    
    let i = 0;
    
    const reacts = ['◀', '▶', '❌'];
    
    const msg = await message.channel.send(pages[i]);
    reacts.forEach(async(r) => {
      await msg.react(r);
    });
    
    const collector = msg.createReactionCollector((reaction, user) => reacts.includes(reaction.emoji.name) && user.id === message.author.id, {time: time in milliseconds});
    collector.on('collect', (reaction, user) => {
      if (reaction.emoji.name === reacts[0]) {
        i--
        if (i < pages.length || i === pages.length) {
          msg.edit(pages[i]).catch(() => {});
        } else {
          i++;
        };
      } else if (reaction.emoji.name === reacts[1]) {
        i++
        if (i < pages.length || i === pages.length) {
          msg.edit(pages[i]).catch(() => {});
        } else {
          i--;
        };
      } else {
        collector.stop();
        msg.delete().catch(() => {});
      }
    });
  };
});
