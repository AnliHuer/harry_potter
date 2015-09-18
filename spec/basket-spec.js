var Basket = require('../src/basket.js');
var Book = require('../src/book.js');
var basket = new Basket();
describe('Basket',function(){

  describe('test Basket the function addBasketItem',function(){
    it('should add the newBookItem in basketItem',function(){
      var book = new Book(1001);
      var book1 = new Book(1001);
      basket.addBasketItem(book);
      expect(basket.basketItem[0]).toEqual({no:1001,count:1});
      basket.addBasketItem(book1);
      expect(basket.basketItem[0]).toEqual({no:1001,count:2});
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
