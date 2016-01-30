var connection = require('../config/database.js')('mongodb://localhost/rpgmanager');
//var personagemController = require('../controllers/personagemController');

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


var comandos = [
  {nome: 'rpghelp', comando : helpCommand},
  {nome : 'new', comando : newCommand},
  {nome : 'list', comando : listCommand},
  {nome : 'update', comando : null},
  {nome : 'delete', comando : null},
  {nome : 'pv', comando : pvCommand},
  {nome : 'xp', comando : xpCommand},
  {nome : 'item', comando : itemCommand},
  {nome : 'itens', comando : itemCommand},
  {nome : 'weapon', comando : weaponCommand},
  {nome : 'armor', comando : armorCommand},
  {nome : 'stats', comando : statsCommand},
  {nome : 'gold', comando : goldCommand},
  {nome : 'level', comando : levelCommand},
  {nome : 'roll', comando : rollCommand}
];

module.exports = comandos;
