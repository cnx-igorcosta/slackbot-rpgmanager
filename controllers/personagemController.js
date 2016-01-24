var connection = require('../config/database.js')('mongodb://localhost/rpgmanager');
var Personagem = require('../models/personagem');
var SlackBot = require('slackbots');

module.exports = function () {

  var controller = {};

  controller.help = function(bot, channel){

    var retorno = 'rpgmanager comandos:\n'+
    '- new - Salva novo personagem, nome, atributos e pv devem ser enviados. Ex: "new nome:Aragorn, for:18, des:15, con:16, int:14, sab:16, car:12, pv:10".\n'+
    '- list - Lista os nomes de todos os personagens salvos.\n'+
    '- pvTotal - cria novo valor de pv total. Ex: "pvTotal Gandald = 50".\n'+
    '- pv - Adiciona, remove ou gera pv ao personagem. Ex: "pv Aragorn +3", ou "pv Aragorn -5" ou pv Aragorn = 20.\n'+
    '- xp - Adiciona ou remove xp ao personagem. Ex: "xp Legolas +300" ou "pv Legolas -50".\n'
    '- roll - Rolagem de dado, (quantidade dados)"d"(faces dado)(modificador-opcional). Ex: "roll 3d6", "roll 1d20+1", "roll 2d8-3".\n';

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
      if (err) throw err;

      bot.postMessageToChannel(channel.name, 'Salvou '+JSON.stringify(personagem), {as_user: true});
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
