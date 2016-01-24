var personagemController = require('./personagemController');

var help = function(bot, msg, channel){
  personagemController.help(bot, channel);
}

var salvarNovo = function(bot, msg, channel){
  var personagemTxt = '{\"' + msg + '\"}';
  //remove new statement and include "" in all params to parse to JSON
  personagemTxt = personagemTxt.replace(/new/g, "").replace(/\s/g,"")
    .replace(/:/g,"\":\"").replace(/,/g,"\",\"");
  var personagem = JSON.parse(personagemTxt);
  personagemController.salvar(bot, personagem, channel);
}

var listarTodos = function(bot, msg, channel){
  if(/^(L|l)ist\s*$/.test(msg)){
    personagemController.listar(bot, msg, channel);
  }
}

var pontosDeVida = function(bot, msg, channel){
  //verifica se comando está correto ex: 'pv Gandalf +5' o símbolo pode ser
  //(+,- ou =) somar ao pv já existente, diminuir ou gerar novo valor.
  if(/^(p|P)(v|V)((T|t)otal)?\s+\w+(\s\w+)*\s+(\+|-|=)\s*\d\s*$/.test(msg)){
    //substitui pv ou pvTotal por ''
    var pv = msg.replace(/(p|P)(v|V)((T|t)otal)?/g,"");
    //pega o nome
    var nome = pv.match(/\w+(\s\w+)*/);
    //pega o símbolo e valor (-1,+5,=20)
    var simbolo = pv.match(/(\+|-|=)\s*\d/);
    //pega o valor sem o simbolo (1,5,20)
    var valor = simbolo[0].replace(/(\+|-|=)/g,"").replace(/\s/g,"");

    var params = {nome: nome[0], valor: valor};

    if((msg.toLowerCase().indexOf('pvtotal')) > -1){
      personagemController.setPvTotal(bot, channel, params);
    }else{
      if((simbolo.indexOf('+')) > -1){
        //TODO: criar método
        personagemController.addPv(bot, channel, params);
      }
      //TODO: criar método
      else if((simbolo.indexOf('-')) > -1){
        personagemController.removePv(bot, channel, params);
      }
      else{
        personagemController.setPv(bot, channel, params);
      }
    }
  }
}

var comandos = [
  {nome: 'rpghelp', comando : help},
  {nome : 'new', comando : salvarNovo},
  {nome : 'list', comando : listarTodos},
  {nome : 'pv', comando : pontosDeVida},
  {nome : 'xp', comando : null},
  {nome : 'items', comando : null},
  {nome : 'weapons', comando : null},
  {nome : 'armor', comando : null},
  {nome : 'roll', comando : null},
];

module.exports = comandos;
