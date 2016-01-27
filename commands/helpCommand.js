var helpCommand = function(params){

    var retorno = 'rpgmanager comandos:\n'+
    '- new - Salva novo personagem, nome, raca e classe,  atributos e pv devem ser enviados.\n'+
    '   Ex: "new nome:Aragorn, raca:humano, classe:guerreiro, for:18, des:15, con:16, int:14, sab:16, car:12, pv:10".\n\n'+
    '- list - Lista os nomes de todos os personagens salvos.\n\n'+
    '- pvTotal - cria novo valor de pv total do personagem seguindo a estrutura:\n'+
    '   [PVTotal, PvTotal, pVtotal ou pvtotal] [nome do personagem] [=] [quantidade de pvs]\n'+
    '   Ex: "pvTotal Gandald = 50".\n\n'+
    '- pv - Adiciona, remove, gera ou consulta pv do personagem seguindo a estrutura:\n'+
    '   [PV, Pv, pV ou pv] [nome do personagem] [+, - ou =] [quantidade de pvs].\n'+
    '   Ex: "pv Aragorn +3", ou "pv Aragorn -5" ou pv Aragorn = 20.\n'+
    '   Para consultar pv do personagem utilize o comando "?". Ex: pv Aragorn ?\n\n'+
    '- xp - Adiciona ou remove xp ao personagem seguindo a estrutura:\n'+
    '   [XP,Xp,xP ou xp] [nome do personagem] [+, - ou =] [quantidade de experiencia]\n'+
    '   Ex: "xp Legolas +300" ou "pv Legolas -50".\n'+
    '   Para consultar xp do personagem utilize o comando "?".Ex: xp Gimli ?\n\n'+
    '- item - Adiciona, remove ou consulta itens do personagem: '+
    '   [Item, item, Itens ou itens] [nome do personagem] [+ ou -][(][nome do item][,descricao do item - opcional][,quantidade a adicionar/remover - opcional][)].\n'+
    '   Ex: "Item Gandalf + (Espada, Grlamdring magica, 1)" ou Itens Legolas - (flecha caca,10)\n'+
    '   Para consultar os itens do personagem utilize o comando "?". Ex: "Item Bilbo ?" ou "Itens Merrin ?"\n\n'+
    '- gold - Adiciona, remove ou consulta dinheiro do personagem: '+
    '   [Gold ou gold] [nome do personagem] [+ ou -] [quantidade].\n'+
    '   Ex: "Gold Legolas + 10" ou gold Legolas - 50\n'+
    '   Para consultar o dinheiro do personagem utilize o comando "?". Ex: "Gold Bilbo ?""\n\n'+
    '- roll - Rolagem de dados seguindo a estrutura: '+
    '   [Roll ou roll] [quantidade de dados][D ou d][quantidade de faces do dado] ([+ ou -][modificador], opcional).\n'+
    '   Ex: "roll 3d6", "roll 1d20+1", "roll 2d8-3".';

    params.bot.postMessageToChannel(params.channel.name, retorno, {as_user: true});
};

module.exports = helpCommand;
