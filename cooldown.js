module.exports = {
  Verificar,
  Agregar,
  Remover,
}
let servidores_cooldown = new Map();


function Verificar(guild, user) {
if(servidores_cooldown.has(guild)) {
  if(servidores_cooldown.get(guild).includes(user)) {
    return true
  }
  return false
}else{
  servidores_cooldown.set(guild, [])
  return false
}
}

function Agregar(guild, user) {
servidores_cooldown.get(guild).push(user)
setTimeout( () => {
Remover(guild, user)
}, 7000)
}

function Remover(guild, user) {
let servidores = servidores_cooldown.get(guild)
servidores.splice(servidores.indexOf(user), 1)
}