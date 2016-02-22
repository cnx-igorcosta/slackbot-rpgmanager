var virtudesController = require('../controllers/virtudesController');

var virtudesCommand = function(params){
  if(/^((F|f)ortitude|(R|r)eflexos|(V|v)ontade)\s+\w+(\s\w+)*\s*\?\s*$/.test(params.msg)){

    var virtude = params.msg.match(/(F|f)ortitude|(R|r)eflexos|(V|v)ontade/)[0];
    nome = params.msg.substring(virtude.length, params.msg.indexOf('?')).trim();

    params.nome = nome;
    params.virtude = virtude;

    virtudesController.consultarVirtude(params);
  }
};

module.exports = virtudesCommand;
