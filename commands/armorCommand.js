var armorController = require('../controllers/armorController');

var removeArmor = function(params){

  var msg = params.msg.replace(/^(A|a)rmor/g,'').trim();
  var dados = quebrarValoresArmor(msg);
  params.nome = dados.nome;
  params.armadura = msg.match(/\(\s*(\s*\w*)*\)/)[0].replace(/\(/g,'').replace(/\)/g,'').trim();

  armorController.removeArmor(params);
}
var addArmor = function(params){

  var msg = params.msg.replace(/^(A|a)rmor/g,'').trim();
  var dados = quebrarValoresArmor(msg);
  params.nome = dados.nome;
  params.armadura = dados.armadura;

  armorController.addArmor(params);
}
var listArmor = function(params){

  var msg = params.msg.replace(/^(A|a)rmor/g,'').trim();
  params.nome = msg.substring(0, msg.indexOf('?'));

  armorController.listArmor(params);
}

var quebrarValoresArmor = function(msg){
  var dados = {};
  var armadura = {};

  var simbolo = msg.match(/(\+|-|\?)/)[0];
  dados.nome = msg.substring(0 , msg.indexOf(simbolo)).trim();
  var nomeArmadura = msg.match(/\(\s*(\s*\w*)*,/);
  if(nomeArmadura){
    armadura.nome =  nomeArmadura[0].replace(/\(/g,'').replace(/,/g,'').trim();
  }
  var descricao = msg.match(/,(\s\w*)*,/);
  if(descricao){
    armadura.descricao =  descricao[0].replace(/,/g,'').trim();
  }
  var ca = msg.match(/,\s*\d+\s*\)/);
  if(ca){
    armadura.ca = ca[0].replace(/,/g,'').replace(/\)/g,'').replace(/\s/g,'');
  }
  dados.armadura = armadura;

  return dados;
};


var armorCommand = function(params){
  //verifica se texto se encaixa na estrutura:
  //[Armor ou armor] [nome do personagem] [-] [(][nome da armadura][)]
  //Ex: 'Armor Aragorn - Cota de malha'. remove a arma do personagem.
  if(/^(A|a)rmor\s+(\s*\w*)*\-\s*\((\s*\w*)*\s*\)\s*$/.test(params.msg)){
    removeArmor(params);

  //verifica se texto se encaixa na estrutura:
  //[Armor ou armor] [nome do personagem] [+] [(][nome da armadura][,][descricao - opcional][,][ca da armadura][)]
  //Ex: 'Weapon Gandalf - Glamdring'. remove a arma do personagem.
  }else if(/^(A|a)rmor\s*(\s\w*)*\+\s*\(\s*(\s*\w*)*(,(\s\w*)*)?,\s*\d+\s*\)\s*$/.test(params.msg)){
    addArmor(params);
  }
  //verifica se texto se encaixa na estrutura:
  //[Armor ou armor] [nome do personagem] [?]
  //Ex: 'Armor Aragorn ?'. consulta as armaduras do personagem.
  else if(/^(A|a)rmor\s+(\s*\w*)*\?\s*$/.test(params.msg)){
    listArmor(params);
  }
};

module.exports = armorCommand;
