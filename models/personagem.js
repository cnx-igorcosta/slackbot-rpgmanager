var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  nome:String,
  descricao:String,
  quantidade:Number
});

var armaSchema = new Schema({
  nome:String,
  descricao:String,
  dano:String,
  ba:Number
});

var armaduraSchema = new Schema({
  nome:String,
  descricao: String,
  ca:Number
});

var personagemSchema = new Schema({
  nome : {type : String, index: {unique: true}},
  for : Number,
  des : Number,
  con : Number,
  int : Number,
  sab : Number,
  car : Number,
  pv : Number,
  pvTotal: Number,
  xp: Number,
  nivel: Number,
  classe: String,
  raca: String,
  //talentos: [String],
  dinheiro: Number,
  itens: [itemSchema],
  armas: [armaSchema],
  armaduras: [armaduraSchema],
  //magias[String]
});

// personagemSchema.methods.stats = function(){
//   var retorno = 'Nome: ' + this.nome + ', Raça: ' + this.raca + ', Classe:' +
//     this.classe +', FOR ' + this.for + ' DES ' + this.des+ ' CON ' + this.con +
//     ' INT '+ this.int + ' SAB '+ this.sab +' CAR ' + this.car;
//   return retorno;
// };

var Personagem = mongoose.model('Personagem', personagemSchema);

module.exports = Personagem;
