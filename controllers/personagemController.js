var connection = require('../config/database.js')('mongodb://localhost/rpgmanager');
var Personagem = require('../models/personagem');
var SlackBot = require('slackbots');

module.exports = function () {

  var controller = {};

  controller.erro = function(err, params, msg){
    console.log(err);
    params.bot.postMessageToChannel(params.channel.name, msg, {as_user: true});
  }

  controller.help = function(params){

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
    '   Para consultar pv do personagem utilize o comando "?". Ex: pv Aragorn ?\n\n'+
    '- xp - Adiciona ou remove xp ao personagem seguindo a estrutura:\n'+
    '   [XP,Xp,xP ou xp] [nome do personagem] [+, - ou =] [quantidade de experiencia]\n'+
    '   Ex: "xp Legolas +300" ou "pv Legolas -50".\n'
    '   Para consultar xp do personagem utilize o comando "?".Ex: xp Gimli ?\n\n'+
    '- item - Adiciona, remove ou consulta itens do personagem: '+
    '   [Item, item, Itens ou itens] [nome do personagem] [+ ou -][(][nome do item][,descricao do item - opcional][,quantidade a adicionar/remover - opcional][)].\n'+
    '   Ex: "Item Gandalf + (Espada, Grlamdring magica, 1)" ou Itens Legolas - (flecha caca,10)\n'+
    '   Para consultar os itens do personagem utilize o comando "?". Ex: "Item Bilbo ?" ou "Itens Merrin ?"'
    '- roll - Rolagem de dados seguindo a estrutura: '+
    '   [Roll ou roll] [quantidade de dados][D ou d][quantidade de faces do dado] ([+ ou -][modificador], opcional).\n'+
    '   Ex: "roll 3d6", "roll 1d20+1", "roll 2d8-3".';

    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
  };

  //Salva novo personagem no banco
  controller.salvar = function(params){

    var pers = new Personagem({
      nome: params.pers.nome,
      for: parseInt(params.pers.for),
      des: parseInt(params.pers.des),
      con: parseInt(params.pers.con),
      int: parseInt(params.pers.int),
      sab: parseInt(params.pers.sab),
      car: parseInt(params.pers.car),
      pv: parseInt(params.pers.pv),
      pvTotal: parseInt(params.pers.pv),
      xp: 0,
      nivel: 1,
      pvTotal: params.pers.pvTotal ? (parseInt(params.pers.pvTotal)) : 0,
      pv: params.pers.pv ? (parseInt(params.pers.pv)) : 0,
      classe: params.pers.classe,
      raca: params.pers.raca,
      dinheiro: 0
    });

    pers.save(function(err) {
      if (err) {console.log(err);controller.erro(params, 'Erro ao salvar personagem');}
      else{
        var retorno = 'Nome: ' + params.pers.nome + ', Raça: ' + params.pers.raca + ', Classe:' +
        params.pers.classe +', FOR ' + params.pers.for + ', DES ' + params.pers.des+ ', CON ' + params.pers.con +
        ', INT '+ params.pers.int + ', SAB '+ params.pers.sab +', CAR ' + params.pers.car;

        params.bot.postMessageToChannel(params.channel.name, 'Salvou '+retorno, {as_user: true});
      }
    });
  };

  //Lista os nomes de todos os personagens salvos no banco
  controller.listar = function(params){

    Personagem.find({}, function(err, personagens) {
      if (err) {console.log(err);controller.erro(params, 'Erro ao listar personagens');}
      else{
        var retorno = '';
        for(var index = 0; index < personagens.length; index++){
          retorno += 'Personagem: '+ personagens[index].nome + '\n'
        }
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      }
    });
  };

  //Altera pvTotal do personagem para o valor enviado
  controller.setPvTotal = function(params){

  var callback = function(params, query, pers){

    var update = {pvTotal : params.valor}
    ,options = {upsert : true};

    Personagem.update(query, update, options, function(err){
      if (err) {console.log(err);controller.erro(params, 'Erro ao alterar pv total do personagem');}

      var retorno = 'Personagem: ' + params.nome + ', pv: '+ params.valor+'/'+params.valor;
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    });
  };

  controller.buscarPersonagem(params, callback);
  }

  //Altera pv do personagem para o valor enviado
  controller.setPv = function(params){

    var callback = function(params, query, pers){

      var valor = parseInt(params.valor);
      var pv = valor >= pers.pvTotal ? pers.pvTotal : valor;
      var update = {pv : pv},
        options = {upsert : true};

      Personagem.update(query, update, options, function(err){
        if (err) {console.log(err);controller.erro(params, 'Erro ao alterar pv do personagem');}

        var retorno = 'Personagem: ' + params.nome + ', pv: '+ pv + '/'+pers.pvTotal;
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      });
    };

    controller.buscarPersonagem(params, callback);
  }

  //Adiciona pv ao personagem
  controller.addPv = function(params){

    var callback = function(params, query, pers){
      var valor = parseInt(params.valor);
      //se valor a adicionar for maior que pvTotal então pv == pvTotal
      var pv = (pers.pv + valor) >= pers.pvTotal ? pers.pvTotal : (pers.pv + valor);
      var update = {pv : pv},
        options = {upsert : true};

      Personagem.update(query, update, options, function(err){
        if (err) {console.log(err);controller.erro(params, 'Erro ao adicionar pv ao personagem');}

        var retorno = 'Personagem: ' + pers.nome + ', pv: '+ pv +'/'+pers.pvTotal;
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      });
    };
    controller.buscarPersonagem(params, callback);
  }

  //Remove pv do personagem
  controller.removePv = function(params){

    var callback = function(params, query, pers){
      var valor = parseInt(params.valor);
      var pv = (pers.pv - valor) <= 0 ? 0 : (pers.pv - valor);
      var update = {pv : pv},
        options = {upsert : true};

      Personagem.update(query, update, options, function(err){
        if (err) {console.log(err);controller.erro(params, 'Erro ao remover pv do personagem');}

        var retorno = 'Personagem: ' + pers.nome + ', pv: '+ pv +'/' +pers.pvTotal;
        //se valor a remover for maior que o pv então personagem morre.
        if(pv == 0){retorno = retorno + '. Personagem morto!'}

        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      });
    };

    controller.buscarPersonagem(params, callback);
  };

  controller.consultaPv = function(params){
    var callback = function(params, query, pers){
      var retorno = 'Personagem: ' + pers.nome + ', pv: '+ pers.pv +'/' +pers.pvTotal;
      if(pers.pv == 0){retorno = retorno + '. Personagem morto!'}

      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    };
    controller.buscarPersonagem(params, callback);
  };

  //Adiciona xp ao personagem
  controller.addXp = function(params){

    var callback = function(params, query, pers){
      var xp = pers.xp + parseInt(params.valor);
      var update = {xp : xp},
        options = {upsert : true};
      var retorno = 'Personagem: ' + params.nome + ', xp: '+ xp;

      Personagem.update(query, update, options, function(err){
        if (err) {console.log(err);controller.erro(params, 'Erro ao adicionar xp ao personagem');}

        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      });
    };

    controller.buscarPersonagem(params, callback);
  };

  //Remove xp do personagem
  controller.removeXp = function(params){
    var callback = function(params, query, pers){
      var xp = (pers.xp - parseInt(params.valor)) <= 0 ? 0 : (pers.xp - parseInt(params.valor));
      var update = {xp : xp},
        options = {upsert : true};

      Personagem.update(query, update, options, function(err){
        if (err) throw err;if (err) {console.log(err);controller.erro(params, 'Erro ao remover xp do personagem');}

        var retorno = 'Personagem: ' + params.nome + ', xp: '+ xp;
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      });
    };

    controller.buscarPersonagem(params, callback);
  };

  //Consulta xp
  controller.consultaXp = function(params){
    var callback = function(params, query, pers){
      var retorno = 'Personagem: ' + pers.nome + ', xp: '+ pers.xp;

      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    };
    controller.buscarPersonagem(params, callback);
  };

  controller.newItem = function(params, query, pers){
    var item = {
      nome: params.item,
      descricao: params.descricao,
      quantidade: params.quantidade
    };

    pers.itens.push(item);
    var subItem = pers.itens[0];
    subItem.isNew;

    pers.save(function (err) {
      if (err) {controller.erro(err, params, 'Erro ao salvar item '+params.item+' do personagem '+params.nome);}
      else{
        var retorno = 'Item '+params.item+' adicionado ao personagem '+params.nome;
        params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
      }
    });
  };

  controller.removeItem = function(params){

    var callback = function(params, query, pers){
      if(pers.itens.length > 0){
        var quantRemover = parseInt(params.quantidade);

        for(var index = 0; index < pers.itens.length; index++){
          if(pers.itens[index].nome.toLowerCase() === params.item.toLowerCase()){

            var quantidade = pers.itens[index].quantidade - quantRemover;
            if(quantidade > 0){

              var query = {'itens._id': pers.itens[index]._id}
              var update = {'$set':  {'itens.$.quantidade': quantidade}};
              var options = {upsert : true};

              Personagem.update(query, update, options, function(err){
                if (err) {controller.erro(err, params, 'Erro ao remover item '+params.item+' do personagem '+params.nome);}
                else{
                  var retorno = quantRemover+' itens '+params.item+' removido do personagem '+params.nome;
                  params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
                }
              });
            }
            else if(quantidade <= 0){
              pers.itens.remove(pers.itens[index]);
              pers.save(function (err) {
                if (err) {controller.erro(err, params, 'Erro ao remover item '+params.item+' do personagem '+params.nome);}
                else{
                  var retorno = 'Item '+params.item+' removido do personagem '+params.nome;
                  params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
                }
              });
            }
          }
        }
      }
    }
    controller.buscarPersonagem(params, callback);
  };

  controller.addItem = function(params){

    var callback = function(params, query, pers){
      //Personagem ainda nao possui item
      if(pers.itens.length == 0){
        controller.newItem(params, query, pers);
      //Personagem ja possui item
      }else{

        var achou = false;
        for(var index = 0; index < pers.itens.length; index++){

           if(pers.itens[index].nome.toLowerCase() === params.item.toLowerCase()){
             achou = true;
             var quantidade = pers.itens[index].quantidade + parseInt(params.quantidade);

             var query = {'itens._id': pers.itens[index]._id}
             var update = {'$set':  {'itens.$.quantidade': quantidade}};
             var options = {upsert : true};

             Personagem.update(query, update, options, function(err){
               if (err) {controller.erro(err, params, 'Erro ao salvar item '+params.item+' do personagem '+params.nome);}
               else{
                 var retorno = 'Item '+params.item+' adicionado ao personagem '+params.nome;
                 params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
              }
             });
           }
         }
         if(!achou){
           controller.newItem(params, query, pers);
         }
      }
    };
    controller.buscarPersonagem(params, callback);
  };

  controller.listItens = function(params){

    var callback = function(params, query, pers){
      var retorno = pers.itens.length ? 'Itens do '+pers.nome+':' : 'Personagem '+pers.nome+ ' não possui itens';
      for(var index = 0; index < pers.itens.length; index++){
        retorno += '\n  - nome: '+ pers.itens[index].nome;
        if(pers.itens[index].descricao){
          retorno +=' ("' + pers.itens[index].descricao + '")';
        }
        retorno += ' x' + pers.itens[index].quantidade;
      }
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    };

    controller.buscarPersonagem(params, callback);
  }

  //Busca o personagem pelo nome e executa callback
  controller.buscarPersonagem = function(params, callback){

    var query = {nome: { $regex : new RegExp(params.nome, "i") }};

    Personagem.findOne(query, function(err, pers){
      if (err) {controller.erro(err, params, 'Erro ao buscar personagem '+params.nome);}
      else if(pers != null && pers._id){
        callback(params, query, pers);
      }else{
        controller.erro(err, params, 'Personagem '+params.nome+' não foi encontrado.')
      }
    });
  };

  //Função rolar dado
  controller.rolarDado = function(params){
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
    params.bot.postMessageToChannel(params.channel.name, resultado, {as_user: true});
  };

  return controller;
}();
