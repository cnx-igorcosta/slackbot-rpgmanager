var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var armorController = {};

armorController.addArmor = function(params){

  var callback = function(params, query, pers){
    //Personagem ainda nao possui armaduras
    if(pers.armaduras.length == 0){
      armorController.newArmor(params, query, pers);
    //Personagem ja possui item
    }else{
      var achou = false;
      for(var index = 0; index < pers.armaduras.length; index++){
         if(pers.armaduras[index].nome.toLowerCase() === params.armadura.nome.toLowerCase() &&
              pers.armaduras[index].descricao === params.armadura.descricao){
            achou = true;

            var retorno = 'Armadura '+params.armaduras.nome+' já adicionada ao personagem '+pers.nome;
            params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
         }
       }
       if(!achou){
         armorController.newArmor(params, query, pers);
       }
    }
  };
  personagemController.buscarPersonagem(params, callback);
};

armorController.newArmor = function(params, query, pers){

  pers.armaduras.push(params.armadura);
  var subArmadura = pers.armaduras[0];
  subArmadura.isNew;

  pers.save(function (err) {
    if (err) {personagemController.erro(err, params, 'Erro ao salvar armadura '+params.armadura.nome+' do personagem '+pers.nome);}
    else{
      var retorno = 'Armadura '+params.armadura.nome+' adicionada ao personagem '+pers.nome;
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    }
  });
};

armorController.removeArmor = function(params){

  var callback = function(params, query, pers){

    for(var index = 0; index < pers.armaduras.length; index++){
      if(pers.armaduras[index].nome.toLowerCase() === params.armadura.toLowerCase()){

        pers.armaduras.remove(pers.armaduras[index]);
        pers.save(function (err) {
          if (err) {personagemController.erro(err, params, 'Erro ao remover armadura '+params.armadura+' do personagem '+params.nome);}
          else{
            var retorno = 'Armadura '+params.armadura+' removida do personagem '+params.nome;
            params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
          }
        });
      }
    }
  };

  personagemController.buscarPersonagem(params, callback);
};

armorController.listArmor = function(params){

  var callback = function(params, query, pers){
    var retorno = pers.armaduras.length ? 'Armaduras do '+pers.nome+':' : 'Personagem '+pers.nome+ ' não possui armaduras';
    for(var index = 0; index < pers.armaduras.length; index++){
      retorno += '\n  - nome: '+ pers.armaduras[index].nome;
      if(pers.armaduras[index].descricao){
        retorno +=' ("' + pers.armaduras[index].descricao + '")';
      }
      retorno += ', CA: ' + pers.armaduras[index].ca;;
    }
    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };

  personagemController.buscarPersonagem(params, callback);
};

module.exports = armorController;
