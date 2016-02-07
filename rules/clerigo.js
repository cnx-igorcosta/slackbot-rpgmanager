var clerigo = {};

clerigo.rules = [
  {nivel: 1, ba:[0], fortitude:2, reflexos:0, vontade:2, magias:[3,2]},
  {nivel: 2, ba:[1], fortitude:3, reflexos:0, vontade:3, magias:[4,3]},
  {nivel: 3, ba:[2], fortitude:3, reflexos:1, vontade:3, magias:[4,3,2]},
  {nivel: 4, ba:[3], fortitude:4, reflexos:1, vontade:4, magias:[5,4,3]},
  {nivel: 5, ba:[3], fortitude:4, reflexos:1, vontade:4, magias:[5,4,3,2]},
  {nivel: 6, ba:[4], fortitude:5, reflexos:2, vontade:5, magias:[5,4,4,3]},
  {nivel: 7, ba:[5], fortitude:5, reflexos:2, vontade:5, magias:[6,5,4,3,2]},
  {nivel: 8, ba:[6,1], fortitude:6, reflexos:2, vontade:6, magias:[6,5,4,4,3]},
  {nivel: 9, ba:[6,1], fortitude:6, reflexos:3, vontade:6, magias:[6,5,5,4,3,2]},
  {nivel: 10, ba:[7,2], fortitude:7, reflexos:3, vontade:7, magias:[6,5,5,4,4,3]},
  {nivel: 11, ba:[8,3], fortitude:7, reflexos:3, vontade:7, magias:[6,6,5,5,4,3,2]},
  {nivel: 12, ba:[9,4], fortitude:8, reflexos:4, vontade:8, magias:[6,6,5,5,4,4,3]},
  {nivel: 13, ba:[9,4], fortitude:8, reflexos:4, vontade:8, magias:[6,6,6,5,5,4,3,2]},
  {nivel: 14, ba:[10,5], fortitude:9, reflexos:4, vontade:9, magias:[6,6,6,5,5,4,4,3]},
  {nivel: 15, ba:[11,6,1], fortitude:9, reflexos:5, vontade:9, magias:[6,6,6,6,5,5,4,3,2]},
  {nivel: 16, ba:[12,7,2], fortitude:10, reflexos:5, vontade:10, magias:[6,6,6,6,5,5,4,4,3]},
  {nivel: 17, ba:[12,7,2], fortitude:10, reflexos:5, vontade:10, magias:[6,6,6,6,6,5,5,4,3,2]},
  {nivel: 18, ba:[13,8,3], fortitude:11, reflexos:6, vontade:11, magias:[6,6,6,6,6,5,5,4,4,3]},
  {nivel: 19, ba:[14,9,4], fortitude:11, reflexos:6, vontade:11, magias:[6,6,6,6,6,6,5,5,4,4]},
  {nivel: 20, ba:[15,10,5], fortitude:12, reflexos:6, vontade:12, magias:[6,6,6,6,6,6,5,5,5,5]}
];

clerigo.upLevel = function(level){
  var retorno = 'Nível: '+ level;
  for(var index = 0; index < clerigo.rules.length; index++){
    if(level === clerigo.rules[index].nivel){

      retorno += ', ba: ';
      var bas = clerigo.rules[index].ba;
      for(var j = 0; j < bas.length; j++){
        if(j !== 0) retorno += '/';
        retorno += '+' + bas[j]
      }

      retorno += '. Fortitude: +' + clerigo.rules[index].fortitude +
        ', Reflexos: +' + clerigo.rules[index].reflexos +
        ', Vontade: +' + clerigo.rules[index].vontade;

      retorno += '. Magias por dia: ';
      var magias = clerigo.rules[index].magias;
      for(var k = 0; k < magias.length; k++){
        if(k > 0) retorno += ', ';
        retorno += magias[k] + '(' + k + ')';
      }
    }
  }
  return retorno;
}


module.exports = clerigo;
