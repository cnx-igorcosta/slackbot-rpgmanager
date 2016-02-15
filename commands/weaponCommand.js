var weaponController = require('../controllers/weaponController');

var weaponCommand = function(params){
  //verifica se texto se encaixa na estrutura:
  //[Weapon ou weapon] [nome do personagem] [-] [(][nome da arma][)]
  //Ex: 'Weapon Gandalf - Glamdring'. remove a arma do personagem.
  if(/^(W|w)eapon\s+(\s*\w*)*\-\s*\((\s*\w*)*\s*\)\s*$/.test(params.msg)){
    var msg = params.msg.replace(/^(W|w)eapon/g,"").trim();

    var dados = quebrarValoresWeapon(msg);
    params.nome = dados.nome;
    params.arma = msg.match(/\(\s*(\s*\w*)*\)/)[0].replace(/\(/g,'').replace(/\)/g,'').trim();
    weaponController.removeWeapon(params);

  //verifica se texto se encaixa na estrutura:
  //[Weapon ou weapon] [nome do personagem] [+] [(][nome da arma][,][dano da arma][,][bonus de ataque][,][tipo C -corpo a corpo- ou D -distancia][)]
  //Ex: 'Weapon Gandalf - Glamdring'. remove a arma do personagem.
}else if(/^(W|w)eapon\s*(\s\w*)*\+\s*\(\s*(\s*\w*)*,\s*\d+(D|d)\d+(\s*(\+|-)\s*\d+)?\s*,\s*\d+\s*\,\s*([c|C]|[d|D])\s*\)\s*$/.test(params.msg)){
    try{
      var msg = params.msg.replace(/^(W|w)eapon/g,'').trim();

      var dados = quebrarValoresWeapon(msg);
      params.nome = dados.nome;
      params.arma = dados.arma;
      weaponController.addWeapon(params);

    }catch(err){
      console.log(err);
      params.bot.postMessageToChannel(params.channel.name, 'Erro de sintaxe ao adicionar arma ao personagem', {as_user: true});
    }
    //verifica se texto se encaixa na estrutura:
    //[Weapon ou weapon] [nome do personagem] [?]
    //Ex: 'Weapon Aragorn ?'. consulta as armas do personagem.
  }else if(/^(W|w)eapon\s+(\s*\w*)*\?\s*$/.test(params.msg)){
    var msg = params.msg.replace(/^(W|w)eapon/g,"").trim();
    var dados = quebrarValoresWeapon(msg);
    params.nome = dados.nome;

    weaponController.listWeapon(params);
  }

};

var quebrarValoresWeapon = function(msg){
  var dados = {};
  var arma = {};

  var simbolo = msg.match(/(\+|-|\?)/)[0];
  dados.nome = msg.substring(0 , msg.indexOf(simbolo)).trim();
  var nomeArma = msg.match(/\(\s*(\s*\w*)*,/);
  if(nomeArma){
    arma.nome =  nomeArma[0].replace(/\(/g,'').replace(/,/g,'').trim();
  }
  var dano = msg.match(/,\s*\d+(D|d)\d+\s*((\+|-)\s*\d+)?\s*,/);
  if(dano){
    arma.dano = dano[0].replace(/,/g,'').replace(/\s/g,'');
  }
  var ba = msg.match(/,\s*\d+\s*,/);
  if(ba){
    arma.ba = ba[0].replace(/,/g,'').replace(/\s/g,'');
  }
  var tipo = msg.match(/,\s*([c|C]|[d|D])\s*\)/);
  if(tipo){
    arma.tipo = tipo[0].replace(/,/g,'').replace(/\)/g,'').replace(/\s/g,'');
  }
  dados.arma = arma;

  return dados;
};

module.exports = weaponCommand;
