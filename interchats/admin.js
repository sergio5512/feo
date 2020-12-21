module.exports = async (Discord, client, message, set, db, prefix, blacklist_db, interchat_blacklist, verificados, canalesprivados_db) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) return;
  if(message.author.id === '528860743437910016') return;
  if(message.author.id === '353104236491309056') return;
  if(message.author.id === '525719983506980903') return;
  if(message.author.id === '456361646273593345') return;
    if(message.author.id != '528860743437910016'){
      if(message.author.id != '353104236491309056') {
        if(message.author.id != '525719983506980903') {
          if(message.author.id != '456361646273593345') return;
        }
      }
    }
    let comprobacion_blacklist = await blacklist_db.obtener(`Users.${message.author.id}`);
    if(comprobacion_blacklist) {
      interchat_blacklist(Discord, client, message, prefix, set, blacklist_db, owner_db);
    }
    if (message.content.includes('discord.gg/')) return;
    if (message.content.includes('discord.com/invite/')) return;
    if (message.channel.id === set) {
      let obtener = await verificados.obtener(`${message.author.id}`);
      if(!obtener){
        verificados.establecer(`${message.author.id}`, {"messagessend": 0});
      }
        message.delete()
        let channel = message.channel;
        channel.createInvite({ unique: false })
            .then(invite => {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag} • [**Invita al bot**](https://discord.com/api/oauth2/authorize?client_id=741314725916180480&permissions=8&scope=bot)`, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor('RANDOM')
                    .setDescription(`:construction: [**ADMINISTRADOR**](https://discord.com/api/oauth2/authorize?client_id=741314725916180480&permissions=8&scope=bot) :construction: | [📤 **UNIRSE A ESTE SERVIDOR** 📤](https://discord.gg/${invite.code})`)
                    .setURL("https://discord.gg/YQHeYFE")
                    .addField(":speech_balloon: **Mensaje:**", message.content)
                    .setTimestamp()
                    .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRXm-c5mK_8_dMhSmLoyEyuzT8Ts5ZEO7yQ&usqp=CAU")
                    .setFooter(`${message.guild.name} • administradores: ${message.guild.memberCount}`, message.guild.iconURL({ dynamic: true }));

                client.guilds.cache.forEach(g => {
                    try {
                        client.channels.cache.get(db.fetch(`g_${g.id}`)).send(embed);
                    } catch (e) {
                        return;
                    }
                });
                verificados.sumar(`${message.author.id}.messagessend`, 1);
                return;
            }
            )
    }
}