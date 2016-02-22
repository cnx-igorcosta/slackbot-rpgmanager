//var connection = require('../config/database.js')('mongodb://localhost/rpgmanager');
var uri = process.env.MONGOLAB_URI;
var connection = require('../config/database.js')(uri);
var personagemController = require('../controllers/personagemController');

var helpCommand = require('./helpCommand');
var newCommand = require('./newCommand');
var listCommand = require('./listCommand');
var pvCommand = require('./pvCommand');
var rollCommand = require('./rollCommand');
var xpCommand = require('./xpCommand');
var itemCommand = require('./itemCommand');
var goldCommand = require('./goldCommand');
var weaponCommand = require('./weaponCommand');
var statsCommand = require('./statsCommand');
var armorCommand = require('./armorCommand');
var levelCommand = require('./levelCommand');
var deleteCommand = require('./deleteCommand');
var setCommand = require('./setCommand');
var virtudesCommand = require('./virtudesCommand');


var comandos = [
  {nome: 'rpghelp', comando : helpCommand},
  {nome : 'new', comando : newCommand},
  {nome : 'list', comando : listCommand},
  {nome : 'set', comando : setCommand},
  {nome : 'delete', comando : deleteCommand},
  {nome : 'pv', comando : pvCommand},
  {nome : 'xp', comando : xpCommand},
  {nome : 'item', comando : itemCommand},
  {nome : 'itens', comando : itemCommand},
  {nome : 'weapon', comando : weaponCommand},
  {nome : 'armor', comando : armorCommand},
  {nome : 'stats', comando : statsCommand},
  {nome : 'gold', comando : goldCommand},
  {nome : 'level', comando : levelCommand},
  {nome : 'fortitude', comando : virtudesCommand},
  {nome : 'reflexo', comando : virtudesCommand},
  {nome : 'vontade', comando : virtudesCommand},
  // {nome : 'ba', comando : baCommand},
  {nome : 'roll', comando : rollCommand}
];

module.exports = comandos;
