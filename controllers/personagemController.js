var connection = require('../config/database.js')('mongodb://localhost/rpgmanager');
var Personagem = require('../models/personagem');
var SlackBot = require('slackbots');

module.exports = function () {

  var controller = {};

  controller.help = function(bot, channel){
    var retorno = 'rpgmanager comandos:\n'+
    '- new - Salva novo personagem, nome e atributos devem ser enviados. '+
    'Ex: "new nome:Aragorn, for:18, des:15, con:16, int:14, sab:16, car:12".\n'+
    '- list - Lista os nomes de todos os personagens salvos.\n'+
    '- pv - Adiciona, remove ou gera pv ao personagem. Ex: "pv Aragorn +3", '+
    ' ou "pv Aragorn -5" ou pv Aragorn = 20.\n';

    bot.postMessageToChannel(channel.name, retorno, {as_user: true});
  };

  //Salva novo personagem no banco
  controller.salvar = function(bot, personagem, channel){
    console.log('salvar ');
    var p = new Personagem({
      nome: personagem.nome,
      for: parseInt(personagem.for),
      des: parseInt(personagem.des),
      con: parseInt(personagem.con),
      int: parseInt(personagem.int),
      sab: parseInt(personagem.sab),
      car: parseInt(personagem.car)
    });
    p.save(function(err) {
      if (err) throw err;
      bot.postMessageToChannel(channel.name, 'Salvou '+JSON.stringify(personagem), {as_user: true});
    });
  };

  //Lista os nomes de todos os personagens salvos no banco
  controller.listar = function(bot, msg, channel){

    Personagem.find({}, function(err, personagens) {
      if (err) throw err;
      var retorno = '';
      for(var index = 0; index < personagens.length; index++){
        retorno += 'Personagem: '+ personagens[index].nome + '\n'
      }
      bot.postMessageToChannel(channel.name, retorno, {as_user: true});
    });
  };

  controller.setPvTotal = function(bot, channel, params){
    console.log(JSON.stringify(params));
    var query = {nome : params.nome}
    ,update = {pvTotal : params.valor}
    ,options = {upsert : true};
    Personagem.update(query, update, options, function(err){
      if (err) throw err;
      var retorno = 'Personagem: ' + params.nome + ', pv: '+ params.valor+'/'+params.valor;
      bot.postMessageToChannel(channel.name, retorno, {as_user: true});
    });
  }

  controller.setPv = function(bot, channel, params){
    console.log(JSON.stringify(params));
    var query = {nome: params.nome}
    ,update = {pv : params.valor}
    ,options = {upsert : true};
    Personagem.update(query, update, options, function(err){
      if (err) throw err;
      var retorno = 'Personagem: ' + params.nome + ', pv: '+ params.valor;
      bot.postMessageToChannel(channel.name, retorno, {as_user: true});
    });
  }

  return controller;
}();
