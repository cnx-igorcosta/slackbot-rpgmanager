var assert = require('assert');
var expect = require('chai').expect;
var guerreiro = require('../rules/guerreiro');

describe("guerreiro", function() {
   describe("#upLevel", function() {
       it("deve retornar valores referentes ao level 1", function(){
         var retorno = 'Nível: 1, ba: +1. Fortitude: +2, Reflexos: +0, Vontade: +0. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(1));
       });

       it("deve retornar valores referentes ao level 2", function(){
         var retorno = 'Nível: 2, ba: +2. Fortitude: +3, Reflexos: +0, Vontade: +0. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(2));
       });

       it("deve retornar valores referentes ao level 3", function(){
         var retorno = 'Nível: 3, ba: +3. Fortitude: +3, Reflexos: +1, Vontade: +1';
          expect(retorno).to.equal(guerreiro.upLevel(3));
       });

       it("deve retornar valores referentes ao level 4", function(){
         var retorno = 'Nível: 4, ba: +4. Fortitude: +4, Reflexos: +1, Vontade: +1. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(4));
       });

       it("deve retornar valores referentes ao level 5", function(){
         var retorno = 'Nível: 5, ba: +5. Fortitude: +4, Reflexos: +1, Vontade: +1';
          expect(retorno).to.equal(guerreiro.upLevel(5));
       });

       it("deve retornar valores referentes ao level 6", function(){
         var retorno = 'Nível: 6, ba: +6/+1. Fortitude: +5, Reflexos: +2, Vontade: +2. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(6));
       });

       it("deve retornar valores referentes ao level 7", function(){
         var retorno = 'Nível: 7, ba: +7/+2. Fortitude: +5, Reflexos: +2, Vontade: +2';
          expect(retorno).to.equal(guerreiro.upLevel(7));
       });

       it("deve retornar valores referentes ao level 8", function(){
         var retorno = 'Nível: 8, ba: +8/+3. Fortitude: +6, Reflexos: +2, Vontade: +2. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(8));
       });

       it("deve retornar valores referentes ao level 9", function(){
         var retorno = 'Nível: 9, ba: +9/+4. Fortitude: +6, Reflexos: +3, Vontade: +3';
          expect(retorno).to.equal(guerreiro.upLevel(9));
       });

       it("deve retornar valores referentes ao level 10", function(){
         var retorno = 'Nível: 10, ba: +10/+5. Fortitude: +7, Reflexos: +3, Vontade: +3. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(10));
       });

       it("deve retornar valores referentes ao level 11", function(){
         var retorno = 'Nível: 11, ba: +11/+6/+1. Fortitude: +7, Reflexos: +3, Vontade: +3';
          expect(retorno).to.equal(guerreiro.upLevel(11));
       });

       it("deve retornar valores referentes ao level 12", function(){
         var retorno = 'Nível: 12, ba: +12/+7/+2. Fortitude: +8, Reflexos: +4, Vontade: +4. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(12));
       });

       it("deve retornar valores referentes ao level 13", function(){
         var retorno = 'Nível: 13, ba: +13/+8/+3. Fortitude: +8, Reflexos: +4, Vontade: +4';
          expect(retorno).to.equal(guerreiro.upLevel(13));
       });

       it("deve retornar valores referentes ao level 14", function(){
         var retorno = 'Nível: 14, ba: +14/+9/+4. Fortitude: +9, Reflexos: +4, Vontade: +4. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(14));
       });

       it("deve retornar valores referentes ao level 15", function(){
         var retorno = 'Nível: 15, ba: +15/+10/+5. Fortitude: +9, Reflexos: +5, Vontade: +5';
          expect(retorno).to.equal(guerreiro.upLevel(15));
       });

       it("deve retornar valores referentes ao level 16", function(){
         var retorno = 'Nível: 16, ba: +16/+11/+6/+1. Fortitude: +10, Reflexos: +5, Vontade: +5. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(16));
       });

       it("deve retornar valores referentes ao level 17", function(){
         var retorno = 'Nível: 17, ba: +17/+12/+7/+2. Fortitude: +10, Reflexos: +5, Vontade: +5';
          expect(retorno).to.equal(guerreiro.upLevel(17));
       });

       it("deve retornar valores referentes ao level 18", function(){
         var retorno = 'Nível: 18, ba: +18/+13/+8/+3. Fortitude: +11, Reflexos: +6, Vontade: +6. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(18));
       });

       it("deve retornar valores referentes ao level 19", function(){
         var retorno = 'Nível: 19, ba: +19/+14/+9/+4. Fortitude: +11, Reflexos: +6, Vontade: +6';
          expect(retorno).to.equal(guerreiro.upLevel(19));
       });

       it("deve retornar valores referentes ao level 20", function(){
         var retorno = 'Nível: 20, ba: +20/+15/+10/+5. Fortitude: +12, Reflexos: +6, Vontade: +6. Talento adicional';
          expect(retorno).to.equal(guerreiro.upLevel(20));
       });
   });
});
