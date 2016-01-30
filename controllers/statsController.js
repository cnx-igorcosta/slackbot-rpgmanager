var personagemController = require('./personagemController');
var modificadores = require('../models/modificadoresAtributo');

var statsController = {};

statsController.listStats = function(params){

  var callback = function(params, query, pers){

    var retorno = 'Personagem: '+pers.nome+', classe: '+pers.classe+ ', raça: '+pers.raca+
    ', Nível:'+pers.nivel+', xp:'+pers.xp+'\n'+
    'For:'+pers.for+'('+modificadores(pers.for)+'), Des:'+pers.des+'('+modificadores(pers.des)+
    '), Con:'+pers.con+'('+modificadores(pers.con)+'), Int:'+pers.int+'('+modificadores(pers.int)+
    '), Sab:'+pers.sab+'('+modificadores(pers.sab)+'), Car:'+pers.car+'('+modificadores(pers.car)+')\n'+
    'pv:'+pers.pv+'/'+pers.pvTotal;

    var ca = 10 + modificadores(pers.des);
    var descricaoCa = modificadores(pers.des) > 0 ? modificadores(pers.des)+' Des' : '';
    for(var index = 0; index < pers.armaduras.length; index++){
      ca +=  pers.armaduras[index].ca;
      descricaoCa += ', '+pers.armaduras[index].ca+' '+pers.armaduras[index].nome;
    }

    descricaoCa = descricaoCa ? '('+ descricaoCa +')' : undefined;
    retorno += '\nCA:' + ca;
    retorno = descricaoCa ? retorno+descricaoCa : descricaoCa;

    for(var index = 0; index < pers.armas.length; index++){
      retorno += '\nAtaque: '+pers.armas[index].nome+', dano: '+pers.armas[index].dano+', BA:'+pers.armas[index].ba;
    }

    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };

  personagemController.buscarPersonagem(params, callback);
}

module.exports = statsController;
