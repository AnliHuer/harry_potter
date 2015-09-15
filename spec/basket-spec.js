var Basket = require('../src/basket.js');
var basket = new Basket();
describe('Basket',function(){

  describe('test Basket the function addBasketItem',function(){
    it('should add the newBookItem in basketItem',function(){
      basket.addBasketItem({no:1004,count:2});
      expect(basket.basketItem[0].count).toEqual(2);
      basket.addBasketItem({no:1004,count:2});
      expect(basket.basketItem[0].count).toEqual(4);
    });
  });

  describe('test Basket the function getBookNum',function(){
    it('should return the num of all buyBook',function(){
      basket.basketItem = [{no:1001,count:3},{no:1003,count:1}];
      var buyBookNum = basket.getBookNum();
      expect(buyBookNum).toEqual(4);
    });
  });
});
