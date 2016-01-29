var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var weaponController = {};

weaponController.addWeapon = function(params){

  var callback = function(params, query, pers){
    console.log('caiu no callback');
    //Personagem ainda nao possui armas
    if(pers.armas.length == 0){
      weaponController.newWeapon(params, query, pers);
    //Personagem ja possui item
    }else{
      var achou = false;
      console.log('pers.armas: '+pers.armas);
      for(var index = 0; index < pers.armas.length; index++){
         if(pers.armas[index].nome.toLowerCase() === params.arma.nome.toLowerCase() &&
              pers.armas[index].descricao === params.arma.descricao){
            achou = true;

            var retorno = 'Arma '+params.arma.nome+' já adicionada ao personagem '+pers.nome;
            params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
         }
       }
       console.log('achou: '+achou);
       if(!achou){
         console.log('já tem item e vai adicionar outro');
         weaponController.newWeapon(params, query, pers);
       }
    }
  };
  console.log('vai buscar');
  personagemController.buscarPersonagem(params, callback);
};

weaponController.newWeapon = function(params, query, pers){
  console.log(JSON.stringify(params.arma));
  // var arma = {};
  // arma.nome = params.arma.nome;
  // arma.descricao = params.arma.descricao;
  // arma.dano = params.arma.dano;
  // arma.ba= params.arma.ba;

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


module.exports = weaponController;
