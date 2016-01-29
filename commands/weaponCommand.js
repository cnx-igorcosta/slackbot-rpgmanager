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
  //[Weapon ou weapon] [nome do personagem] [+] [(][nome da arma][,][descricao - opcional][,][dano da arma][,][bonus de ataque]
  //Ex: 'Weapon Gandalf - Glamdring'. remove a arma do personagem.
}else if(/^(W|w)eapon\s*(\s\w*)*\+\s*\(\s*(\s*\w*)*(,(\s\w*)*)?,\s*\d+(D|d)\d+(\s*(\+|-)\s*\d+)?\s*,\s*\d+\s*\)\s*$/.test(params.msg)){
    try{
      var msg = params.msg.replace(/^(W|w)eapon/g,"").trim();

      var dados = quebrarValoresWeapon(msg);
      params.nome = dados.nome;
      params.arma = dados.arma;
      weaponController.addWeapon(params);

    }catch(err){
      console.log(err);
      params.bot.postMessageToChannel(params.channel.name, 'Erro de sintaxe ao adicionar arma ao personagem', {as_user: true});
    }

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

  dados.nome = msg.substring(0 , msg.indexOf('+')).trim();
  var nomeArma = msg.match(/\(\s*(\s*\w*)*,/);
  if(nomeArma){
    arma.nome =  nomeArma[0].replace(/\(/g,'').replace(/,/g,'').trim();
  }
  var descricao = msg.match(/,(\s\w*)*,|^(,\s*\d+(D|d)\d+\s*((\+|-)\s*\d+)?\s*)/);
  if(descricao){
    arma.descricao =  descricao[0].replace(/,/g,'').trim();
  }
  var dano = msg.match(/,\s*\d+(D|d)\d+\s*((\+|-)\s*\d+)?\s*,/);
  if(dano){
    arma.dano = dano[0].replace(/,/g,'').replace(/\s/g,'');
  }
  var ba = msg.match(/,\s*\d+\s*\)/);
  if(ba){
    arma.ba = ba[0].replace(/,/g,'').replace(/\)/g,'').replace(/\s/g,'');
  }
  dados.arma = arma;

  return dados;
};

module.exports = weaponCommand;
