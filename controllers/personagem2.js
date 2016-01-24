var Personagem = require('../models/personagem.js');

module.exports = function () {

  var controller = {};

  controller.listar = function(Personagem){
    Personagem.find().exec()
    .then(
      function(personagens){
        return personagens;
      },
      function(erro){
        console.error(erro);
      }
    );
  };

  controller.obter = function(_id){
    Personagem.findById({'_id' : _id}).exec()
    .then(
      function(personagem){
        if(!personagem) throw new Error("Personagem não encontrado");
        return personagem;
      },
      function(erro){
        console.error(erro);
      }
    );
  };

  controller.remover = function(_id){
    Personagem.remove({'_id' : _id}).exec()
    .then(
      function(){
        console.log('deletou');
      },
      function(erro){
        console.error(erro);
      }
    );
  };

  controller.salvar = function(){

  };

  return controller;
}
