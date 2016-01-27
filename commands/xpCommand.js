var xpController = require('../controllers/xpController');
var quebrarValores = require('./quebrarValores');

var xpCommand = function(params){
  //verifica se texto se encaixa na estrutura:
  //{[XP,Xp,xP ou xp] [nome do personagem] [+, - ou =] [quantidade de experiencia]}
  //Ex: 'xp Gandalf +1000' o símbolo pode ser (+,- ou =) somar a xp já existente,
  //diminuir ou gerar novo valor.
  if(/^(x|X)(p|P)\s+\w+(\s\w+)*\s+(\+|-|=)\s*\d+\s*$/.test(params.msg)){
    //substitui xp por ''
    var xp = params.msg.replace(/^(x|X)(p|P)/g,"");
    var dados = quebrarValores(xp);
    params.nome = dados.nome;
    params.valor = dados.valor;

    if((dados.simbolo.indexOf('+')) > -1){
      //Adiciona xp
      xpController.addXp(params);
    }else if((dados.simbolo.indexOf('-')) > -1){
      //Remove xp
      xpController.removeXp(params);
    }
  } else if(/^(x|X)(p|P)\s+\w+(\s\w+)*\s*\?\s*$/.test(params.msg)){
    //substitui pv ou pvTotal por ''
      var xp = params.msg.replace(/^(x|X)(p|P)/g,"");
      //pega o nome
      var dados = quebrarValores(xp);
      params.nome = dados.nome;

      xpController.consultaXp(params);
  }
};

module.exports = xpCommand;
