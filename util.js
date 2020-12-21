module.exports = {
  getConfig: function(){
    let config = './config.js';
    return [config, require(config)]
  },
  getLanguage: function(){
    let lang = require('./lenguaje/ES-es.json');
    return lang;
  }
}