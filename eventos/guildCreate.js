const Discord = require('discord.js');

module.exports = async (client, guild) => {
  const embed2 = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
        .setColor('RANDOM')
        .setDescription(`¡Gracias por añadirme a tu servidor!\n\nSoy TutoBot y soy un bot que puede hacer muchas cosas y mas adelante se le añadiran mas cosas prueba a usar t!ayuda`)
        .setFooter("Creadores: Cooky.#8759 | tnfAngel#0001 | Adrigamer2950#8682")
        .setTimestamp()
    guild.owner.send(embed2);
}