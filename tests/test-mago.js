var assert = require('assert');
var expect = require('chai').expect;
var mago = require('../rules/mago');


describe("mago", function() {
   describe("#upLevel", function() {
       it("deve retornar valores referentes ao level 1", function(){
         var retorno = 'Nível: 1, ba: +0. Fortitude: +0, Reflexos: +0, Vontade: +2. Magias por dia: 3(0), 1(1)';
          expect(retorno).to.equal(mago.upLevel(1));
       });

       it("deve retornar valores referentes ao level 2", function(){
         var retorno = 'Nível: 2, ba: +1. Fortitude: +0, Reflexos: +0, Vontade: +3. Magias por dia: 4(0), 2(1)';
          expect(retorno).to.equal(mago.upLevel(2));
       });

       it("deve retornar valores referentes ao level 3", function(){
         var retorno = 'Nível: 3, ba: +1. Fortitude: +1, Reflexos: +1, Vontade: +3. Magias por dia: 4(0), 2(1), 1(2)';
          expect(retorno).to.equal(mago.upLevel(3));
       });

       it("deve retornar valores referentes ao level 4", function(){
         var retorno = 'Nível: 4, ba: +2. Fortitude: +1, Reflexos: +1, Vontade: +4. Magias por dia: 4(0), 3(1), 2(2)';
          expect(retorno).to.equal(mago.upLevel(4));
       });

       it("deve retornar valores referentes ao level 5", function(){
         var retorno = 'Nível: 5, ba: +2. Fortitude: +1, Reflexos: +1, Vontade: +4. Magias por dia: 4(0), 3(1), 2(2), 1(3). Talento adicional';
          expect(retorno).to.equal(mago.upLevel(5));
       });

       it("deve retornar valores referentes ao level 6", function(){
         var retorno = 'Nível: 6, ba: +3. Fortitude: +2, Reflexos: +2, Vontade: +5. Magias por dia: 4(0), 3(1), 3(2), 2(3)';
          expect(retorno).to.equal(mago.upLevel(6));
       });

       it("deve retornar valores referentes ao level 7", function(){
         var retorno = 'Nível: 7, ba: +3. Fortitude: +2, Reflexos: +2, Vontade: +5. Magias por dia: 4(0), 4(1), 3(2), 2(3), 1(4)';
          expect(retorno).to.equal(mago.upLevel(7));
       });

       it("deve retornar valores referentes ao level 8", function(){
         var retorno = 'Nível: 8, ba: +4. Fortitude: +2, Reflexos: +2, Vontade: +6. Magias por dia: 4(0), 4(1), 3(2), 3(3), 2(4)';
          expect(retorno).to.equal(mago.upLevel(8));
       });

       it("deve retornar valores referentes ao level 9", function(){
         var retorno = 'Nível: 9, ba: +4. Fortitude: +3, Reflexos: +3, Vontade: +6. Magias por dia: 4(0), 4(1), 4(2), 3(3), 2(4), 1(5)';
          expect(retorno).to.equal(mago.upLevel(9));
       });

       it("deve retornar valores referentes ao level 10", function(){
         var retorno = 'Nível: 10, ba: +5. Fortitude: +3, Reflexos: +3, Vontade: +7. Magias por dia: 4(0), 4(1), 4(2), 3(3), 3(4), 2(5). Talento adicional';
          expect(retorno).to.equal(mago.upLevel(10));
       });

       it("deve retornar valores referentes ao level 11", function(){
         var retorno = 'Nível: 11, ba: +5. Fortitude: +3, Reflexos: +3, Vontade: +7. Magias por dia: 4(0), 4(1), 4(2), 4(3), 3(4), 2(5), 1(6)';
          expect(retorno).to.equal(mago.upLevel(11));
       });

       it("deve retornar valores referentes ao level 12", function(){
         var retorno = 'Nível: 12, ba: +6/+1. Fortitude: +4, Reflexos: +4, Vontade: +8. Magias por dia: 4(0), 4(1), 4(2), 4(3), 3(4), 3(5), 2(6)';
          expect(retorno).to.equal(mago.upLevel(12));
       });

       it("deve retornar valores referentes ao level 13", function(){
         var retorno = 'Nível: 13, ba: +6/+1. Fortitude: +4, Reflexos: +4, Vontade: +8. Magias por dia: 4(0), 4(1), 4(2), 4(3), 4(4), 3(5), 2(6), 1(7)';
          expect(retorno).to.equal(mago.upLevel(13));
       });

       it("deve retornar valores referentes ao level 14", function(){
         var retorno = 'Nível: 14, ba: +7/+2. Fortitude: +4, Reflexos: +4, Vontade: +9. Magias por dia: 4(0), 4(1), 4(2), 4(3), 4(4), 3(5), 3(6), 2(7)';
          expect(retorno).to.equal(mago.upLevel(14));
       });

       it("deve retornar valores referentes ao level 15", function(){
         var retorno = 'Nível: 15, ba: +7/+2. Fortitude: +5, Reflexos: +5, Vontade: +9. Magias por dia: 4(0), 4(1), 4(2), 4(3), 4(4), 4(5), 3(6), 2(7), 1(8). Talento adicional';
          expect(retorno).to.equal(mago.upLevel(15));
       });

       it("deve retornar valores referentes ao level 16", function(){
         var retorno = 'Nível: 16, ba: +8/+3. Fortitude: +5, Reflexos: +5, Vontade: +10. Magias por dia: 4(0), 4(1), 4(2), 4(3), 4(4), 4(5), 3(6), 3(7), 2(8)';
          expect(retorno).to.equal(mago.upLevel(16));
       });

       it("deve retornar valores referentes ao level 17", function(){
         var retorno = 'Nível: 17, ba: +8/+3. Fortitude: +5, Reflexos: +5, Vontade: +10. Magias por dia: 4(0), 4(1), 4(2), 4(3), 4(4), 4(5), 4(6), 3(7), 2(8), 1(9)';
          expect(retorno).to.equal(mago.upLevel(17));
       });

       it("deve retornar valores referentes ao level 18", function(){
         var retorno = 'Nível: 18, ba: +9/+4. Fortitude: +6, Reflexos: +6, Vontade: +11. Magias por dia: 4(0), 4(1), 4(2), 4(3), 4(4), 4(5), 4(6), 3(7), 3(8), 2(9)';
          expect(retorno).to.equal(mago.upLevel(18));
       });

       it("deve retornar valores referentes ao level 19", function(){
         var retorno = 'Nível: 19, ba: +9/+4. Fortitude: +6, Reflexos: +6, Vontade: +11. Magias por dia: 4(0), 4(1), 4(2), 4(3), 4(4), 4(5), 4(6), 4(7), 3(8), 3(9)';
          expect(retorno).to.equal(mago.upLevel(19));
       });

       it("deve retornar valores referentes ao level 20", function(){
         var retorno = 'Nível: 20, ba: +10/+5. Fortitude: +6, Reflexos: +6, Vontade: +12. Magias por dia: 4(0), 4(1), 4(2), 4(3), 4(4), 4(5), 4(6), 4(7), 4(8), 4(9). Talento adicional';
          expect(retorno).to.equal(mago.upLevel(20));
       });
   });
});
