var modificadores = require('../rules/modificadoresAtributo');
var barbaro = require('../rules/barbaro');
var clerigo = require('../rules/clerigo');
var guerreiro = require('../rules/guerreiro');
var ladino = require('../rules/ladino');
var mago = require('../rules/mago');

var rules = [
  {classe: 'barbaro', rule: barbaro},
  {classe: 'clerigo', rule: clerigo},
  {classe: 'guerreiro', rule: guerreiro},
  {classe: 'ladino', rule: ladino},
  {classe: 'mago', rule: mago},
];

var rulesController = {};

var getClassRules = function(classe, level){
  for(var index = 0; index < rules.length; index++){
    if(classe.toLowerCase() === rules[index].classe){
      return rules[index].rule;
    }
  }
}

var getRuleByLevel = function(classe, level){
  for(var index = 0; index < classe.rules.length; index++){
    if(level === classe.rules[index].nivel){
      return classe.rules[index];
    }
  }
}

rulesController.getRule = function(nomeClasse, level){
  var classe = getClassRules(nomeClasse, level);
  return getRuleByLevel(classe, level);
}

rulesController.upLevel = function(classe, level){
  var rule = getClassRules(classe, level);
    return rule.upLevel(level);
};

rulesController.statsByClass = function(pers){
  var classe = getClassRules(pers.classe, pers.nivel);
  var rule = getRuleByLevel(classe, pers.nivel);

  var retorno = '\n';
  var con = modificadores(pers.con);
  var des = modificadores(pers.des);
  var sab = modificadores(pers.sab);
  retorno += 'Fortitude: ' + (rule.fortitude + con);
  if(con) {
    retorno += '(' + rule.fortitude + ' classe, ' + con + ' Con) ';
  }
  retorno += ', Reflexos: ' + (rule.reflexos + des);
  if(des) {
    retorno += '(' + rule.reflexos + ' classe, ' +des + ' Des) '
  }
  retorno += ', Vontade: ' + (rule.vontade + sab);
  if(sab) {
    retorno += '(' + rule.vontade + ' classe, ' + sab + ' Sab)';
  }
  return retorno;
}

rulesController.getFortitude = function(pers){
  var rule = rulesController.getRule(pers.classe, pers.nivel);
  var con = modificadores(pers.con);
  var retorno = 'Personagem: ' + pers.nome + ', Fortitude: ' + (rule.fortitude + con) +
    '(' + rule.fortitude + ' classe, ' + con + ' Con) ';

  return retorno
};

rulesController.getReflexos = function(pers){
  var rule = rulesController.getRule(pers.classe, pers.nivel);
  var des = modificadores(pers.des);
  var retorno = 'Personagem: ' + pers.nome + ', Reflexos: ' + (rule.reflexos + des) +
    '(' + rule.fortitude + ' classe, ' + des + ' Des) ';

  return retorno
};

rulesController.getVontade = function(pers){
  var rule = rulesController.getRule(pers.classe, pers.nivel);
  var sab = modificadores(pers.sab);
  var retorno = 'Personagem: ' + pers.nome + ', Vontade: ' + (rule.vontade + sab) +
    '(' + rule.fortitude + ' classe, ' + sab + ' Sab) ';

  return retorno
};



module.exports = rulesController;
