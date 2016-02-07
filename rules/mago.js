var mago = {};

mago.rules = [
  {nivel: 1, ba:[0], fortitude:0, reflexos:0, vontade:2, magias:[3,1]},
  {nivel: 2, ba:[1], fortitude:0, reflexos:0, vontade:3, magias:[4,2]},
  {nivel: 3, ba:[1], fortitude:1, reflexos:1, vontade:3, magias:[4,2,1]},
  {nivel: 4, ba:[2], fortitude:1, reflexos:1, vontade:4, magias:[4,3,2]},
  {nivel: 5, ba:[2], fortitude:1, reflexos:1, vontade:4, magias:[4,3,2,1], especial:true},
  {nivel: 6, ba:[3], fortitude:2, reflexos:2, vontade:5, magias:[4,3,3,2]},
  {nivel: 7, ba:[3], fortitude:2, reflexos:2, vontade:5, magias:[4,4,3,2,1]},
  {nivel: 8, ba:[4], fortitude:2, reflexos:2, vontade:6, magias:[4,4,3,3,2]},
  {nivel: 9, ba:[4], fortitude:3, reflexos:3, vontade:6, magias:[4,4,4,3,2,1]},
  {nivel: 10, ba:[5], fortitude:3, reflexos:3, vontade:7, magias:[4,4,4,3,3,2], especial:true},
  {nivel: 11, ba:[5], fortitude:3, reflexos:3, vontade:7, magias:[4,4,4,4,3,2,1]},
  {nivel: 12, ba:[6,1], fortitude:4, reflexos:4, vontade:8, magias:[4,4,4,4,3,3,2]},
  {nivel: 13, ba:[6,1], fortitude:4, reflexos:4, vontade:8, magias:[4,4,4,4,4,3,2,1]},
  {nivel: 14, ba:[7,2], fortitude:4, reflexos:4, vontade:9, magias:[4,4,4,4,4,3,3,2]},
  {nivel: 15, ba:[7,2], fortitude:5, reflexos:5, vontade:9, magias:[4,4,4,4,4,4,3,2,1], especial:true},
  {nivel: 16, ba:[8,3], fortitude:5, reflexos:5, vontade:10, magias:[4,4,4,4,4,4,3,3,2]},
  {nivel: 17, ba:[8,3], fortitude:5, reflexos:5, vontade:10, magias:[4,4,4,4,4,4,4,3,2,1]},
  {nivel: 18, ba:[9,4], fortitude:6, reflexos:6, vontade:11, magias:[4,4,4,4,4,4,4,3,3,2]},
  {nivel: 19, ba:[9,4], fortitude:6, reflexos:6, vontade:11, magias:[4,4,4,4,4,4,4,4,3,3]},
  {nivel: 20, ba:[10,5], fortitude:6, reflexos:6, vontade:12, magias:[4,4,4,4,4,4,4,4,4,4], especial:true}
];

mago.upLevel = function(level){
  var retorno = 'Nível: '+ level;
  for(var index = 0; index < mago.rules.length; index++){
    if(level === mago.rules[index].nivel){

      retorno += ', ba: ';
      var bas = mago.rules[index].ba;
      for(var j = 0; j < bas.length; j++){
        if(j !== 0) retorno += '/';
        retorno += '+' + bas[j]
      }

      retorno += '. Fortitude: +' + mago.rules[index].fortitude +
        ', Reflexos: +' + mago.rules[index].reflexos +
        ', Vontade: +' + mago.rules[index].vontade;

      retorno += '. Magias por dia: ';
      var magias = mago.rules[index].magias;
      for(var k = 0; k < magias.length; k++){
        if(k > 0) retorno += ', ';
        retorno += magias[k] + '(' + k + ')';
      }

      if(mago.rules[index].especial){
        retorno += '. Talento adicional';
      }
    }
  }
  return retorno;
}


module.exports = mago;
