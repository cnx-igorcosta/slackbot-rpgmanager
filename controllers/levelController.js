var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var levelController = {};

levelController.consultarLevel = function(params){

  var callback = function(params, query, pers){
    var retorno = 'Personagem: ' + pers.nome +': '+ pers.nivel + ' Nível';

    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };
  personagemController.buscarPersonagem(params, callback);
};

levelController.addLevel = function(params){

  var callback = function(params, query, pers){

    var nivel = pers.nivel + 1;
    var update = {nivel : nivel},
      options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);personagemController.erro(params, 'Erro ao adicionar nível ao personagem');}
      else{
        var retorno = 'Personagem: ' + pers.nome +': '+ nivel + ' Nível';
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      }
    });
  };
  personagemController.buscarPersonagem(params, callback);
};

levelController.removeLevel = function(params){

  var callback = function(params, query, pers){

    var nivel = (pers.nivel - 1) <= 0 ? 1 : (pers.nivel - 1);
    var update = {nivel : nivel},
      options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);personagemController.erro(params, 'Erro ao diminuir nível do personagem');}
      else{
        var retorno = 'Personagem: ' + pers.nome +': '+ nivel + ' Nível';
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      }
    });
  };
  personagemController.buscarPersonagem(params, callback);
};

module.exports = levelController;
