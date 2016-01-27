var personagemController = require('../controllers/personagemController');

var rollCommand = function(params){
  //verifica se texto se encaixa na estrutura:
  //{[Roll ou roll] [quantidade de dados][D ou d][quantidade de faces do dado] [+ ou -, opcional][modificador, opcional]}
  //Ex: 'Roll 1d6', 'roll 1d20 -1', 'roll 2d8 +2'
  if(/^(R|r)oll\s*\d+(D|d)\d+\s*((\+|-)\s*\d+\s*)?$/.test(params.msg)){
    //Remove texto Roll
    var text = params.msg.replace(/(R|r)oll/g,"").replace(/\s/g,"").toLowerCase();
    //Recupera quantidade de dados a rolar
    var vezes = parseInt(text.substring(0, text.indexOf('d')));
    var faces, modif;
    //Verifica se tem modificador do valor do dado ex:(1d6+1);
    if(/^\d+[d]\d+(\+|-)\s*\d+$/.test(text)){
      //faces do dado a rolar
      faces = (text.indexOf('+') > -1)
        ? text.substring((text.indexOf('d')+1),(text.indexOf('+')))
        : text.substring((text.indexOf('d')+1),(text.indexOf('-')));
      //modificador do dado a rolar
      modif = (text.indexOf('+') > -1)
        ? text.substring((text.indexOf('+')),(text.length))
        : text.substring((text.indexOf('-')),(text.length));
      modif = parseInt(modif);
    }else{
      //Caso não tenha modificador
      faces = parseInt(text.substring((text.indexOf('d')+1),(text.length)));
    }

    params.vezes = vezes;
    params.faces = faces
    params.modif = modif;
    rolarDado(params);
  }
};

//Função rolar dado
var rolarDado = function(params){
  var resultado = 'Resultado ' + params.vezes + 'd' + params.faces;
  if(params.modif){
      resultado = (params.modif > 0) ? (resultado + ' + ' + params.modif) : (resultado + ' ' + params.modif);
  }
  resultado += ' = ';
  var total = 0;

  for(var index = 0; index < (params.vezes); index++){
    var valor = Math.floor((Math.random() * params.faces) + 1);

    if(index > 0){resultado += ", "}
    //regra diferente caso tenha modificador. Obs: nunca um resultado vai ser menor que 1
    if(params.modif){
      resultado = resultado + '(' + valor + ((params.modif > 0) ? '+' : '') + params.modif + ')';
      total += (valor + params.modif) <= 0 ? 1 : (valor + params.modif);

    }else{
      resultado += valor;
      total += valor;
    }
  }
  resultado = (total ? resultado + "; Total: "+total : null);
  params.bot.postMessageToChannel(params.channel.name, resultado, {as_user: true});
};


module.exports = rollCommand;
