var quebrarValores = function(msg){
  var dados = {};

  //pega o símbolo e valor (-1,+5,=20)
  dados.simbolo = msg.match(/(\+|-|=|\?)/) ? msg.match(/(\+|-|=|\?)/)[0] : null;
  //pega o nome
  dados.nome = msg.substring(0, msg.indexOf(dados.simbolo)).trim();

  var nome = msg.match(/\w+(\s\w+)*/);
  dados.nome = nome[0];
  var simboloValor = msg.match(/(\+|-|=)\s*\d+/) ? msg.match(/(\+|-|=)\s*\d+/) : null;
  //pega o valor sem o simbolo (1,5,20)
  var valor = simboloValor ? simboloValor[0].replace(/(\+|-|=)/g,"").replace(/\s/g,"") : null;
  dados.valor = valor;

  return dados;
}

module.exports = quebrarValores;
