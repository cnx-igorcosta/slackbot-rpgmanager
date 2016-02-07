var guerreiro = {}

guerreiro.rules = [
  {nivel: 1, ba:[1], fortitude:2, reflexos:0, vontade:0, talento:true},
  {nivel: 2, ba:[2], fortitude:3, reflexos:0, vontade:0, talento:true},
  {nivel: 3, ba:[3], fortitude:3, reflexos:1, vontade:1, talento:false},
  {nivel: 4, ba:[4], fortitude:4, reflexos:1, vontade:1, talento:true},
  {nivel: 5, ba:[5], fortitude:4, reflexos:1, vontade:1, talento:false},
  {nivel: 6, ba:[6,1], fortitude:5, reflexos:2, vontade:2, talento:true},
  {nivel: 7, ba:[7,2], fortitude:5, reflexos:2, vontade:2, talento:false},
  {nivel: 8, ba:[8,3], fortitude:6, reflexos:2, vontade:2, talento:true},
  {nivel: 9, ba:[9,4], fortitude:6, reflexos:3, vontade:3, talento:false},
  {nivel: 10, ba:[10,5], fortitude:7, reflexos:3, vontade:3, talento:true},
  {nivel: 11, ba:[11,6,1], fortitude:7, reflexos:3, vontade:3, talento:false},
  {nivel: 12, ba:[12,7,2], fortitude:8, reflexos:4, vontade:4, talento:true},
  {nivel: 13, ba:[13,8,3], fortitude:8, reflexos:4, vontade:4, talento:false},
  {nivel: 14, ba:[14,9,4], fortitude:9, reflexos:4, vontade:4, talento:true},
  {nivel: 15, ba:[15,10,5], fortitude:9, reflexos:5, vontade:5, talento:false},
  {nivel: 16, ba:[16,11,6,1], fortitude:10, reflexos:5, vontade:5, talento:true},
  {nivel: 17, ba:[17,12,7,2], fortitude:10, reflexos:5, vontade:5, talento:false},
  {nivel: 18, ba:[18,13,8,3], fortitude:11, reflexos:6, vontade:6, talento:true},
  {nivel: 19, ba:[19,14,9,4], fortitude:11, reflexos:6, vontade:6, talento:false},
  {nivel: 20, ba:[20,15,10,5], fortitude:12, reflexos:6, vontade:6, talento:true},
];

guerreiro.upLevel = function(level){
  var retorno = 'Nível: '+ level;
  for(var index = 0; index < guerreiro.rules.length; index++){
    if(level === guerreiro.rules[index].nivel){

      retorno += ', ba: ';
      var bas = guerreiro.rules[index].ba;
      for(var j = 0; j < bas.length; j++){
        if(j !== 0) retorno += '/';
        retorno += '+' + bas[j]
      }

      retorno += '. Fortitude: +' + guerreiro.rules[index].fortitude +
        ', Reflexos: +' + guerreiro.rules[index].reflexos +
        ', Vontade: +' + guerreiro.rules[index].vontade;

      if(guerreiro.rules[index].talento){
        retorno += '. Talento adicional';
      }
    }
  }
  return retorno;
}


module.exports = guerreiro;
