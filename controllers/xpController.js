var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var xpController = {};

//Adiciona xp ao personagem
xpController.addXp = function(params){

  var callback = function(params, query, pers){
    var xp = pers.xp + parseInt(params.valor);
    var update = {xp : xp},
      options = {upsert : true};
    var retorno = 'Personagem: ' + params.nome + ', xp: '+ xp;

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);personagemController.erro(params, 'Erro ao adicionar xp ao personagem');}

      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    });
  };

  personagemController.buscarPersonagem(params, callback);
};

//Remove xp do personagem
xpController.removeXp = function(params){
  var callback = function(params, query, pers){
    var xp = (pers.xp - parseInt(params.valor)) <= 0 ? 0 : (pers.xp - parseInt(params.valor));
    var update = {xp : xp},
      options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) throw err;if (err) {console.log(err);personagemController.erro(params, 'Erro ao remover xp do personagem');}

      var retorno = 'Personagem: ' + params.nome + ', xp: '+ xp;
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    });
  };

  personagemController.buscarPersonagem(params, callback);
};

//Consulta xp
xpController.consultaXp = function(params){
  var callback = function(params, query, pers){
    var retorno = 'Personagem: ' + pers.nome + ', xp: '+ pers.xp;

    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };
  personagemController.buscarPersonagem(params, callback);
};

module.exports = xpController;
