var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var listController = {};

//Lista os nomes de todos os personagens salvos no banco
listController.listar = function(params){

  Personagem.find({}, function(err, personagens) {
    if (err) {console.log(err);controller.erro(params, 'Erro ao listar personagens');}
    else{
      var retorno = '';
      for(var index = 0; index < personagens.length; index++){
        retorno += 'Personagem: '+ personagens[index].nome + '\n'
      }
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    }
  });
};

module.exports = listController;
