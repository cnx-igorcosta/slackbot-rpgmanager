var personagemController = require('./personagemController');
var Personagem = require('../models/personagem');

var newController = {};

//Salva novo personagem no banco
newController.salvar = function(params){

  var pers = new Personagem({
    nome: params.pers.nome.trim(),
    classe: params.pers.classe,
    raca: params.pers.raca,
    for: parseInt(params.pers.for),
    des: parseInt(params.pers.des),
    con: parseInt(params.pers.con),
    int: parseInt(params.pers.int),
    sab: parseInt(params.pers.sab),
    car: parseInt(params.pers.car),
    pvTotal: params.pers.pv ? (parseInt(params.pers.pv)) : 0,
    pv: params.pers.pv ? (parseInt(params.pers.pv)) : 0,
    xp: 0,
    nivel: 1,
    dinheiro: 0
  });

  pers.save(function(err) {
    if (err) {console.log(err);personagemController.erro(params, 'Erro ao salvar personagem');}
    else{
      var retorno = 'Nome: ' + params.pers.nome + ', Raça: ' + params.pers.raca + ', Classe:' +
      params.pers.classe +', FOR ' + params.pers.for + ', DES ' + params.pers.des+ ', CON ' + params.pers.con +
      ', INT '+ params.pers.int + ', SAB '+ params.pers.sab +', CAR ' + params.pers.car;

      params.bot.postMessageToChannel(params.channel.name, 'Salvou '+retorno, {as_user: true});
    }
  });
};

module.exports = newController;
