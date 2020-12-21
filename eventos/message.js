const Discord = require('discord.js');
const getConfig = require("../util.js").getConfig()[1];
const util = require('../util.js');
const chalk = require("chalk")
const db = require('megadb');
const colors = require('colors')
const sqlite3 = require('sqlite3').verbose();
const cooldown = require("../cooldown.js");
const backups = require('../backups.js');
const config = require("../config.js");
const backup = require('discord-backup');
const fs = require("fs");
const os = require("os");
const ms = require("ms");
const quick = require("quick.db")
const db_blacklist = require('megadb');
const blacklist = new db_blacklist.crearDB('blacklist');
const prefix_db = new db.crearDB('prefix');
const db_prefix = require('megadb');
const antispam = new db.crearDB("anti-spam")
const registros = new db.crearDB("Canal_registros")
let guilds = {};
function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") {
    return message.author.send("Este bot solo funciona en servidores")
  }
  let prefix = prefix_db.tiene(`${message.guild.id}`) ? await prefix_db.obtener(`${message.guild.id}`) : "t!";
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
    if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
if (message.content.startsWith(prefix+'ping')) {
      if(message.author.bot) return;
    if (message.channel.type === "dm") return message.reply("> este bot solo funciona en servidores");
    var botping = Math.round(client.ws.ping)
const ping1 = new Discord.MessageEmbed()
 .setDescription(":ping_pong: pingeando...")
 .setColor("RANDOM")
        message.channel.send(ping1).then(m => { 
          const embed = new Discord.MessageEmbed()
            .setDescription(`💬 Ping de **mensajes**: ${m.createdTimestamp -
                message.createdTimestamp} ms\n :satellite_orbital: Ping mensajes del bot: ${botping} ms`) //Obtenemos el ping de los mensajes y del API
            .setColor("RANDOM");
          m.edit(embed)
           });
           if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
           }
} else if (message.content.startsWith(prefix + 'ayuda')) {
    const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} • ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }))
            .setColor('RANDOM')
            .setDescription(":cd:  **AYUDA TutoBot** :cd: ")
            .addField(prefix+`ayuda`, "Muestra este **mensaje**.")
            .addField(prefix+`ping`, "Muestra el **retraso** que tiene el bot al enviar un mensaje.")
            .addField(prefix+`web`, "Muestra la **web** oficial de owner.")
            .addField(prefix+`invite`, "Crea una **invitacion** del bot.")
            .addField(prefix+`botinfo`, "Muestra la **informacion** del bot.")
            .addField(prefix+`avatar`, "Muesta el avatar del **usuario** mencionado.")
            .addField(prefix+`say`, "Envia el **mensaje** que quieras.")
            .addField(prefix+`serverinfo`, "Da la **informacion** del servidor.")
            .addField(prefix+`changeprefix`, "**Cambia el prefix del bot**.")
            .addField(prefix+`bug`, "**Reportas un reporte del bot**.")
            .addField(prefix+`suggest`, "**Manda una sugerencia**.")
            .addField(prefix+`userinfo`, "**Muestra la info del usuario**.")
            .addField(prefix+`8ball`, "**Hace respuestas random**.")
             .addField(prefix+`clear`, "**Borra los mensajes que tu pongas**.")
            .addField(prefix+`roleinfo`, "**Muestra la informacion del rol mencionado**.")
            .addField("▬▬▬▬▬▬▬▬▬\nEnlaces importantes:", "[**Servidor de soporte**](https://discord.gg/5wKCexUjWq)\n[**Añademe a tu servidor**](https://discord.com/oauth2/authorize?client_id=741314725916180480&scope=bot&permissions=8)\n[**Top.gg**](https://top.gg/bot/741314725916180480)\n[**Sitio Web**](https://cookycomunity.weebly.com/)")
            .setTimestamp()
            .setFooter(`🌐 Creado por Cooky#8753`);
            message.channel.send(embed);
            if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
  } else if (message.content.startsWith(prefix + 'say')) {
    let texto = message.content.replace(prefix + 'say', '')
    if (!texto) return message.channel.send('<:emoji1:785994785630060545> ¡Debes introducir algo para decir!')
    message.delete()
    message.channel.send(texto)
    if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
  } else if (message.content.startsWith(prefix + 'invite')) {
    const embed2 = new Discord.MessageEmbed()
      .setDescription("**<a:tick:759818282173464596> Invite del bot** ➤ [**Invitame**](https://discord.com/oauth2/authorize?client_id=741314725916180480&scope=bot&permissions=8)\n**<:descarga3:787455121997955072> Invite de top.gg** ➤ [**Top.gg**](https://top.gg/bot/741314725916180480)")
      .setColor("RANDOM")
    message.channel.send(embed2)
    if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
  } else if (message.content.startsWith(prefix + 'changeprefix')) {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('<:emoji1:785994785630060545> | No tienes permisos! Debes tener el permiso `"Gestionar Servidor"` para poder cambiar mi prefix!');
    if (!args[1]) return message.channel.send("<:emoji1:785994785630060545> | Necesitas colocar mi nuevo prefix!");
    let prefix_antiguo = prefix;
    prefix_db.establecer(`${message.guild.id}`, args[1]);
    const embed = new Discord.MessageEmbed()
      .setTitle('<:emoji:785994785889845298> Prefix cambiado!')
      .setDescription('Prefix antiguo: `' + prefix_antiguo + '`\nPrefix nuevo: `' + args[1] + '`')
    return message.channel.send(embed);
    if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
  } else if (message.content.startsWith(prefix + 'botinfo')) {
    let totalSeconds = null;
    const embed = new Discord.MessageEmbed()
      .setAuthor('Información de TutoBot')
      .setColor("RANDOM")
      .setThumbnail(client.user.avatarURL)
      .addField("💎 Owner:", "<@528860743437910016>", true)
      .addField(":cd: ID Bot:", "741314725916180480")
      .addField("📁 Librería:", "Discord ^v12.x (Js)", true)
      .addField("🧪 Versión:", " 0.0.1", true)
      .addField("💻 Memoria:", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "%", true)
      .addField("<:DCEmployeeBadgee:777263433745039410> Nombre:", "TutoBot")
      .addField("🔰 Servidores:", client.guilds.cache.size, true)
      .addField("👤 Usuarios:", client.users.cache.size, true)
      .addField(":credit_card:  Uptime:", totalSeconds = (client.uptime / 1000));
    message.channel.send(embed);
    if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
  }else if (message.content.startsWith(prefix + 'suggest')) {
      if (!args[1]) {
        message.channel.send('<:emoji1:785994785630060545> Tienes que poner la sugerencia que quieres enviar!')
      } else {
        let canal = client.channels.cache.find(c => c.id === '777583036375236608')
        const embed = new Discord.MessageEmbed()
          .setTitle('Nueva Sugerencia!')
          .setDescription(message.author.tag + ' ha hecho una sugerencia!')
          .addField('Sugerencia enviada: ', args.slice(1).join(" "))
          .setThumbnail(message.author.avatarURL);
        canal.send(embed).then(msg => {
          msg.react('✅');
          msg.react('❎');
        });
        message.reply('Sugerencia enviada correctamente!');
        
      }
       if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
  } else if (message.content.startsWith(prefix + 'bug')) {
      if (!args[1]) {
        message.channel.send('<:emoji1:785994785630060545> Tienes que poner el bug que quieres reportar!')
      } else {
        let canal = client.channels.cache.find(c => c.id === '777582998597926982')
        const embed = new Discord.MessageEmbed()
          .setTitle('Nuevo Bug Reportado!')
          .setDescription(message.author.tag + ' ha reportado un bug!')
          .addField('Bug Reportado: ', args.slice(1).join(" "))
          .setThumbnail(message.author.avatarURL);
        canal.send(embed).then(msg => {
          msg.react('✅');
          msg.react('❎');
        });
        message.reply('Bug reportado correctamente!');
      }
       if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
  } else if (message.content.startsWith(prefix + 'eval')) { //Abrimos el comando
  		const args2 = message.content
	let limit = 1750;
	try {
		let code = args2.replace(prefix+'eval ', '');
		let evalued = eval(code);
		if (typeof evalued !== "string")
			evalued = require("util").inspect(evalued);
		let txt = "" + evalued;
		if (txt.length > limit) {
    if (!["528860743437910016", "353104236491309056", "456361646273593345"].includes(message.author.id)) {
      const pito = new Discord.MessageEmbed()
        .setDescription('<:emoji1:785994785630060545> Este comando es solo para **Cooky.** / **adrigamer**/**TnfAngel**')
        .setColor("RANDOM")
      return message.channel.send(pito)
    }
    }
      		const embed = new Discord.MessageEmbed()
			.setAuthor("¡Eval realizado correctamente!", client.user.displayAvatarURL({ dynamic: true }))
			.addField("📥 Entrada", `\`\`\`js\n${code}\n\`\`\``)
			.addField("📤 Salida", `\`\`\`js\n${txt}\n\`\`\``)
			.setColor("RANDOM")
		message.channel.send(embed);
	} catch (err) {
		let code = args2.replace(prefix+'eval ', '')
		const embed = new Discord.MessageEmbed()
			.setAuthor("Error en el eval", client.user.displayAvatarURL({ dynamic: true }))
			.addField("📥 Entrada", `\`\`\`js\n${code}\n\`\`\``)
			.addField("📤 Salida", `\`\`\`js\n${err}\n\`\`\``)
			.setColor("RANDOM")
		message.channel.send(embed);
    }
     if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
  } else if (message.content.startsWith(prefix + 'setup')) {
   const args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (message.channel.type === "dm") return message.reply("Este bot solo funciona en **servidores**.");
        const channel = message.mentions.channels.first();
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`Necesitas el permiso de **Gestionar Servidor** para usar este comando.`)
        if (!channel) return message.channel.send(":x: | Debes **Mencionar un canal**.");
        db.set(`g_${message.guild.id}`, `${channel.id}`);
        message.channel.send(`:+1: | El interchat saldran  en: ${channel}`);
        const embed = new Discord.MessageEmbed()
	    .setAuthor("Memes", client.user.avatarURL())
            .setDescription("Los mensajes se enviaran en este canal.")
            .setColor("GREEN")
        client.channels.cache.get(channel.id).send(embed);
	console.log("Han hecho un setup en "+message.guild.name)
 if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
    }else if (message.content.startsWith(prefix + 'avatar')) {
      let mentions = message.mentions.users.first() || message.author;
    
    const embed = new Discord.MessageEmbed()
     .setImage(mentions.avatarURL())
     .setColor('RANDOM')
     .setFooter(`Avatar de ${ mentions.tag } `, mentions.avatarURL())   
    message.channel.send(embed);
    }else if(message.content.startsWith(prefix + 'coins')) {
let data = await database.coins.viewMember(message.author.id);
    if(data){
      message.channel.send(`Tienes ** ${ data.coins } Monedas **.`)
    }else{
      await database.coins.addMember(message.author.id, 10, 0)
      let data = await database.coins.viewMember(message.author.id);
      message.channel.send(`Tienes ** ${ data.coins } Monedas **.`)
    }
}else if(message.content.startsWith(prefix + 'backup')) {
  if(message.author.id != '528860743437910016'){
    if(message.author.id != '353104236491309056'){
      return message.reply('Este comando esta en mantenimiento!')
    }
  }
  let func = args[1];
  let backupID = args[2];
  if(func === 'create'){
backup.create(message.guild, {
    maxMessagesPerChannel: 20,
    jsonBeautify: true
  }).then(backupData => {
    message.channel.send('asd')
    console.log(backupData);
  })
  }else if(func === 'delete'){
    backup.remove(backupID)
  }
  
 if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
  }else if(message.content.startsWith(prefix + 'web')){
  const embed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL())
  .setDescription('Pagina web oficial del bot.\n[Web](https://cookycomunity.weebly.com/)') 
  .setColor("RANDOM");
  message.channel.send(embed);
   if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
}else if (message.content.startsWith(prefix+'serverinfo')){
     let verifLevels = {
      "NONE": "Ninguno",
      "LOW": "Bajo",
      "MEDIUM": "Medio",
      "HIGH": "Alto",
      "VERY_HIGH": "Muy Alto"
    }
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa",
        "europe": ":flag_eu: Europe"
    };
    
    var server = message.guild;
    const embed = new Discord.MessageEmbed()
    .setThumbnail(server.iconURL)
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField("Nombre", message.guild.name, true)
    .addField("ID", message.guild.id, true)
    .addField('Usuarios', server.memberCount, true)
    .addField("Region", region[message.guild.region], true)
    .addField("Nivel de Verificación", verifLevels[message.guild.verificationLevel], true)
    .addField("Canales", message.guild.channels.cache.size, true)
    .addField("Roles", message.guild.roles.cache.size, true)
    .addField("Fecha Creacion", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
    .setThumbnail(message.guild.iconURL)
    .setColor('RANDOM')
   message.channel.send(embed);
    if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
   }else if (message.content.startsWith(prefix+'userinfo')) {
//Definimos usuario, puede ser el autor o el mencionado, ustedes pueden cambiarlo si quieren y poner que se obtenga tambien por id; sería así: message.guild.members.cache.get(args[0])


    const member = message.mentions.members.first() || message.member

    console.log(member.user.presence.status)


//Definimos la fecha en años, meses, días, horas, minutos y segundos


    function formatDate (template, date) {
      var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
      date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
      return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
        return template.split(specs[i]).join(item)
      }, template)
    }


