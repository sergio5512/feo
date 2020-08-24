const fs = require ('fs');
const util = require('./util.js');
const config = util.getConfig()[1];

class Command {
  constructor(commandInfo){
   this.name = commandInfo.name;
   this.args = commandInfo.args;
   this.category = commandInfo.category;
   this.alises = commandInfo.alises;
   this.permLv1 = commandInfo.permLv1;
   this.priority = commandInfo.priority;
    
  }
  checkArgs(msg, msgArgs){
    if(this.args != undefined){
      if(msgArgs.length == 0 && this.args.find(x => x.optional) !== undefined) {
        util.getSend(msg, 'Necesita un argumento');
        return false;
        
      }
   
    }
    
  }
}