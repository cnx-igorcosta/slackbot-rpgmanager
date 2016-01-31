var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var setController = {};

setController.setValue = function(params){

  var callback = function(params, query, pers){
    var update = params.setValue
      ,options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);personagemController.erro(params, 'Erro ao alterar personagem');}

      var comando = JSON.stringify(params.setValue).replace(/\{\"/g,'(')
        .replace(/\"\}/g,')').replace(/\":\"/g,':');
      var retorno = 'Personagem: ' + params.nome + ', comando '+comando+' executado.';
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    });
  };
  personagemController.buscarPersonagem(params, callback);
};

module.exports = setController;
