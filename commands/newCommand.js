var newController = require('../controllers/newController');

var newCommand = function(params){
  //Texto deve ser enviado com estrutura nome:valor separando por virgula entre parametros
  // Ex: "new nome:Aragorn, raca:humano, classe:guerreiro, for:18, des:15, con:16, int:14, sab:16, car:12, pv:10"
  var personagemTxt = '{\"' + params.msg + '\"}';
  //remove new statement and include "" in all params to parse to JSON
  personagemTxt = personagemTxt.replace(/new/g, "").replace(/\s/g,"")
    .replace(/:/g,"\":\"").replace(/,/g,"\",\"");
  //TODO: try/catch
  params.pers = JSON.parse(personagemTxt);
  console.log('pv: '+params.pers.pv);
  newController.salvar(params);
}

module.exports = newCommand;
