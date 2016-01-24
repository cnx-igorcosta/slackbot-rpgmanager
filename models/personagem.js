var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  raca: String
});

personagemSchema.methods.stats = function(){
  var retorno = 'Nome: '+ this.nome +'/n FOR ' + this.for + ' DES ' + this.des
    + ' CON ' + this.con + ' INT '+ this.int + ' SAB '+ this.sab +' CAR ' + this.car;
  return retorno;
};

var Personagem = mongoose.model('Personagem', personagemSchema);

module.exports = Personagem;
