var ladino = {}

ladino.rules = [
  {nivel: 1, ba:[0], fortitude:0, reflexos:2, vontade:0, talento:'Ataque furtivo +1d6, encontrar armadilhas'},
  {nivel: 2, ba:[1], fortitude:0, reflexos:3, vontade:0, talento:'Evasão'},
  {nivel: 3, ba:[2], fortitude:1, reflexos:3, vontade:1, talento:'Ataque furtivo +2d6, sentir armadilhas +1d6'},
  {nivel: 4, ba:[3], fortitude:1, reflexos:4, vontade:1, talento:'Esquiva sobrenatural'},
  {nivel: 5, ba:[3], fortitude:1, reflexos:4, vontade:1, talento:'Ataque furtivo +3d6'},
  {nivel: 6, ba:[4], fortitude:2, reflexos:5, vontade:2, talento:'Sentir armadilhas +2'},
  {nivel: 7, ba:[5], fortitude:2, reflexos:5, vontade:2, talento:'Ataque furtivo +4d6'},
  {nivel: 8, ba:[6,1], fortitude:2, reflexos:6, vontade:2, talento:'Esquiva sobrenatural aprimorada'},
  {nivel: 9, ba:[6,1], fortitude:3, reflexos:6, vontade:3, talento:'Ataque furtivo +5d6, sentir armadilhas +3'},
  {nivel: 10, ba:[7,2], fortitude:3, reflexos:7, vontade:3, talento:'Habilidade especial'},
  {nivel: 11, ba:[8,3], fortitude:3, reflexos:7, vontade:3, talento:'Ataque furtivo +6d6'},
  {nivel: 12, ba:[9,4], fortitude:4, reflexos:8, vontade:4, talento:'Sentir armadilhas +4'},
  {nivel: 13, ba:[9,4], fortitude:4, reflexos:8, vontade:4, talento:'Ataque furtivo +7d6, habilidade especial'},
  {nivel: 14, ba:[10,5], fortitude:4, reflexos:9, vontade:4, talento:''},
  {nivel: 15, ba:[11,6,1], fortitude:5, reflexos:9, vontade:5, talento:'Ataque furtivo +8d6, sentir armadilhas +5'},
  {nivel: 16, ba:[12,7,2], fortitude:5, reflexos:10, vontade:5, talento:'Habilidade especial'},
  {nivel: 17, ba:[12,7,2], fortitude:5, reflexos:10, vontade:5, talento:'Ataque furtivo +9d6'},
  {nivel: 18, ba:[13,8,3], fortitude:6, reflexos:11, vontade:6, talento:'Sentir armadilhas +6'},
  {nivel: 19, ba:[14,9,4], fortitude:6, reflexos:11, vontade:6, talento:'Ataque furtivo +10d6, habilidade especial'},
  {nivel: 20, ba:[15,10,5], fortitude:6, reflexos:12, vontade:6, talento:''},
];

ladino.upLevel = function(level){
  var retorno = 'Nível: '+ level;
  for(var index = 0; index < ladino.rules.length; index++){
    if(level === ladino.rules[index].nivel){

      retorno += ', ba: ';
      var bas = ladino.rules[index].ba;
      for(var j = 0; j < bas.length; j++){
        if(j !== 0) retorno += '/';
        retorno += '+' + bas[j]
      }

      retorno += '. Fortitude: +' + ladino.rules[index].fortitude +
        ', Reflexos: +' + ladino.rules[index].reflexos +
        ', Vontade: +' + ladino.rules[index].vontade;

      if(ladino.rules[index].talento)
        retorno += '. Talento: ' + ladino.rules[index].talento;
    }
  }
  return retorno;
}


module.exports = ladino;
