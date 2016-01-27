var itemController = require('../controllers/itemController');

var itemCommand = function(params){
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
    itemController.addItem(params);
  }
  else if((dados.simbolo.indexOf('-')) > -1){
    itemController.removeItem(params);
  }
  //verifica se texto se encaixa na estrutura:
  //{[Item ou item] [nome personagem] [?]}
  //Ex: 'Item Golum ?'
  }else if(/^(I|i)te(m|ns)\s*\w+(\s\w+)*\s*\?\s*$/.test(params.msg)){
    var dados = quebrarValoresItem(params.msg);
    params.nome = dados.nome;

    itemController.listItens(params);
  }
};

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

module.exports = itemCommand;
