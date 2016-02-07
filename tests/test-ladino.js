var assert = require('assert');
var expect = require('chai').expect;
var ladino = require('../rules/ladino');

describe("ladino", function() {
   describe("#upLevel", function() {
       it("deve retornar valores referentes ao level 1", function(){
         var retorno = 'Nível: 1, ba: +0. Fortitude: +0, Reflexos: +2, Vontade: +0. Talento: Ataque furtivo +1d6, encontrar armadilhas';
          expect(retorno).to.equal(ladino.upLevel(1));
       });

       it("deve retornar valores referentes ao level 2", function(){
         var retorno = 'Nível: 2, ba: +1. Fortitude: +0, Reflexos: +3, Vontade: +0. Talento: Evasão';
          expect(retorno).to.equal(ladino.upLevel(2));
       });

       it("deve retornar valores referentes ao level 3", function(){
         var retorno = 'Nível: 3, ba: +2. Fortitude: +1, Reflexos: +3, Vontade: +1. Talento: Ataque furtivo +2d6, sentir armadilhas +1d6';
          expect(retorno).to.equal(ladino.upLevel(3));
       });

       it("deve retornar valores referentes ao level 4", function(){
         var retorno = 'Nível: 4, ba: +3. Fortitude: +1, Reflexos: +4, Vontade: +1. Talento: Esquiva sobrenatural';
          expect(retorno).to.equal(ladino.upLevel(4));
       });

       it("deve retornar valores referentes ao level 5", function(){
         var retorno = 'Nível: 5, ba: +3. Fortitude: +1, Reflexos: +4, Vontade: +1. Talento: Ataque furtivo +3d6';
          expect(retorno).to.equal(ladino.upLevel(5));
       });

       it("deve retornar valores referentes ao level 6", function(){
         var retorno = 'Nível: 6, ba: +4. Fortitude: +2, Reflexos: +5, Vontade: +2. Talento: Sentir armadilhas +2';
          expect(retorno).to.equal(ladino.upLevel(6));
       });

       it("deve retornar valores referentes ao level 7", function(){
         var retorno = 'Nível: 7, ba: +5. Fortitude: +2, Reflexos: +5, Vontade: +2. Talento: Ataque furtivo +4d6';
          expect(retorno).to.equal(ladino.upLevel(7));
       });

       it("deve retornar valores referentes ao level 8", function(){
         var retorno = 'Nível: 8, ba: +6/+1. Fortitude: +2, Reflexos: +6, Vontade: +2. Talento: Esquiva sobrenatural aprimorada';
          expect(retorno).to.equal(ladino.upLevel(8));
       });

       it("deve retornar valores referentes ao level 9", function(){
         var retorno = 'Nível: 9, ba: +6/+1. Fortitude: +3, Reflexos: +6, Vontade: +3. Talento: Ataque furtivo +5d6, sentir armadilhas +3';
          expect(retorno).to.equal(ladino.upLevel(9));
       });

       it("deve retornar valores referentes ao level 10", function(){
         var retorno = 'Nível: 10, ba: +7/+2. Fortitude: +3, Reflexos: +7, Vontade: +3. Talento: Habilidade especial';
          expect(retorno).to.equal(ladino.upLevel(10));
       });

       it("deve retornar valores referentes ao level 11", function(){
         var retorno = 'Nível: 11, ba: +8/+3. Fortitude: +3, Reflexos: +7, Vontade: +3. Talento: Ataque furtivo +6d6';
          expect(retorno).to.equal(ladino.upLevel(11));
       });

       it("deve retornar valores referentes ao level 12", function(){
         var retorno = 'Nível: 12, ba: +9/+4. Fortitude: +4, Reflexos: +8, Vontade: +4. Talento: Sentir armadilhas +4';
          expect(retorno).to.equal(ladino.upLevel(12));
       });

       it("deve retornar valores referentes ao level 13", function(){
         var retorno = 'Nível: 13, ba: +9/+4. Fortitude: +4, Reflexos: +8, Vontade: +4. Talento: Ataque furtivo +7d6, habilidade especial';
          expect(retorno).to.equal(ladino.upLevel(13));
       });

       it("deve retornar valores referentes ao level 14", function(){
         var retorno = 'Nível: 14, ba: +10/+5. Fortitude: +4, Reflexos: +9, Vontade: +4';
          expect(retorno).to.equal(ladino.upLevel(14));
       });

       it("deve retornar valores referentes ao level 15", function(){
         var retorno = 'Nível: 15, ba: +11/+6/+1. Fortitude: +5, Reflexos: +9, Vontade: +5. Talento: Ataque furtivo +8d6, sentir armadilhas +5';
          expect(retorno).to.equal(ladino.upLevel(15));
       });

       it("deve retornar valores referentes ao level 16", function(){
         var retorno = 'Nível: 16, ba: +12/+7/+2. Fortitude: +5, Reflexos: +10, Vontade: +5. Talento: Habilidade especial';
          expect(retorno).to.equal(ladino.upLevel(16));
       });

       it("deve retornar valores referentes ao level 17", function(){
         var retorno = 'Nível: 17, ba: +12/+7/+2. Fortitude: +5, Reflexos: +10, Vontade: +5. Talento: Ataque furtivo +9d6';
          expect(retorno).to.equal(ladino.upLevel(17));
       });

       it("deve retornar valores referentes ao level 18", function(){
         var retorno = 'Nível: 18, ba: +13/+8/+3. Fortitude: +6, Reflexos: +11, Vontade: +6. Talento: Sentir armadilhas +6';
          expect(retorno).to.equal(ladino.upLevel(18));
       });

       it("deve retornar valores referentes ao level 19", function(){
         var retorno = 'Nível: 19, ba: +14/+9/+4. Fortitude: +6, Reflexos: +11, Vontade: +6. Talento: Ataque furtivo +10d6, habilidade especial';
          expect(retorno).to.equal(ladino.upLevel(19));
       });

       it("deve retornar valores referentes ao level 20", function(){
         var retorno = 'Nível: 20, ba: +15/+10/+5. Fortitude: +6, Reflexos: +12, Vontade: +6';
          expect(retorno).to.equal(ladino.upLevel(20));
       });
   });
});
