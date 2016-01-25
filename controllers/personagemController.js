var connection = require('../config/database.js')('mongodb://localhost/rpgmanager');
var Personagem = require('../models/personagem');
var SlackBot = require('slackbots');

module.exports = function () {

  var controller = {};

  controller.erro = function(bot, channel, msg){
    bot.postMessageToChannel(channel.name, msg, {as_user: true});
  }

  controller.help = function(bot, channel){

    var retorno = 'rpgmanager comandos:\n'+
    '- new - Salva novo personagem, nome, raca e classe,  atributos e pv devem ser enviados.\n'+
    '   Ex: "new nome:Aragorn, raca:humano, classe:guerreiro, for:18, des:15, con:16, int:14, sab:16, car:12, pv:10".\n\n'+
    '- list - Lista os nomes de todos os personagens salvos.\n\n'+
    '- pvTotal - cria novo valor de pv total do personagem seguindo a estrutura:\n'+
    '   [PVTotal, PvTotal, pVtotal ou pvtotal] [nome do personagem] [=] [quantidade de pvs]\n'+
    '   Ex: "pvTotal Gandald = 50".\n\n'+
    '- pv - Adiciona, remove, gera ou consulta pv do personagem seguindo a estrutura:\n'+
    '   [PV, Pv, pV ou pv] [nome do personagem] [+, - ou =] [quantidade de pvs].\n'+
    '   Ex: "pv Aragorn +3", ou "pv Aragorn -5" ou pv Aragorn = 20.\n'+
    '   Também pode consultar pv do personagem utilizando o comando "?".\n'+
    '   Ex: pv Aragorn ?\n\n'+
    '- xp - Adiciona ou remove xp ao personagem seguindo a estrutura:\n'+
    '   [XP,Xp,xP ou xp] [nome do personagem] [+, - ou =] [quantidade de experiencia]\n'+
    '   Ex: "xp Legolas +300" ou "pv Legolas -50".\n'
    '   Para consultar xp do personagem utilize o comando "?".\n'+
    '   Ex: xp Gimli ?\n\n'+
    '- roll - Rolagem de dados seguindo a estrutura: '+
    '   [Roll ou roll] [quantidade de dados][D ou d][quantidade de faces do dado] ([+ ou -][modificador], opcional).\n'+
    '   Ex: "roll 3d6", "roll 1d20+1", "roll 2d8-3".';

    bot.postMessageToChannel(channel.name, retorno, {as_user: true});
  };

  //Salva novo personagem no banco
  controller.salvar = function(bot, personagem, channel){

    var pers = new Personagem({
      nome: personagem.nome,
      for: parseInt(personagem.for),
      des: parseInt(personagem.des),
      con: parseInt(personagem.con),
      int: parseInt(personagem.int),
      sab: parseInt(personagem.sab),
      car: parseInt(personagem.car),
      pv: parseInt(personagem.pv),
      pvTotal: parseInt(personagem.pv),
      xp: 0,
      nivel: 1,
      classe: personagem.classe,
      raca: personagem.raca
    });

    pers.save(function(err) {
      if (err) {console.log(err);this.erro(bot, channel, 'Erro ao salvar personagem');}
      var retorno = 'Nome: ' + personagem.nome + ', Raça: ' + personagem.raca + ', Classe:' +
        personagem.classe +', FOR ' + personagem.for + ', DES ' + personagem.des+ ', CON ' + personagem.con +
        ', INT '+ personagem.int + ', SAB '+ personagem.sab +', CAR ' + personagem.car;

      bot.postMessageToChannel(channel.name, 'Salvou '+retorno, {as_user: true});
    });
  };

  //Lista os nomes de todos os personagens salvos no banco
  controller.listar = function(bot, msg, channel){

    Personagem.find({}, function(err, personagens) {
      if (err) throw err;

      var retorno = '';
      for(var index = 0; index < personagens.length; index++){
        retorno += 'Personagem: '+ personagens[index].nome + '\n'
      }
      bot.postMessageToChannel(channel.name, retorno, {as_user: true});
    });
  };

  //Altera pvTotal do personagem para o valor enviado
  controller.setPvTotal = function(bot, channel, params){
    var query = {nome : params.nome}
    ,update = {pvTotal : params.valor}
    ,options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) throw err;

      var retorno = 'Personagem: ' + params.nome + ', pv: '+ params.valor+'/'+params.valor;
      bot.postMessageToChannel(channel.name, retorno, {as_user: true});
    });
  }

  //Altera pv do personagem para o valor enviado
  controller.setPv = function(bot, channel, params){
    var query = {nome: params.nome}
    ,update = {pv : params.valor}
    ,options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) throw err;

      var retorno = 'Personagem: ' + params.nome + ', pv: '+ params.valor;
      bot.postMessageToChannel(channel.name, retorno, {as_user: true});
    });
  }

  //Adiciona pv ao personagem
  controller.addPv = function(bot, channel, params){
    var query = {nome: params.nome};

    Personagem.findOne(query, function(err, pers){
      if (err) throw err;
      //se valor a adicionar for maior que pvTotal então pv == pvTotal
      var valor = parseInt(params.valor);
      var pv = (pers.pv + valor) >= pers.pvTotal ? pers.pvTotal : (pers.pv + valor);
      console.log('pv: '+pv);
      var update = {pv : pv}, options = {upsert : true};

      Personagem.update(query, update, options, function(err){
        if (err) throw err;

        var retorno = 'Personagem: ' + params.nome + ', pv: '+ pv +'/'+pers.pvTotal;
        bot.postMessageToChannel(channel.name, retorno, {as_user: true});
      });
    });
  }

  //Remove pv do personagem
  controller.removePv = function(bot, channel, params){
    var query = {nome: params.nome};

    Personagem.findOne(query, function(err, pers){
      if (err) throw err;
      //se valor a remover for maior que o pv então personagem morre.
      var valor = parseInt(params.valor);
      var pv = (pers.pv - valor) <= 0 ? 0 : (pers.pv - valor);
      var update = {pv : pv}, options = {upsert : true};

      Personagem.update(query, update, options, function(err){
        if (err) throw err;

        var retorno = 'Personagem: ' + pers.nome + ', pv: '+ pv +'/' +pers.pvTotal;
        if(pv == 0){retorno = retorno + '. Personagem morto!'}
        bot.postMessageToChannel(channel.name, retorno, {as_user: true});
      });
    });
  }

  //Adiciona xp ao personagem
  controller.addXp = function(bot, channel, params){
    var query = {nome: params.nome};

    Personagem.findOne(query, function(err, pers){
      if (err) throw err;
      var xp = pers.xp + parseInt(params.valor);
      var update = {xp : xp}, options = {upsert : true};

      Personagem.update(query, update, options, function(err){
        if (err) throw err;

        var retorno = 'Personagem: ' + params.nome + ', xp: '+ xp;
        bot.postMessageToChannel(channel.name, retorno, {as_user: true});
      });
    });
  }

  //Remove xp do personagem
  controller.removeXp = function(bot, channel, params){
    var query = {nome: params.nome};

    Personagem.findOne(query, function(err, pers){
      if (err) throw err;
      var xp = (pers.xp - parseInt(params.valor)) >= 0 ? 0 : (pers.xp - parseInt(params.valor));
      var update = {xp : xp}, options = {upsert : true};

      Personagem.update(query, update, options, function(err){
        if (err) throw err;

        var retorno = 'Personagem: ' + params.nome + ', xp: '+ xp;
        bot.postMessageToChannel(channel.name, retorno, {as_user: true});
      });
    });
  };

  //Função rolar dado
  controller.rolarDado = function(bot, channel, params){
    var resultado = 'Resultado ' + params.vezes + 'd' + params.faces;
    if(params.modif){
        resultado = (params.modif > 0) ? (resultado + ' + ' + params.modif) : (resultado + ' ' + params.modif);
    }
    resultado += ' = ';
    var total = 0;

    for(var index = 0; index < (params.vezes); index++){
      var valor = Math.floor((Math.random() * params.faces) + 1);

      if(index > 0){resultado += ", "}
      //regra diferente caso tenha modificador. Obs: nunca um resultado vai ser menor que 1
      if(params.modif){
        resultado = resultado + '(' + valor + ((params.modif > 0) ? '+' : '') + params.modif + ')';
        total += (valor + params.modif) <= 0 ? 1 : (valor + params.modif);

      }else{
        resultado += valor;
        total += valor;
      }
    }
    resultado = (total ? resultado + "; Total: "+total : null);
    bot.postMessageToChannel(channel.name, resultado, {as_user: true});
  };

  return controller;
}();
