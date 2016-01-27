var listController = require('../controllers/listController');

var listCommand = function(params){
  if(/^(L|l)ist\s*$/.test(params.msg)){
    listController.listar(params);
  }
};

module.exports = listCommand;