//Ahora viene los importante. Ustedes tienen que poner los emojis de cada badge, no valen los mios porque son de un servidor privado así que descarguenlos de internet y cogan la id del emoji como yo hice y su nombre; para hacer es así \:emoji:

//Aclaro otra duda para los nuevos o los que no lo saben, NITRO no es una badge de discord

//Hacemos un let, si el nombre de la badge es x : "saldrá este"


    let badges1 = {
        
      'EARLY_SUPPORTER': '<:Earlysupporter:746029762274656317>',
      'DISCORD_EMPLOYEE': '<:Discordstaff:746029762513862666>',
      'DISCORD_PARTNER': '<:Discordpartner:746029762564194355>',
      'HYPESQUAD_EVENTS': '<:HypesquadEvents:746029762497085550>',
      'HOUSE_BRAVERY': '<:Houseofbravery:746029762459467858>',
      'HOUSE_BRILLIANCE': '<:Houseofbrilliance:746029762610331668>',
      'VERIFIED_DEVELOPER': '<:VerifiedBotDeveloper:746029762194964590>',
      'VERIFIED_BOT': '<:descarga:780120304164405268>',
    }
    

//Creamos un object, es decir, leerá la badge del usuario y si tiene ese nombre, se ejecutara el let anterior
    

    let obj = {
    "HOUSE_BRAVERY" : "Bravery" , "VERIFIED_BOT" : "Bot verificado" , "VWERIFIED_DEVELOPER" : "Desarrollador de bots verificado" , "HOUSE_BRILLIANCE" : "Brilliance" , "DISCORD_PARTNER" : "Socio de discord"
    }


