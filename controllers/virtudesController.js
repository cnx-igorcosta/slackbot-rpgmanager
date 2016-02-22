var personagemController = require('./personagemController');
var rulesController = require('./rulesController');

var virtudesController = {};

virtudesController.consultarVirtude = function(params){

  var callback = function(params, query, pers){
    var retorno;

    switch(params.virtude.toLowerCase()){
      case 'fortitude':
        retorno = rulesController.getFortitude(pers);
        break;
      case 'reflexos':
        retorno = rulesController.getReflexos(pers);
        break;
      case 'vontade':
        retorno = rulesController.getVontade(pers);
        break;
    }
    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };

  personagemController.buscarPersonagem(params, callback);
};

module.exports = virtudesController;
