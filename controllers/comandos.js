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
  if(/^(p|P)(v|V)((T|t)otal)?\s+\w+(\s\w+)*\s+(\+|-|=)\s*\d+\s*$/.test(msg)){
    //substitui pv ou pvTotal por ''
    var pv = msg.replace(/(p|P)(v|V)((T|t)otal)?/g,"");
    //pega o nome
    var dados = quebrarValores(pv);
    var params = {nome: dados.nome, valor: valor};

    if((msg.toLowerCase().indexOf('pvtotal')) > -1){
      personagemController.setPvTotal(bot, channel, params);
    }else{
      if((dados.simbolo.indexOf('+')) > -1){
        //Adiciona pvs
        personagemController.addPv(bot, channel, params);
      }else if((dados.simbolo.indexOf('-')) > -1){
        //Remove pvs
        personagemController.removePv(bot, channel, params);
      }else{
        //Seta novo valor
        personagemController.setPv(bot, channel, params);
      }
    }
  }
};

var experiencia = function(bot, msg, channel){
  //verifica se comando está correto ex: 'xp Gandalf +1000' o símbolo pode ser
  //(+,- ou =) somar a xp já existente, diminuir ou gerar novo valor.
  if(/^(x|X)(p|P)\s+\w+(\s\w+)*\s+(\+|-|=)\s*\d+\s*$/.test(msg)){
    //substitui xp por ''
    var xp = msg.replace(/^(x|X)(p|P)/g,"");
    var dados = quebrarValores(xp);
    var params = {nome: dados.nome, valor: dados.valor};

    if((dados.simbolo.indexOf('+')) > -1){
      //Adiciona xp
      personagemController.addXp(bot, channel, params);
    }else if((dados.simbolo.indexOf('-')) > -1){
      //Remove xp
      personagemController.removeXp(bot, channel, params);
    }
    // }else{
    //   //Seta novo valor
    //   personagemController.setXp(bot, channel, params);
    // }
  }
};

var item = function(bot, msg, channel){
  //TODO: testar regex 'item leoncio + (vassoura,1)', 'item leoncio - (flecha caça,1)'
  if(/^(I|i)tem\s+\w+(\s\w+)*\s*(\+|-|=)\s*\(\s*\w+(\s\w+)*\s*[,]\s*\d+\s*\)\s*$/.test(msg)){
    //substitui item por ''
    var xp = msg.replace(/^(I|i)tem/g,"");
  }
};

var rolarDado = function(bot, msg, channel){
  if(/^(R|r)oll\s*\d+(D|d)\d+\s*((\+|-)\d+\s*)?$/.test(msg)){
    //Remove texto Roll
    var text = msg.replace(/(R|r)oll/g,"").replace(/\s/g,"").toLowerCase();
    //Recupera quantidade de dados a rolar
    var vezes = parseInt(text.substring(0, text.indexOf('d')));
    var faces, modif;
    //Verifica se tem modificador do valor do dado ex:(1d6+1);
    if(/^\d+[d]\d+(\+|-)\d+$/.test(text)){
      //faces do dado a rolar
      faces = (text.indexOf('+') > -1)
        ? text.substring((text.indexOf('d')+1),(text.indexOf('+')))
        : text.substring((text.indexOf('d')+1),(text.indexOf('-')));
      //modificador do dado a rolar
      modif = (text.indexOf('+') > -1)
        ? text.substring((text.indexOf('+')),(text.length))
        : text.substring((text.indexOf('-')),(text.length));
      modif = parseInt(modif);
    }else{
      //Caso não tenha modificador
      faces = parseInt(text.substring((text.indexOf('d')+1),(text.length)));
    }

    var params = {vezes : vezes,faces : faces,modif : modif};
    personagemController.rolarDado(bot, channel, params);
  }
};

var quebrarValores = function(msg){
  var dados = {};
  //pega o nome
  var nome = msg.match(/\w+(\s\w+)*/);
  dados.nome = nome[0];
  //pega o símbolo e valor (-1,+5,=20)
  var simbolo = msg.match(/(\+|-|=)\s*\d+/);
  dados.simbolo = simbolo[0];
  //pega o valor sem o simbolo (1,5,20)
  var valor = dados.simbolo.replace(/(\+|-|=)/g,"").replace(/\s/g,"");
  dados.valor = valor;

  return dados;
}



var comandos = [
  {nome: 'rpghelp', comando : help},
  {nome : 'new', comando : salvarNovo},
  {nome : 'list', comando : listarTodos},
  {nome : 'pv', comando : pontosDeVida},
  {nome : 'xp', comando : experiencia},
  {nome : 'item', comando : item},
  {nome : 'weapons', comando : null},
  {nome : 'armor', comando : null},
  {nome : 'roll', comando : rolarDado}
];

module.exports = comandos;
