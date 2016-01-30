var statsController = require('../controllers/statsController');

var statsCommand = function(params){
  if(/^(S|s)tats\s+(\s*\w*)*\?\s*$/){
    var msg = params.msg.replace(/(S|s)tats/g,'').trim();
    params.nome = msg.substring(0, msg.indexOf('?'));

    statsController.listStats(params);
  }
};

module.exports = statsCommand;
