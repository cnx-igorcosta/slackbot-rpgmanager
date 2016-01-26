var personagemController = require('./personagemController');

var help = function(bot, msg, channel){
  personagemController.help(bot, channel);
}

var salvarNovo = function(bot, msg, channel){
  //Texto deve ser enviado com estrutura nome:valor separando por virgula entre parametros
  // Ex: "new nome:Aragorn, raca:humano, classe:guerreiro, for:18, des:15, con:16, int:14, sab:16, car:12, pv:10"
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
  //verifica se texto se encaixa na estrutura:
  //[PV, Pv, pV, pv ou pvtotal] [nome do personagem] [+, - ou =] [quantidade de pvs]
  //Ex: 'pv Gandalf +5' o símbolo pode ser (+,- ou =) somar ao pv já existente,
  //diminuir ou gerar novo valor.
  if(/^(p|P)(v|V)((T|t)otal)?\s+\w+(\s\w+)*\s*(\+|-|=)\s*\d+\s*$/.test(msg)){
    //substitui pv ou pvTotal por ''
    var pv = msg.replace(/(p|P)(v|V)((T|t)otal)?/g,"");
    //pega o nome
    var dados = quebrarValores(pv);
    var params = {nome: dados.nome, valor: dados.valor};

    if((msg.toLowerCase().indexOf('pvtotal')) > -1){
      //seta pv total
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
  } else if(/^(p|P)(v|V)((T|t)otal)?\s+\w+(\s\w+)*\s*\?\s*$/.test(msg)){

  }
};

var experiencia = function(bot, msg, channel){
  //verifica se texto se encaixa na estrutura:
  //{[XP,Xp,xP ou xp] [nome do personagem] [+, - ou =] [quantidade de experiencia]}
  //Ex: 'xp Gandalf +1000' o símbolo pode ser (+,- ou =) somar a xp já existente,
  //diminuir ou gerar novo valor.
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
  //verifica se texto se encaixa na estrutura:
  //{[Item ou item] [nome personagem] [+ ou -] [(][nome do item],[descricao - opcional],[quantidade][)]}
  //Exemplo: 'item Gandalf + (Glamdring, brilha perto de orcs, 1)', 'item Legolas - (flecha caça, 1)'
  //o símbolo pode ser (+, - ou ?) (adicionar item, diminuir item, consultar todos)
  if(/^(I|i)tem\s+\w+(\s\w+)*\s*(\+|-)\s*\(\s*\w+(\s\w+)*\s*[,](\s*\w+(\s\w+)*\s*[,])?\s*\d+\s*\)\s*$/.test(msg)){
    //substitui item por ''
    var xp = msg.replace(/^(I|i)tem/g,"");


  //verifica se texto se encaixa na estrutura:
  //{[Item ou item] [nome personagem] [?]}
  //Ex: 'Item Golum ?'
  }else if(/^(I|i)tem\s+\w+(\s\w+)*\s*\?\s*$/.test(msg)){

  }
};

var rolarDado = function(bot, msg, channel){
  //verifica se texto se encaixa na estrutura:
  //{[Roll ou roll] [quantidade de dados][D ou d][quantidade de faces do dado] [+ ou -, opcional][modificador, opcional]}
  //Ex: 'Roll 1d6', 'roll 1d20 -1', 'roll 2d8 +2'
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
  {nome : 'update', comando : null},
  {nome : 'delete', comando : null},
  {nome : 'pv', comando : pontosDeVida},
  {nome : 'xp', comando : experiencia},
  {nome : 'item', comando : item},
  {nome : 'weapons', comando : null},
  {nome : 'armor', comando : null},
  {nome : 'stats', comando : null},
  {nome : 'roll', comando : rolarDado}
];

module.exports = comandos;
