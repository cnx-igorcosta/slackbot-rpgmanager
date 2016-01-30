var levelController = require('../controllers/levelController');

var levelCommand = function(params){
  //verifica se texto se encaixa na estrutura:
  //[Level ou level] [nome do personagem] [+ ou -]
  //Ex: 'level Gandalf +' o símbolo pode ser (+ ou -) somar ao level já existente ou diminuir
  if(/^(L|l)evel\s+\w+(\s\w+)*\s*(\+|-|\?)\s*$/.test(params.msg)){

    var msg = params.msg.replace(/(L|l)evel/g,"").trim();
    var simbolo = msg.substring((msg.length - 1),msg.length);
    params.nome = msg.substring(0, msg.indexOf(simbolo));

    if((simbolo.indexOf('+')) > -1){
      //Adiciona level
      levelController.addLevel(params);
    }else if((simbolo.indexOf('-')) > -1){
      //Remove level
      levelController.removeLevel(params);
    }else if((simbolo.indexOf('?')) > -1){
      //Remove level
      levelController.consultarLevel(params);
    }
  }
};

module.exports = levelCommand;
