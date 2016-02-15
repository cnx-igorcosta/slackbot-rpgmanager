var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var weaponController = {};

weaponController.addWeapon = function(params){

  var callback = function(params, query, pers){
    //Personagem ainda nao possui armas
    if(pers.armas.length == 0){
      weaponController.newWeapon(params, query, pers);
    //Personagem ja possui item
    }else{
      var achou = false;
      for(var index = 0; index < pers.armas.length; index++){
         if(pers.armas[index].nome.toLowerCase() === params.arma.nome.toLowerCase()){
            achou = true;

            var retorno = 'Arma '+params.arma.nome+' já adicionada ao personagem '+pers.nome;
            params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
         }
       }
       if(!achou){
         weaponController.newWeapon(params, query, pers);
       }
    }
  };
  personagemController.buscarPersonagem(params, callback);
};

weaponController.newWeapon = function(params, query, pers){

  pers.armas.push(params.arma);
  var subArma = pers.armas[0];
  subArma.isNew;

  pers.save(function (err) {
    if (err) {personagemController.erro(err, params, 'Erro ao salvar arma '+params.arma.nome+' do personagem '+pers.nome);}
    else{
      var retorno = 'Arma '+params.arma.nome+' adicionada ao personagem '+pers.nome;
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    }
  });
};

weaponController.listWeapon = function(params){

  var callback = function(params, query, pers){
    var retorno = pers.armas.length ? 'Armas do '+pers.nome+':' : 'Personagem '+pers.nome+ ' não possui armas';
    for(var index = 0; index < pers.armas.length; index++){
      retorno += '\n  - '+ pers.armas[index].nome + ', dano: ' + pers.armas[index].dano + ', ba: '+ pers.armas[index].ba;
    }
    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };

  personagemController.buscarPersonagem(params, callback);
};

weaponController.removeWeapon = function(params){

  var callback = function(params, query, pers){

    for(var index = 0; index < pers.armas.length; index++){
      if(pers.armas[index].nome.toLowerCase() === params.arma.toLowerCase()){

        pers.armas.remove(pers.armas[index]);
        pers.save(function (err) {
          if (err) {personagemController.erro(err, params, 'Erro ao remover arma '+params.arma+' do personagem '+params.nome);}
          else{
            var retorno = 'Arma '+params.arma+' removida do personagem '+params.nome;
            params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
          }
        });
      }
    }
  };

  personagemController.buscarPersonagem(params, callback);
};


module.exports = weaponController;
