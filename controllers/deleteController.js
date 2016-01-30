var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var deleteController = {};

deleteController.deletePersonagem = function(params){

  var callback = function(params, query, pers){
    pers.remove(pers._id);
    var retorno = 'Personagem '+params.nome+' deletado.';
    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };
  
  personagemController.buscarPersonagem(params, callback);
};

module.exports = deleteController;
