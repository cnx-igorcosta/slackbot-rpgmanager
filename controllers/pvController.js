var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var pvController = {};

//Altera pvTotal do personagem para o valor enviado
pvController.setPvTotal = function(params){

var callback = function(params, query, pers){

  var update = {pvTotal : params.valor}
  ,options = {upsert : true};

  Personagem.update(query, update, options, function(err){
    if (err) {console.log(err);personagemController.erro(params, 'Erro ao alterar pv total do personagem');}

    var retorno = 'Personagem: ' + params.nome + ', pv: '+ params.valor+'/'+params.valor;
    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  });
};

personagemController.buscarPersonagem(params, callback);
}

//Altera pv do personagem para o valor enviado
pvController.setPv = function(params){

  var callback = function(params, query, pers){

    var valor = parseInt(params.valor);
    var pv = valor >= pers.pvTotal ? pers.pvTotal : valor;
    var update = {pv : pv},
      options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);personagemController.erro(params, 'Erro ao alterar pv do personagem');}

      var retorno = 'Personagem: ' + params.nome + ', pv: '+ pv + '/'+pers.pvTotal;
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    });
  };

  personagemController.buscarPersonagem(params, callback);
}

//Adiciona pv ao personagem
pvController.addPv = function(params){

  var callback = function(params, query, pers){
    var valor = parseInt(params.valor);
    //se valor a adicionar for maior que pvTotal então pv == pvTotal
    var pv = (pers.pv + valor) >= pers.pvTotal ? pers.pvTotal : (pers.pv + valor);
    var update = {pv : pv},
      options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);personagemController.erro(params, 'Erro ao adicionar pv ao personagem');}
      else{
        var retorno = 'Personagem: ' + pers.nome + ', pv: '+ pv +'/'+pers.pvTotal;
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      }
    });
  };
  personagemController.buscarPersonagem(params, callback);
}

//Remove pv do personagem
pvController.removePv = function(params){

  var callback = function(params, query, pers){
    var valor = parseInt(params.valor);
    var pv = (pers.pv - valor) <= 0 ? 0 : (pers.pv - valor);
    var update = {pv : pv},
      options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);personagemController.erro(params, 'Erro ao remover pv do personagem');}
      else{
        var retorno = 'Personagem: ' + pers.nome + ', pv: '+ pv +'/' +pers.pvTotal;
        //se valor a remover for maior que o pv então personagem morre.
        if(pv == 0){retorno = retorno + '. Personagem morto!'}

        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      }
    });
  };

  personagemController.buscarPersonagem(params, callback);
};

pvController.consultaPv = function(params){
  var callback = function(params, query, pers){
    var retorno = 'Personagem: ' + pers.nome + ', pv: '+ pers.pv +'/' +pers.pvTotal;
    if(pers.pv == 0){retorno = retorno + '. Personagem morto!'}

    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };
  personagemController.buscarPersonagem(params, callback);
};

//Altera pvTotal do personagem para o valor enviado
pvController.setPvTotal = function(params){

var callback = function(params, query, pers){

  var update = {pvTotal : params.valor}
  ,options = {upsert : true};

  Personagem.update(query, update, options, function(err){
    if (err) {console.log(err);personagemController.erro(params, 'Erro ao alterar pv total do personagem');}
    else{
      var retorno = 'Personagem: ' + params.nome + ', pv: '+ params.valor+'/'+params.valor;
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    }
  });
};

personagemController.buscarPersonagem(params, callback);
}


module.exports = pvController;
