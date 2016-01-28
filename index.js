var SlackBot = require('slackbots');
var comandos = require('./commands/comandos');

var token = SLACKBOT_TOKEN;

// create a bot
var bot = new SlackBot({
    token: token, // Add a bot https://my.slack.com/services/new/bot and put the token
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
      var param = {bot:bot, channel:channel, msg:message.text}
      comandos[index].comando(param);
    }
  }
}

var getChannelById = function (channelId) {
    return bot.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};
