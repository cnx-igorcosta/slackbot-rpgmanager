var setController = require('../controllers/setController');

var setCommand = function(params){

  if(/^(S|s)et\s+(\s*\w*)*\(\w+:\w+\)\s*$/.test(params.msg)){

    var msg = params.msg.replace(/(S|s)et/,'').trim();
    params.nome = msg.substring(0, msg.indexOf('(')).trim();
    var json = msg.match(/\(\w+:\w+\)/)[0].replace(/\(/g,'{"')
      .replace(/\)/g,'"}').replace(/:/g,'":"').trim();

    console.log(json);
    params.setValue = JSON.parse(json);

    setController.setValue(params);
  }
};

module.exports = setCommand;
