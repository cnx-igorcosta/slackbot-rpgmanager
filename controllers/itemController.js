var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var itemController = {};

itemController.newItem = function(params, query, pers){
  var item = {
    nome: params.item,
    descricao: params.descricao,
    quantidade: params.quantidade
  };

  pers.itens.push(item);
  var subItem = pers.itens[0];
  subItem.isNew;

  pers.save(function (err) {
    if (err) {personagemController.erro(err, params, 'Erro ao salvar item '+params.item+' do personagem '+params.nome);}
    else{
      var retorno = 'Item '+params.item+' adicionado ao personagem '+params.nome;
      params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
    }
  });
};

itemController.removeItem = function(params){

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
              if (err) {personagemController.erro(err, params, 'Erro ao remover item '+params.item+' do personagem '+params.nome);}
              else{
                var retorno = quantRemover+' itens '+params.item+' removido do personagem '+params.nome;
                params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
              }
            });
          }
          else if(quantidade <= 0){
            pers.itens.remove(pers.itens[index]);
            pers.save(function (err) {
              if (err) {personagemController.erro(err, params, 'Erro ao remover item '+params.item+' do personagem '+params.nome);}
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
  personagemController.buscarPersonagem(params, callback);
};

itemController.addItem = function(params){

  var callback = function(params, query, pers){
    //Personagem ainda nao possui item
    if(pers.itens.length == 0){
      itemController.newItem(params, query, pers);
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
             if (err) {personagemController.erro(err, params, 'Erro ao salvar item '+params.item+' do personagem '+params.nome);}
             else{
               var retorno = 'Item '+params.item+' adicionado ao personagem '+params.nome;
               params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
            }
           });
         }
       }
       if(!achou){
         itemController.newItem(params, query, pers);
       }
    }
  };
  personagemController.buscarPersonagem(params, callback);
};

itemController.listItens = function(params){

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

  personagemController.buscarPersonagem(params, callback);
}

module.exports = itemController;
