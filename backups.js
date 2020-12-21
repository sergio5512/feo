const megadb = require('megadb');
const db = require('discord-backup');

const backups_db = new megadb.crearDB('backups');

module.exports = {
  setStorageFolder: function() {
    db.setStorageFolder(__dirname+'/backups/')
  },
  createBackup: function(message, guild, Discord, prefix) {
    const noPerms = new Discord.MessageEmbed()
    .setDescription('No tienes permisos para ejecutar ese comando!')
    .addField('Necesitas tener el permiso `ADMINISTRADOR`.')
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noPerms);

    db.create(guild, {
      maxMessagesPerChannel: 30,
      jsonBeautify: true
    }).then(backupData => {
        const embed = new Discord.MessageEmbed()
        .setDescription('Copia de seguridad creada exitosamente!')
        .addField('ID de la copia de seguridad:', backupData.id)
        .addField('\nPara restaurar la copia de seguridad usa:', prefix+'backup load '+backupData.id)
        .setFooter(message.guild.name, message.guild.iconURL);
        message.channel.send(embed)
        return backups_db.establecer(`${message.guild.id}.${backupData.id}`, { idBackup: backupData.id, owner: message.author.id});
      })
  },
  deleteBackup: function(message, backupID, Discord) {
    const noPerms = new Discord.MessageEmbed()
    .setDescription('No tienes permisos para ejecutar ese comando!')
    .addField('Necesitas tener el permiso `ADMINISTRADOR`.')
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noPerms);

    db.fetch(backupID).then(async (backupData) => {
      if(message.author.id != owner) {
      let owner = backups_db.tiene(`${backupInfo.data.guildID}`) ? await backups_db.obtener(`${backupInfo.data.guildID}.owner`) : '';
      let ownerName = client.users.cache.find(u => u.id === owner);
      const notOwner = new Discord.MessageEmbed()
      .setDescription('No puedes hacer eso! No eres el creador del backup!')
      .addField('Necesitas ser el creador del backup para poder borrarlo.', `El owner es ${ownerName.tag}`);
      return message.channel.send(notOwner)
      }
    });
    
    db.remove(backupID);

    const embed = new Discord.MessageEmbed()
        .setDescription('Copia de seguridad borrada exitosamente!')
        .setFooter(message.guild.name, message.guild.iconURL);
        return message.channel.send(embed)
  },
  loadBackup: function(message, backupID, Discord, client) {
    const noPerms = new Discord.MessageEmbed()
    .setDescription('No tienes permisos para ejecutar ese comando!')
    .addField('Necesitas tener el permiso `ADMINISTRADOR`.')
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noPerms);

    const channelName = message.channel.name;

    db.fetch(backupID).then(async (backupData) => {
      if(message.author.id != owner) {
      let owner = backups_db.tiene(`${backupInfo.data.guildID}`) ? await backups_db.obtener(`${backupInfo.data.guildID}.owner`) : '';
      let ownerName = client.users.cache.find(u => u.id === owner);
      const notOwner = new Discord.MessageEmbed()
      .setDescription('No puedes hacer eso! No eres el creador del backup!')
      .addField('Necesitas ser el creador del backup para poder borrarlo.', `El owner es ${ownerName.tag}`);
      return message.channel.send(notOwner)
      }
    });

    db.load(backupID, message.guild, {
      clearGuildBeforeRestore: true
    }).then(() => {
          let channel = client.channels.cache.filter(c => c.name == channelName);
          const embed = new Discord.MessageEmbed()
          .setDescription('Copia de seguridad cargada exitosamente!')
          .setFooter(message.guild.name, message.guild.iconURL);
          channel.send(embed);
        })
  },
  infoBackup: function(message, backupID, Discord, client) {
    const noPerms = new Discord.MessageEmbed()
    .setDescription('No tienes permisos para ejecutar ese comando!')
    .addField('Necesitas tener el permiso `ADMINISTRADOR`.')
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noPerms);

    db.fetch(backupID).then(async (backupInfo) => {
      let owner = backups_db.tiene(`${backupInfo.data.guildID}`) ? await backups_db.obtener(`${backupInfo.data.guildID}.owner`) : '';
      let ownerName = client.users.cache.get(u => u.id === owner);
      const notOwner = new Discord.MessageEmbed()
      .setDescription('No puedes hacer eso! No eres el creador del backup!')
      .addField('Necesitas ser el creador del backup para poder borrarlo.', `El owner es ${ownerName.tag}`);
      if(message.author.id === owner) {
        const date = new Date(backupInfo.data.createdTimestamp);
      const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
      const formatedDate = `${(dd[1]?dd:"0"+dd[0])}/${(mm[1]?mm:"0"+mm[0])}/${yyyy}`;
      let icon = backupInfo.data.iconURL;
        const embed = new Discord.MessageEmbed()
        .setDescription('Información del Backup del servidor **'+backupInfo.data.name+'**')
        .addField('ID del Backup: ', backupInfo.id)
        .addField('ID del Servidor: ', backupInfo.data.guildID)
        .addField('Tamaño del Backup: ', `${backupInfo.size} mb`)
        .addField('Backup creado el: ', formatedDate)
        if(icon){
          embed.setImage(icon);
        }
        return message.channel.send(embed)
      }else{
        return message.channel.send(notOwner);
      }
    })
  }
}