var personagemController = require('./personagemController');
var modificadores = require('../rules/modificadoresAtributo');
var rulesController = require('./rulesController');

var statsController = {};

statsController.listStats = function(params){

  var callback = function(params, query, pers){

    var retorno = 'Personagem: '+pers.nome+', classe: '+pers.classe+ ', raça: '+pers.raca+
    ', Nível:'+pers.nivel+', xp:'+pers.xp+'\n'+
    'FOR '+pers.for+'('+modificadores(pers.for)+'), DES '+pers.des+'('+modificadores(pers.des)+
    '), CON '+pers.con+'('+modificadores(pers.con)+'), INT '+pers.int+'('+modificadores(pers.int)+
    '), SAB '+pers.sab+'('+modificadores(pers.sab)+'), CAR '+pers.car+'('+modificadores(pers.car)+')\n'+
    'pv:'+pers.pv+'/'+pers.pvTotal;

    var ca = 10 + modificadores(pers.des);
    var descricaoCa = modificadores(pers.des) > 0 ? modificadores(pers.des)+' DES' : '';
    for(var index = 0; index < pers.armaduras.length; index++){
      ca +=  pers.armaduras[index].ca;
      if(descricaoCa || index > 0){ descricaoCa += ', '; }
      descricaoCa += pers.armaduras[index].ca+' '+pers.armaduras[index].nome;
    }

    descricaoCa = descricaoCa ? '('+ descricaoCa +')' : undefined;
    retorno += '\nCA:' + ca;
    retorno = descricaoCa ? retorno+descricaoCa : descricaoCa;

    for(var index = 0; index < pers.armas.length; index++){
      // retorno += '\nAtaque: '+pers.armas[index].nome+', dano: '+pers.armas[index].dano+', BA:'+pers.armas[index].ba;
      retorno += '\n'+ descricaoAtaque(pers.armas[index], pers);
    }

    var rulesStats = rulesController.statsByClass(pers);
    if(rulesStats){
      retorno += rulesStats
    }

    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };

  personagemController.buscarPersonagem(params, callback);
}

var descricaoAtaque = function(arma, pers){
  var retorno = 'Ataque: ' + arma.nome + ', dano: ' + arma.dano + ', BA: ';
  var modificadorForca = modificadores(pers.for);
  var modificadorDestreza = modificadores(pers.des);
  var modificadorClasse = rulesController.getRule(pers.classe, pers.nivel);

  var descricaoArma = '';
  var descricaoAtributo = '';
  var descricaoClasse = '';
  var descricaoBa = '';
  var baTotal = [];

  if(arma.tipo.toLowerCase() === 'c'){
    for(var index = 0; index < modificadorClasse.ba.length; index++){
      baTotal.push(arma.ba + modificadorForca + modificadorClasse.ba[index]);
    }
    descricaoAtributo = (modificadorForca > 0 ? '+' + modificadorForca : modificadorForca) + ' FOR';
  }
  if(arma.tipo.toLowerCase() === 'd'){
    for(var index = 0; index < modificadorClasse.ba.length; index++){
      baTotal.push(arma.ba + modificadorDestreza + modificadorClasse.ba[index]);
    }
    descricaoAtributo = (modificadorDestreza > 0 ? '+' + modificadorDestreza : modificadorDestreza) + ' DES';
  }

  if(baTotal.length > 0 && baTotal[0] != 0){
    descricaoArma = (arma.ba > 0 ? '+' + arma.ba : arma.ba) + ' arma';

    for(var index = 0; index < modificadorClasse.ba.length; index++){
      if(index > 0){descricaoClasse += '/';}
      descricaoClasse += '+' + modificadorClasse.ba[index];
    }
    descricaoClasse +=  ' classe';

    for(var index = 0; index < baTotal.length; index++){
      if(index > 0){descricaoBa += '/';}
      descricaoBa += (baTotal[index] > 0 ? '+' + baTotal[index] : baTotal[index])
    }
    descricaoBa += ' (' + descricaoClasse + ', ' + descricaoArma + ', ' + descricaoAtributo + ')';
  }

  retorno += descricaoBa;
  return retorno;
};

module.exports = statsController;
