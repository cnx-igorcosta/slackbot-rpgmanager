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

rulesController.upLevel = function(classe, level){
  for(var index = 0; index < rules.length; index++){
    if(classe.toLowerCase() === rules[index].classe){
      return rules[index].rule.upLevel(level);
    }
  }
};

module.exports = rulesController;
