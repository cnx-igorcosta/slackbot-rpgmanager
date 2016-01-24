var SlackBot = require('slackbots');
var comandos = require('./controllers/comandos');

// create a bot
var bot = new SlackBot({
    token: 'xoxb-19252493953-5VWh8JlXLkFYuiQxqygTzlbu', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'rpgmanager'
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        username: 'rpgmanager'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', 'rpgmanager no ar! \nDigite "rpghelp" para saber os comandos.', params);

    // define existing username instead of 'user_name'
    bot.postMessageToUser('user_name', params.username, params);
});

bot.on('message', function(message){
    if (isChatMessage(message) &&
          isChannelConversation(message) &&
          !isFromBot(message) &&
          isMentioningBot(message)
      ) {
          doComand(message);
      }
});

var isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

var isChannelConversation = function (message) {
    return typeof message.channel === 'string' && message.channel[0] === 'C';
};

var isFromBot = function (message) {
    return message.username === bot.name;
};

var isMentioningBot = function (message) {
  var retorno = false;
    for(var index = 0; index < comandos.length; index++){
      if((message.text.toLowerCase().indexOf(comandos[index].nome)) > -1){
        retorno = true;
      }
    }
  return retorno;
};

var doComand = function(message) {
  var channel = getChannelById(message.channel);
  for(var index = 0; index < comandos.length; index++){
    if((message.text.toLowerCase().indexOf(comandos[index].nome)) > -1){
      comandos[index].comando(bot, message.text, channel);
    }
  }
}

var getChannelById = function (channelId) {
    return bot.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

/*var rolarDado = function(message){
  var dado = message.replace(/\s/g,'').replace(/(D|d)ice/g,'');
  var resultado = "Resultado ";
  var total = 0;
  if(/^\d+[d]\d+$/.test(dado)){
    var vezes = parseInt(dado.substring(0, dado.indexOf('d')));
    var faces = parseInt(dado.substring((dado.indexOf('d')+1),(dado.length)));
    resultado = resultado + dado + " = ";
    for(var i = 0; i<(vezes); i++){
      var valor = Math.floor((Math.random() * faces) + 1);
      if(i > 0){
       resultado = resultado + ", "
      }
      resultado = resultado + valor;
      total = total+valor;
    }
  }
  return (total ? resultado + "; Total: "+total : null);
};*/
