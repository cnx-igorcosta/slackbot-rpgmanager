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
        achou = true;
         if(pers.armas[index].nome.toLowerCase() === params.arma.nome.toLowerCase() &&
              pers.armas[index].descricao === params.arma.descricao){

            var retorno = 'Arma '+params.armas.nome+' já adicionada ao personagem '+pers.nome;
            params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
         }
       }
       if(!achou){
         console.log('já tem item e vai adicionar outro');
         itemController.newWeapon(params, query, pers);
       }
    }
  };
  console.log('vai buscar');
  personagemController.buscarPersonagem(params, callback);
};

weaponController.newWeapon = function(params, query, pers){
  console.log(JSON.stringify(params.arma));
  var arma = {
    nome: params.arma.nome,
    descricao: params.arma.descricao,
    dano: params.arma.dano,
    ba: params.arma.ba
  };
  pers.armas.push(arma);
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
