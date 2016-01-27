var pvController = require('../controllers/pvController');
var quebrarValores = require('./quebrarValores');

var pvCommand = function(params){
  //verifica se texto se encaixa na estrutura:
  //[PV, Pv, pV, pv ou pvtotal] [nome do personagem] [+, - ou =] [quantidade de pvs]
  //Ex: 'pv Gandalf +5' o símbolo pode ser (+,- ou =) somar ao pv já existente,
  //diminuir ou gerar novo valor.
  if(/^(p|P)(v|V)((T|t)otal)?\s+\w+(\s\w+)*\s*(\+|-|=)\s*\d+\s*$/.test(params.msg)){
    //substitui pv ou pvTotal por ''
    var pv = params.msg.replace(/(p|P)(v|V)((T|t)otal)?/g,"");
    //pega o nome e valor
    var dados = quebrarValores(pv);
    params.nome = dados.nome;
    params.valor = dados.valor;

    if((params.msg.toLowerCase().indexOf('pvtotal')) > -1){
      //seta pv total
      pvController.setPvTotal(params);
    }else{
      if((dados.simbolo.indexOf('+')) > -1){
        //Adiciona pvs
        pvController.addPv(params);
      }else if((dados.simbolo.indexOf('-')) > -1){
        //Remove pvs
        pvController.removePv(params);
      }else{
        //Seta novo valor
        pvController.setPv(params);
      }
    }
  //verifica se texto se encaixa na estrutura:
  //[PV, Pv, pV, pv ou pvtotal] [nome do personagem] [?]
  //Ex: 'pv Gandalf ?'
  } else if(/^(p|P)(v|V)((T|t)otal)?\s+\w+(\s\w+)*\s*\?\s*$/.test(params.msg)){
    //substitui pv ou pvTotal por ''
      var pv = params.msg.replace(/(p|P)(v|V)((T|t)otal)?/g,"");
      //pega o nome
      var dados = quebrarValores(pv);
      params.nome = dados.nome;

      pvController.consultaPv(params);
  }
};

module.exports = pvCommand;
