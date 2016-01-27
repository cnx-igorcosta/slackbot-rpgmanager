//var connection = require('../config/database.js')('mongodb://localhost/rpgmanager');
var Personagem = require('../models/personagem');
var SlackBot = require('slackbots');

module.exports = function () {

  var controller = {};

  controller.erro = function(err, params, msg){
    console.log(err);
    params.bot.postMessageToChannel(params.channel.name, msg, {as_user: true});
  }


  //Busca o personagem pelo nome e executa callback
  controller.buscarPersonagem = function(params, callback){

    var query = {nome: { $regex : new RegExp(params.nome, "i") }};

    Personagem.findOne(query, function(err, pers){
      if (err) {controller.erro(err, params, 'Erro ao buscar personagem '+params.nome);}
      else if(pers != null && pers._id){
        callback(params, query, pers);
      }else{
        controller.erro(err, params, 'Personagem '+params.nome+' não foi encontrado.')
      }
    });
  };


  return controller;
}();
