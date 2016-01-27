var personagemController = require('./personagemController');

var help = function(params){
  personagemController.help(params);
}

var salvarNovo = function(params){
  //Texto deve ser enviado com estrutura nome:valor separando por virgula entre parametros
  // Ex: "new nome:Aragorn, raca:humano, classe:guerreiro, for:18, des:15, con:16, int:14, sab:16, car:12, pv:10"
  var personagemTxt = '{\"' + params.msg + '\"}';
  //remove new statement and include "" in all params to parse to JSON
  personagemTxt = personagemTxt.replace(/new/g, "").replace(/\s/g,"")
    .replace(/:/g,"\":\"").replace(/,/g,"\",\"");
  //TODO: try/catch
  params.pers = JSON.parse(personagemTxt);
  personagemController.salvar(params);
}

var listarTodos = function(params){
  if(/^(L|l)ist\s*$/.test(params.msg)){
    personagemController.listar(params);
  }
}

var pontosDeVida = function(params){
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
      personagemController.setPvTotal(params);
    }else{
      if((dados.simbolo.indexOf('+')) > -1){
        //Adiciona pvs
        personagemController.addPv(params);
      }else if((dados.simbolo.indexOf('-')) > -1){
        //Remove pvs
        personagemController.removePv(params);
      }else{
        //Seta novo valor
        personagemController.setPv(params);
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

      personagemController.consultaPv(params);
  }
};

var experiencia = function(params){
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
      personagemController.addXp(params);
    }else if((dados.simbolo.indexOf('-')) > -1){
      //Remove xp
      personagemController.removeXp(params);
    }
  } else if(/^(x|X)(p|P)\s+\w+(\s\w+)*\s*\?\s*$/.test(params.msg)){
    //substitui pv ou pvTotal por ''
      var xp = params.msg.replace(/^(x|X)(p|P)/g,"");
      //pega o nome
      var dados = quebrarValores(xp);
      params.nome = dados.nome;

      personagemController.consultaXp(params);
  }
};

var item = function(params){
  //verifica se texto se encaixa na estrutura:
  //[Item ou item] [nome personagem] [+ ou -] [(][nome do item],[descricao - opcional],[quantidade - opcional][)]
  //Exemplo: 'item Gandalf + (Glamdring, brilha perto de orcs, 1)', 'item Legolas - (flecha caça, 1)'
  //o símbolo pode ser (+, - ou ?) (adicionar item, diminuir item, consultar todos)
  if(/^(I|i)te(m|ns)\s*\w+(\s\w+)*\s*(\+|-)\s*\(\s*\w+(\s\w+)*\s*([,]\s*\w+(\s\w+)*\s*)?([,]\s*\d+\s*)?\)\s*$/.test(params.msg)){
    var dados = quebrarValoresItem(params.msg);
    params.nome = dados.nome;
    params.simbolo = dados.simbolo;
    params.item = dados.item;
    params.descricao = dados.descricao;
    params.quantidade = dados.quantidade ? dados.quantidade : 1;

  if((dados.simbolo.indexOf('+')) > -1){
    personagemController.addItem(params);
  }
  else if((dados.simbolo.indexOf('-')) > -1){
    personagemController.removeItem(params);
  }
  //verifica se texto se encaixa na estrutura:
  //{[Item ou item] [nome personagem] [?]}
  //Ex: 'Item Golum ?'
  }else if(/^(I|i)te(m|ns)\s*\w+(\s\w+)*\s*\?\s*$/.test(params.msg)){
    var dados = quebrarValoresItem(params.msg);
    params.nome = dados.nome;

    personagemController.listItens(params);
  }
};

var gold = function(params){
  //verifica se texto se encaixa na estrutura:
  //[Gold ou gold] [nome personagem] [+ ou -] [quantidade]
  //Exemplo: 'Gold Gimli + 100', 'Gold Pipin - 10'
  //o símbolo pode ser (+, - ou ?) (adicionar gold, diminuir gold, consultar gold)
  if(/^(G|g)old\s*\w+(\s\w+)*\s*(\+|-)\s*\d+\s*$/.test(params.msg)){

    if((dados.simbolo.indexOf('+')) > -1){
      personagemController.addGold(params);
    }
    else if((dados.simbolo.indexOf('-')) > -1){
      personagemController.removeGold(params);
    }
  }
  //verifica se texto se encaixa na estrutura:
  //[Gold ou gold] [nome personagem] [?]
  //Ex: 'Gold Frodo ?'
  else if(/^(G|g)old\s*\w+(\s\w+)*\s*\?\s*$/.test(params.msg)){

    personagemController.listGold(params);
  }
}

