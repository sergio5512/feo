function presence(client){
  var status = [`📁 ${client.guilds.cache.size}  Servidores 📁`, `👤${client.users.cache.size}  Usuarios 👤`, `🟣 t!ayuda 🟣`, "💎 Creador: Cooky. 💎", "💎 Creador 2: Adrigamer2950 💎","💎 Creador 3: TnfAngel 💎"];
  var randomStatus = Math.floor(Math.random()*(status.length));
  client.user.setPresence({
       status: "online",
       activity: {
           name: status[randomStatus],
           type: "WATCHING"
       }
   });
}

const { MessageEmbed } = require("discord.js")
const db = require('discord-backup');
const backups = require('../backups.js');

module.exports = async (client) => {
  console.log(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n· El bot se ha conectado como: ${client.user.username}\n· Servidores: ${client.guilds.cache.size}\n· Usuarios totales: ${client.users.cache.size}\n· Memoria usada: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  //buenas
  presence(client);
  setInterval(function (){
  var status = [`📁 ${client.guilds.cache.size}  Servidores 📁`, `👤 ${client.users.cache.size}  Usuarios 👤`, `🟣 t!ayuda 🟣`, "💎 Creador: Cooky. 💎", "💎 Creador 2: Adrigamer2950 💎","💎 Creador 3: TnfAngel 💎"];
  var randomStatus = Math.floor(Math.random()*(status.length));
  client.user.setPresence({
       status: "online",
       activity: {
           name: status[randomStatus],
           type: "WATCHING"
       }
   });
}, 5000);
backups.setStorageFolder(db);
  const canal = client.channels.cache.find(c => c.id === '787715532064686130');
  canal.join().catch(err => {
    console.log(err);
  });
}