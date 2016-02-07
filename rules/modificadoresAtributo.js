var lista = [
  {valor: 1, modificador: -5},
  {valor: 2, modificador: -4},
  {valor: 3, modificador: -4},
  {valor: 4, modificador: -3},
  {valor: 5, modificador: -3},
  {valor: 6, modificador: -2},
  {valor: 7, modificador: -2},
  {valor: 8, modificador: -1},
  {valor: 9, modificador: -1},
  {valor: 10, modificador: 0},
  {valor: 11, modificador: 0},
  {valor: 12, modificador: 1},
  {valor: 13, modificador: 1},
  {valor: 14, modificador: 2},
  {valor: 15, modificador: 2},
  {valor: 16, modificador: 3},
  {valor: 17, modificador: 3},
  {valor: 18, modificador: 4},
  {valor: 19, modificador: 4},
  {valor: 20, modificador: 5},
  {valor: 21, modificador: 5},
  {valor: 22, modificador: 6},
  {valor: 23, modificador: 6},
  {valor: 24, modificador: 7},
  {valor: 25, modificador: 7},
  {valor: 26, modificador: 8},
  {valor: 27, modificador: 8},
];

var modificadores = function(valor){
  for(var index = 0; index < lista.length; index++){
    if(valor === lista[index].valor){
      return lista[index].modificador;
    }
  }
};

module.exports = modificadores;
