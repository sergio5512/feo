module.exports = {
 nivelesFunc: async (message, niveles, Discord, set, db, cooldowniveles) => {
   if(message.channel.id != set) return;
   if(message.content.length <= 2) return;
   if(cooldowniveles.has(message.guild.id+message.author.id)) {
     let cooldown = cooldowniveles.get(message.guild.id+message.author.id)
     if(Date.now() < cooldown) {
       console.log("Necesitas esperar unos segundos")
       return;
     }
   }

    if(!niveles.tiene(`${message.author.id}`)) niveles.establecer(`${message.author.id}`, {xp: 0, nivel: 1})
    let { xp, nivel } = await niveles.obtener(`${message.author.id}`)
    let randomxp = Math.floor(Math.random() * 30 + 1)
    let levelup = 5 * (nivel ** 2) + 50 * nivel + 100
   cooldowniveles.set(message.guild.id+message.author.id, Date.now() + 10000)
    if( xp + randomxp >= levelup) {
      niveles.establecer(`${message.author.id}`, {xp: 0, nivel:parseInt(nivel+1)})
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarUrl)
      .setDescription(`${message.member} acabas de subir de nivel: ${parseInt(nivel+1)}!`)
      return message.channel.send(embed)
 }
    else {
      niveles.sumar(`${message.author.id}.xp`, randomxp)
      console.log(`${message.author.tag}, ganastes: ${randomxp}`)
      return;
    }
 } 
}