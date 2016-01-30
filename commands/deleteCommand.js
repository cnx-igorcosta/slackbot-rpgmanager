var deleteController = require('../controllers/deleteController');

var deleteCommand = function(params){

  if(/^(D|d)elete\s*\w+(\s\w+)*\s*$/.test(params.msg)){

    var nome = params.msg.replace(/(D|d)elete/g,'').trim();
    params.nome = nome;
    deleteController.deletePersonagem(params);
  }

};

module.exports = deleteCommand;
