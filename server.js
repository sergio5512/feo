require('http').createServer((req, res) => res.end(`¡El bot esta online como: TutoBot`)).listen(3000);

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const { nivelesFunc } = require("./niveles.js")
const interchat_owner = require('./interchats/owner.js');
const interchat_user = require('./interchats/user.js');
const interchat_admin = require('./interchats/admin.js');
const interchat_blacklist = require('./interchats/blacklist.js')
const cooldowniveles = new Map()
const db_niveles = require('megadb');
let { readdirSync } = require('fs');

const DBL = require("dblapi.js");
const dbl = new DBL(process.env.dblToken, { webhookPort: 5000, webhookAuth: process.env.dblWebhookPass });
// Optional events
dbl.on('posted', () => {
  console.log(`¡Server count posteado a DBL!`);
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

client.login(process.env.PTO_TKN_XD_JAJA_LOL);
