var Basket = require('../src/basket.js');
var Book = require('../src/book.js');
describe('Basket', function() {

  describe('test Basket the function getBasketItem', function() {
    var basket = new Basket();
    it('should return the attribute of basketItem', function() {
      var basketItem = basket.getBasketItem();
      expect(basketItem).toEqual([]);
      basket.addBasketItem(new Book(1001));
      basketItem = basket.getBasketItem();
      expect(basketItem).toEqual([{number: 1001, count: 1}]);
    });
  });

  describe('test Basket the function addBasketItem', function() {
    var basket = new Basket();
    it('should add the newBookItem in basketItem', function() {
      var book = new Book(1001);
      var book1 = new Book(1001);
      basket.addBasketItem(book);
      expect(basket.basketItem[0]).toEqual({
        number: 1001,
        count: 1
      });
      basket.addBasketItem(book1);
      expect(basket.basketItem[0]).toEqual({
        number: 1001,
        count: 2
      });
    });
  });

  describe('test Basket the function getBookNum', function() {
    var basket = new Basket();
    it('should return the num of all buyBook', function() {
      basket.basketItem = [{
        number: 1001,
        count: 3
      }, {
        number: 1003,
        count: 1
      }];
      var buyBookNum = basket.getBookNum();
      expect(buyBookNum).toEqual(4);
    });
  });
});
