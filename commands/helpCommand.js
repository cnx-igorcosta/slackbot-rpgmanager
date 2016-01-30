var helpCommand = function(params){

    var retorno = 'rpgmanager comandos:\n'+
    '- new - Salva novo personagem. Deve seguir a estrutura:'+
    '   new nome:[nome], raca:[raça], classe:[classe], for:[força], des:[destreza], con:[constituição], int:[inteligência], sab:[Sabedoria], car:[Carisma], pv:[Pontos de vida]\n'+
    '   Ex: "new nome:Aragorn, raca:humano, classe:guerreiro, for:18, des:15, con:16, int:14, sab:16, car:12, pv:10".\n\n'+
    '- list - Lista os nomes de todos os personagens salvos.\n\n'+
    '- pvTotal - cria novo valor de pv total do personagem seguindo a estrutura:\n'+
    '   [PVTotal, PvTotal, pVtotal ou pvtotal] [nome do personagem] [=] [quantidade de pvs]. Ex: "pvTotal Gandald = 50".\n\n'+
    '- pv - Adiciona, remove, gera ou consulta pv do personagem seguindo a estrutura:\n'+
    '   [PV, Pv, pV ou pv] [nome do personagem] [+, - ou =] [quantidade de pvs]. Ex: "pv Aragorn +3", ou "pv Aragorn -5" ou pv Aragorn = 20.\n'+
    '   Para consultar pv do personagem utilize o comando "?". Ex: pv Aragorn ?\n\n'+
    '- xp - Adiciona ou remove xp ao personagem seguindo a estrutura:\n'+
    '   [XP,Xp,xP ou xp] [nome do personagem] [+, - ou =] [quantidade de experiencia]. Ex: "xp Legolas +300" ou "pv Legolas -50".\n'+
    '   Para consultar xp do personagem utilize o comando "?".Ex: xp Gimli ?\n\n'+
    '- gold - Adiciona, remove ou consulta dinheiro do personagem: '+
    '   [Gold ou gold] [nome do personagem] [+ ou -] [quantidade]. Ex: "Gold Legolas + 10" ou gold Legolas - 50\n'+
    '   Para consultar o dinheiro do personagem utilize o comando "?". Ex: "Gold Bilbo ?""\n\n'+
    '- level - Adiciona, remove ou consulta level do personagem: '+
    '   [Gold ou gold] [nome do personagem] [+ ou -]. Ex: "Level Legolas +" ou "level Legolas -"\n'+
    '   Para consultar o nível do personagem utilize o comando "?". Ex: "level Bilbo ?""\n\n'+
    '- item - Adiciona, remove ou consulta itens do personagem: '+
    '   [Item, item, Itens ou itens] [nome do personagem] [+ ou -][(][nome do item][,descricao do item - opcional][,quantidade a adicionar/remover - opcional][)].\n'+
    '   Ex: "Item Gandalf + (Espada, Grlamdring magica, 1)" ou Itens Legolas - (flecha caca,10)\n'+
    '   Para consultar os itens do personagem utilize o comando "?". Ex: "Item Bilbo ?" ou "Itens Merrin ?"\n\n'+
    '- weapon - Adiciona, remove ou consulta arma do personagem: '+
    '   [Weapon ou weapon] [nome do personagem] [+ ou -][(][nome da arma][,][descrição - opcional][,][dano][,][bonus de ataque][)].\n'+
    '   Ex: "Weapon Legolas + (arco, elfico, 1d6+1, 1)" ou "weapon Frodo - (punhal)".\n'+
    '   Para consultar as armas do personagem utilize o comando "?". Ex: "Weapon Bilbo ?"\n\n'+
    '- armor - Adiciona, remove ou consulta armadura do personagem: '+
    '   [Armor ou armor] [nome do personagem] [+ ou -][(][nome da armadura][,][descrição - opcional][,][categoria de armadura][)].\n'+
    '   Ex: "Armor Legolas + (cota de malha, elfica, 4)" ou "armor Frodo - (colete mithril)".\n'+
    '   Para consultar as armadura do personagem utilize o comando "?". Ex: "Armor Bilbo ?"\n\n'+
    '- roll - Rolagem de dados seguindo a estrutura: '+
    '   [Roll ou roll] [quantidade de dados][D ou d][quantidade de faces do dado] ([+ ou -][modificador], opcional).\n'+
    '   Ex: "roll 3d6", "roll 1d20+1", "roll 2d8-3".';

    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
};

module.exports = helpCommand;
