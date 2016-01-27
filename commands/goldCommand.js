var goldController = require('../controllers/goldController');
var quebrarValores = require('./quebrarValores');

var goldCommand = function(params){
  //verifica se texto se encaixa na estrutura:
  //[Gold ou gold] [nome do personagem] [+ ou -] [quantidade de gold]
  //Ex: 'Gold Gandalf +50' o símbolo pode ser (+ ou -) somar ao gold já existente ou diminuir
  if(/^(G|g)old\s+\w+(\s\w+)*\s*(\+|-)\s*\d+\s*$/.test(params.msg)){

    var msg = params.msg.replace(/(G|g)old/g,"").trim();
    var dados = quebrarValores(msg);
    params.nome = dados.nome;
    params.valor = dados.valor;

    if((dados.simbolo.indexOf('+')) > -1){
      //Adiciona pvs
      goldController.addGold(params);
    }else if((dados.simbolo.indexOf('-')) > -1){
      //Remove pvs
      goldController.removeGold(params);
    }
  //verifica se texto se encaixa na estrutura:
  //[PV, Pv, pV, pv ou pvtotal] [nome do personagem] [?]
  //Ex: 'pv Gandalf ?'
  }else if(/^(G|g)old\s+\w+(\s\w+)*\s*\?\s*$/.test(params.msg)){

    var msg = params.msg.replace(/(G|g)old/g,"").trim();
    var dados = quebrarValores(msg);
    params.nome = dados.nome;

    goldController.consultarGold(params);
  }
};

module.exports = goldCommand;
