var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var goldController = {};

goldController.consultarGold = function(params){

  var callback = function(params, query, pers){
    var retorno = 'Personagem: ' + pers.nome +' possui '+ pers.dinheiro + 'PO';

    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };
  personagemController.buscarPersonagem(params, callback);
};

goldController.addGold = function(params){

  var callback = function(params, query, pers){
    var valor = parseInt(params.valor);
    var dinheiro = (pers.dinheiro + valor);
    var update = {dinheiro : dinheiro},
      options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);personagemController.erro(params, 'Erro ao adicionar gold ao personagem');}
      else{
        var retorno = 'Personagem: ' + pers.nome +' possui '+ dinheiro + 'PO';
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      }
    });
  };
  personagemController.buscarPersonagem(params, callback);
};

goldController.removeGold = function(params){

  var callback = function(params, query, pers){
    var valor = parseInt(params.valor);
    var dinheiro = (pers.dinheiro - valor) <= 0 ? 0 : (pers.dinheiro - valor);
    var update = {dinheiro : dinheiro},
      options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);personagemController.erro(params, 'Erro ao remover gold do personagem');}
      else{
        var retorno = 'Personagem: ' + pers.nome +' possui '+ dinheiro + 'PO';
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      }
    });
  };
  personagemController.buscarPersonagem(params, callback);
};

module.exports = goldController;