var rolarDado = function(params){
  //verifica se texto se encaixa na estrutura:
  //{[Roll ou roll] [quantidade de dados][D ou d][quantidade de faces do dado] [+ ou -, opcional][modificador, opcional]}
  //Ex: 'Roll 1d6', 'roll 1d20 -1', 'roll 2d8 +2'
  if(/^(R|r)oll\s*\d+(D|d)\d+\s*((\+|-)\d+\s*)?$/.test(params.msg)){
    //Remove texto Roll
    var text = params.msg.replace(/(R|r)oll/g,"").replace(/\s/g,"").toLowerCase();
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

    params.vezes = vezes;
    params.faces = faces
    params.modif = modif;
    personagemController.rolarDado(params);
  }
};

var quebrarValores = function(msg){
  var dados = {};
  //pega o nome
  var nome = msg.match(/\w+(\s\w+)*/);
  dados.nome = nome[0];
  //pega o símbolo e valor (-1,+5,=20)
  var simbolo = msg.match(/(\+|-|=)\s*\d+/);
  dados.simbolo = simbolo ? simbolo[0] : '';
  //pega o valor sem o simbolo (1,5,20)
  var valor = dados.simbolo.replace(/(\+|-|=)/g,"").replace(/\s/g,"");
  dados.valor = valor;

  return dados;
}

var quebrarValoresItem = function(msg){
  var dados = {};

  //substitui item por ''
  var msg = msg.replace(/^(I|i)te(m|ns)/g,'');
  dados.simbolo = msg.match(/(\+|-|\?)/) ? msg.match(/(\+|-|\?)/)[0] : null;
  dados.nome = msg.substring(0, msg.indexOf(dados.simbolo)).trim();
  //Recupera valor entre '(' e ','. Ex ([nome do item],
  //caso tenha a descricao ou quantidade após o nome do item
  if(/\(\s*\w+(\s\w+)*\s*[,]/.test(msg)){
    dados.item = msg.substring((msg.indexOf('(') + 1), msg.indexOf(','));
  //Recupera valor entre '(' e ')'. Ex ([nome do item])
  //caso não tenha a descricao nem quantidade após o nome do item
  }else if(/\(\s*\w+(\s\w+)*\s*\)/.test(msg)){
    dados.item = msg.substring((msg.indexOf('(') + 1), msg.indexOf(')'))
  }
  //Recupera valor entre ',' e outra ','. Ex ,[descricao item],
  //caso tenha a quantidade após a descricao
  if(/[,]\s*\w+(\s\w+)*\s*[,]/.test(msg)){
    dados.descricao = msg.substring((msg.indexOf(',') + 1), msg.lastIndexOf(','));
  }else if(/([,]\s*\d+\s*)\)/.test(msg)){
    dados.quantidade = msg.substring((msg.lastIndexOf(',') + 1), msg.lastIndexOf(')'));
  //Recupera valor entre ',' e ')'. Ex ,[descricao item])
  //caso nao tenha a quantidade após a descricao
  }else if(/[,]\s*\w+(\s\w+)*\s*\)/.test(msg)){
    dados.descricao = msg.substring((msg.indexOf(',') + 1), msg.lastIndexOf(')'));
  }

  return dados;
};

var comandos = [
  {nome: 'rpghelp', comando : help},
  {nome : 'new', comando : salvarNovo},
  {nome : 'list', comando : listarTodos},
  {nome : 'update', comando : null},
  {nome : 'delete', comando : null},
  {nome : 'pv', comando : pontosDeVida},
  {nome : 'xp', comando : experiencia},
  {nome : 'item', comando : item},
  {nome : 'itens', comando : item},
  {nome : 'weapons', comando : null},
  {nome : 'armor', comando : null},
  {nome : 'stats', comando : null},
  {nome : 'gold', comando : null},
  {nome : 'roll', comando : rolarDado}
];

module.exports = comandos;