//Definimos embed, yo lo he hecho como Discord.Message(), porque requerí antes Discord; si ustedes pusieron: const { MessageEmbed } = require('discord.js'), solo pondrán new MessageEmbed()


    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM") //La misma mierda de siempre xD defines el color en random
        .setDescription("**INFORMACIÓN DEL USUARIO:**") //Defines la descripcion
        .addField("**🎫 Nombre**:", "**" + `${member.user.tag}` + "**")//Que envíe el tag del usuario
        .addField("**🎟 ID**:", `${member.user.id}` )//Id del usuario
        .addField("**📌 Apodo del usuario**:", `${member.nickname !== null ? `${member.nickname}` : 'Ninguno'}`, true) //Si tiene o no apodo el usuario dentro del servidor
        .addField("**🛎 Fecha de Ingreso al Servidor:**", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.joinedAt))//La fecha de ingreso del usuario al servidor
        .addField("**📥 Cuenta Creada:**", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.user.createdAt))//Cuando fue creada la cuenta
        .addField("**🏳️ Insignias:**", member.user.flags.toArray().length ? member.user.flags.toArray().map(badge => badges1[badge]).join(' ') : "No tengo badges")//Lo que hemos definido antes las badges del usuario
        .addField("**🎮  Jugando**:", member.user.presence.game != null ? user.presence.game.name : "Nada", true)//Si esta jugando a algo, que indique el juego
        .addField("**🎖 Roles:**", member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))//Los roles que posee dicho usuario(Si la cantidad de roles del usuario excede el numero de caracteres que soporta un field, dará un error de sintaxis a la consola, si es así encuentren una manera de hacerlo ustedes mismos)
        .addField("**🚀 ¿Boostea?**:", member.premiumSince ? '**Estoy boosteando <a:boostingtop:755576533430698084>**' : '**No estoy boosteando**')//si esta o no boosteando el servidor
        .setThumbnail (member.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))//y el avatar del usuario
        .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL()}`)//nombre y avatar del usuario en el footer
     message.channel.send(embed)//enviamos el embed
      if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
    }else if (message.content.startsWith(prefix + 'help')){
      message.channel.send('Este comando no existes en el bot prueba a usar ``t!ayuda``');
       if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
    }else if(message.content.startsWith(prefix + "8ball")) {//definimos el comando
  let respuesta = ["Si", "No", "Tal vez", "Xd", "Yo digo que si", "Yo digo que no", "Probablemente", "Tonto", "Feo", "Claro", "Obiamente", "Uwu"]//aqui las probables respuestas que va a tener
  var random = respuesta[Math.floor(Math.random() * respuesta.length)]//aqui decimos que va a elegir una respuesta random de el let respuesta
  if(!args[1]){
    return message.reply('<:emoji1:785994785630060545> Tienes que poner una pregunta!')
  }
const embed = new Discord.MessageEmbed()//definimos el embed

.addField("A su pregunta", `${args.slice(1).join(" ")}`)//primer valor decimos a su pregunta y en el segundo valor va la pregunta que iso el usuario
.addField("Mi respuesta", `${random}`)//primer valor decimos "Mi respuesta" y en el segundo decimos que va a agarrar el var random
.setColor("RANDOM")//un color random
message.channel.send(embed)//y que mande el embed
 if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
}else if (message.content.startsWith(prefix + 'logs')){
let channel = message.mentions.channels.first() || client.channels.cache.get(args[0])
if(!channel){
    return message.reply("Debes proporcionar la ID o mencionar el canal donde iran los registros")
}else{
let embed = new Discord.MessageEmbed()
.setTitle("â Nueva Configuracion â")
.setDescription("Se agradece demasiado que me brindes la confianza de realizar los registros")
.addField("ð Canal de los registros ð", channel, true)
.addField("ð Servidor ð", message.guild.name, true)
.addField("ð ID Servidor ð", message.guild.id, true)
.setColor("RANDOM")
.setTimestamp()
.setFooter(message.guild.name, message.guild.iconURL())
message.channel.send(message.author, embed).then(m => {
registros.set(`${message.guild.id}`, channel.id)
m.delete(50000)
})
}
 if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
}else if (message.content.startsWith("<@!741314725916180480>")) {
        const embed = new Discord.MessageEmbed()
			.setAuthor("TutoBot | Panel de ayuda ", client.user.displayAvatarURL())
			.setDescription("Hola, soy TutoBot!\nPara empezar, mi prefix es `t!`\nPrueba a usar `t!ayuda` para ver la ayuda del bot.")
			.setColor("RED")
		message.channel.send(embed);
 }else if (message.content.startsWith(prefix + 'asd')) {
    const embed2 = new Discord.MessageEmbed()
      .setDescription("[**➡️ Añade tu bot aquí ⬅️**](https://cookycomunity.jimdofree.com/)")
      .setColor("RANDOM")
    message.channel.send(embed2)
     if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
}else if (message.content.startsWith(prefix + 'level')){
      if(!niveles_db.tiene(`${message.guild.id}`)) return message.channel.send("Este servidor no tiene ningun usuario ranklist, se el primero corre!")
      let usuario = message.mentions.members.first() || 
      message.guild.members.get(args[0]) || message.member;
     if(!niveles_db.tiene(`${message.guild.id}.${usuario.id}`)) return message.channel.send("Este usuario no cuenta con xp ni nivel.")
     let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${usuario.id}`)
     let levelup = 5 * (nivel ** 2) + 50 * nivel + 100
     const embed = new Discord.MessageEmbed()
         .setColor("RANDOM")
         .setThumbnail(message.author.displayAvatarUrl)
        .setDescription(`Stats del usuario${usuario}\nXp: ${xp}/${levelup}\nNivel: ~${nivel}`)
      return message.channel.send(embed)
       if(cooldown.Verificar(message.guild.id, message.author.id)) {
      return message.channel.send("Vas muy rapdio espera 7 segundos para poder continuar poniendo comandos.")
    }
    }else if (message.content.startsWith(prefix + 'roleinfo')){
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

//Se define "role" y obtenemos la info del primero rol mencionado, o id puesta.

 if(!role) return message.channel.send("<:emoji1:785994785630060545> | ¡Menciona a un rol!")

//Si no menciono un rol, o no existe retorna.


//Definimos el embed en el que pondremos la info
 const rol = new Discord.MessageEmbed()
      .setDescription("Informacion sobre el rol mencionado.")
      .addField("Nombre:", `- ${role.name}`) //Nombre del rol
      .addField("ID:", `- ${role.id}`) //Id del rol
      .addField("Miembros con el Rol:", `- ${role.members.size}`) //Aqui calculamos cuantos miembros tienen este rol
      .addField("Posición:", `- ${role.rawPosition}`) //Su pocision en cuanto los otros roles
      .addField("HexColor:", `- ${role.hexColor}`) //Su hexColor 
      .addField("¿Mencionable?:", `- ${role.mentionable}`) //Devolvera true o false, segun si se puede mencionar este rol o no
      .addField("¿Separado?:", `- ${role.hoist}`) //Devolvera true o false, segun si se esta separado(visible ante los roles) o no
      .addField("¿Gestionado por el sistema?:", `- ${role.managed}`) //Devolvera true o false, segun si lo creo el sistema(El propio discord)
     
      
      
      message.channel.send(rol)
    }
}else if (message.content.startsWith(prefix + 'clear')){
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`> ¡Necesitas el permiso de **Gestionar mensajes**!`)
		message.delete()
		const args = message.content.split(' ').slice(1);
		const amount = args.join(' '); // cantidad de mensajes
		if (!amount) return message.reply('> ¡No has puesto una **cantidad**!');
		if (isNaN(amount)) return message.reply('¡Eso no es un **numero**!');
		if (amount > 100) return message.reply('Por limitaciones de la API no puedes eliminar mas de **100** mensajes.');
		if (amount < 1) return message.reply('¡Pon al menos **1 mensaje** para eliminar!');
     message.channel.send(`Se han eliminado los mensajes`);
		await message.channel.messages.fetch({ limit: amount }).then(messages => {
			message.channel.bulkDelete(messages)
		});
	}
  }