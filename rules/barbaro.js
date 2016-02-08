var modificadores = require('./modificadoresAtributo');

var barbaro = {}

barbaro.rules = [
  {nivel: 1, ba:[1], fortitude:2, reflexos:0, vontade:0, talento:'Movimento rápido, fúria 1/dia'},
  {nivel: 2, ba:[2], fortitude:3, reflexos:0, vontade:0, talento:'Esquiva sobrenatural'},
  {nivel: 3, ba:[3], fortitude:3, reflexos:1, vontade:1, talento:'Sentir armadilhas +1'},
  {nivel: 4, ba:[4], fortitude:4, reflexos:1, vontade:1, talento:'Fúria 2/dia'},
  {nivel: 5, ba:[5], fortitude:4, reflexos:1, vontade:1, talento:'Esquiva sobrenatural aprimorada'},
  {nivel: 6, ba:[6,1], fortitude:5, reflexos:2, vontade:2, talento:'Sentir armadilhas +2'},
  {nivel: 7, ba:[7,2], fortitude:5, reflexos:2, vontade:2, talento:'Redução de dano 1/-'},
  {nivel: 8, ba:[8,3], fortitude:6, reflexos:2, vontade:2, talento:'Fúria 3/dia'},
  {nivel: 9, ba:[9,4], fortitude:6, reflexos:3, vontade:3, talento:'Sentir armadilhas +3'},
  {nivel: 10, ba:[10,5], fortitude:7, reflexos:3, vontade:3, talento:'Redução de dano 2/-'},
  {nivel: 11, ba:[11,6,1], fortitude:7, reflexos:3, vontade:3, talento:'Fúria maior'},
  {nivel: 12, ba:[12,7,2], fortitude:8, reflexos:4, vontade:4, talento:'Fúria 4/dia, sentir armadilhas +4'},
  {nivel: 13, ba:[13,8,3], fortitude:8, reflexos:4, vontade:4, talento:'Redução de dano 3/-'},
  {nivel: 14, ba:[14,9,4], fortitude:9, reflexos:4, vontade:4, talento:'Vontade inabalável'},
  {nivel: 15, ba:[15,10,5], fortitude:9, reflexos:5, vontade:5, talento:'Sentir armadilhas +5'},
  {nivel: 16, ba:[16,11,6,1], fortitude:10, reflexos:5, vontade:5, talento:'Redução de dano 4/-, fúria 5/dia'},
  {nivel: 17, ba:[17,12,7,2], fortitude:10, reflexos:5, vontade:5, talento:'Fúria incansável'},
  {nivel: 18, ba:[18,13,8,3], fortitude:11, reflexos:6, vontade:6, talento:'Sentir armadilhas +6'},
  {nivel: 19, ba:[19,14,9,4], fortitude:11, reflexos:6, vontade:6, talento:'Redução de dano 5/-'},
  {nivel: 20, ba:[20,15,10,5], fortitude:12, reflexos:6, vontade:6, talento:'Fúria poderosa, fúria 6/dia'},
];

var getRuleByLevel = function(level){
  for(var index = 0; index < barbaro.rules.length; index++){
    if(level === barbaro.rules[index].nivel){
      return barbaro.rules[index];
    }
  }
}

barbaro.upLevel = function(level){

  var rule = getRuleByLevel(level);
  var retorno = 'Nível: '+ level;

  retorno += ', ba: ';
  var bas = rule.ba;
  for(var j = 0; j < bas.length; j++){
    if(j !== 0) retorno += '/';
    retorno += '+' + bas[j]
  }

  retorno += '. Fortitude: +' + rule.fortitude +
    ', Reflexos: +' + rule.reflexos + ', Vontade: +' + rule.vontade;

  retorno += '. Talento: ' + rule.talento;
  return retorno;
}

module.exports = barbaro;
