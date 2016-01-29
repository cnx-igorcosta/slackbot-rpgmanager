var weaponController = require('../controllers/weaponController');

var weaponCommand = function(params){
  //verifica se texto se encaixa na estrutura:
  //[Weapon ou weapon] [nome do personagem] [-] [nome da arma]
  //Ex: 'Weapon Gandalf - Glamdring'. remove a arma do personagem.
  if(/^(W|w)eapon\s+\w+(\s\w+)*\s+\-\s*\w+(\s\w+)*\s*$/.test(params.msg)){
    console.log('caiua aqui');

  //verifica se texto se encaixa na estrutura:
  //[Weapon ou weapon] [nome do personagem] nome:[nome da arma], descricao:[descricao - opcional], dano:[dano da arma], ba:[bonus de ataque]
  //Ex: 'Weapon Gandalf - Glamdring'. remove a arma do personagem.
  }else if(/^(W|w)eapon\s+\w+(\s\w+)*\s*nome\s*:.*(,\s*descricao\s*:.*)?,\s*dano\s*:.*,\sba\s*:\s*\d+\s*$/.test(params.msg)){
    try{
      var msg = params.msg.replace(/^(W|w)eapon/g,"").trim();
      params.nome = msg.substring(0 , msg.indexOf("nome"));

      var persString = msg.substring(msg.indexOf(params.nome)+params.nome.length, msg.length)
        .trim().replace(/:/g,"\":\"").replace(/,/g,"\",\"");

      var arma = JSON.parse('{"' + persString + '"}');
      params.arma = arma;
      console.log('vai salvar');
      weaponController.addWeapon(params);

    }catch(err){
      console.log(err);
      params.bot.postMessageToChannel(params.channel.name, 'Erro de sintaxe ao adicionar arma ao personagem', {as_user: true});
    }

  }else if(true){
    //TODO: comando '?'
  }
  console.log('não caiu');
};

module.exports = weaponCommand;
