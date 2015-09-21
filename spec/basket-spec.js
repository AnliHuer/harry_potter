var Basket = require('../src/basket.js');
var Book = require('../src/book.js');
describe('Basket', function() {

  describe('test Basket the function getBasketItem', function() {

    it('should return the attribute of basketItem', function() {
      var basket = new Basket();
      var basketItem = basket.getBasketItem();
      expect(basketItem).toEqual([]);

      basket.addBasketItem(new Book(1001));
      basketItem = basket.getBasketItem();
      expect(basketItem).toEqual([{
        number: 1001,
        count: 1
      }]);

      basket.addBasketItem(new Book(1001));
      basketItem = basket.getBasketItem();
      expect(basketItem).toEqual([{
        number: 1001,
        count: 2
      }]);
    });

  });

  describe('test Basket the function addBasketItem', function() {

    it('should add the newBookItem in basketItem', function() {
      var basket = new Basket();
      basket.addBasketItem(new Book(1001));
      expect(basket.basketItem[0]).toEqual({
        number: 1001,
        count: 1
      });

      basket.addBasketItem(new Book(1001));
      expect(basket.basketItem[0]).toEqual({
        number: 1001,
        count: 2
      });

      basket.addBasketItem(new Book(1002));
      basketItem = basket.getBasketItem();
      expect(basketItem).toEqual([{
        number: 1001,
        count: 2
      }, {
        number: 1002,
        count: 1
      }]);
    });

  });


  describe('test Basket the function getBookNum', function() {

    it('should return the num of all buyBook', function() {
      var basket = new Basket();
      var buyBookNum = basket.getBookNum();
      expect(buyBookNum).toEqual(0);

      basket.addBasketItem(new Book(1001));
      basket.addBasketItem(new Book(1001));
      buyBookNum = basket.getBookNum();
      expect(buyBookNum).toEqual(2);

      basket.addBasketItem(new Book(1002));
      buyBookNum = basket.getBookNum();
      expect(buyBookNum).toEqual(3);
    });

  });

});
