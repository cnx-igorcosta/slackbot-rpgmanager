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
      retorno += '(' + rule.fortitude + ' classe, ' + modificadores(pers.con) + ' Con) ';
    }
    retorno += ', Reflexos: ' + (rule.reflexos + modificadores(pers.des));
    if(des) {
      retorno += '(' + rule.reflexos + ' classe, ' + modificadores(pers.des) + ' Des) '
    }
    retorno += ', Vontade: ' + (rule.vontade + modificadores(pers.sab));
    if(sab) {
      retorno += '(' + rule.vontade + ' classe, ' + modificadores(pers.sab) + ' Sab)';
    }

  retorno += '\nBA: ';
  var bas = rule.ba;
  for(var j = 0; j < bas.length; j++){
    if(j !== 0) retorno += '/';
    retorno += '+' + bas[j]
  }
  return retorno;
}

module.exports = rulesController;
