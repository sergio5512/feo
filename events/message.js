const config = require("../util.js").getConfig[1];
const util = require('../util.js');

module.exports = async (client, message) => {
  let prefix = config.prefix;
  let args;
if (!args) return message.channel.send('Ingrese un mensaje');

  if (message.content.startsWith(prefix+"ping")) {
      util.getSend(message, 'ping con el prefix: '+ prefix)
  } else if (message.content.startsWith(prefix + "help")) {
    message.reply("Hola Soy TutoBOT y Mia comandos de momento son t!help");
  }
}