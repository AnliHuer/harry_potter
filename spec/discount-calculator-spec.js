var DiscountCalculator = require('../src/discount-calculator.js');
var Basket = require('../src/basket.js');
var Book = require('../src/book.js');

describe('DiscountCalculator', function() {

  describe('test the function getDiscountType', function() {

    it('should return discountItem having all discountType', function() {
      var discountCalculator = new DiscountCalculator(new Basket());
      var discountType = discountCalculator.getDiscountType([]);
      expect(discountType).toEqual(0);

      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 1
      }, {
        number: 1002,
        count: 3
      }, {
        number: 1004,
        count: 3
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      discountType = discountCalculator.getDiscountType([]);
      expect(discountType).toEqual(5);

      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 0
      }, {
        number: 1002,
        count: 3
      }, {
        number: 1004,
        count: 0
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      discountType = discountCalculator.getDiscountType([]);
      expect(discountType).toEqual(3);
    });
  });

  describe('test the function getDiscountArray', function() {

    it('should return array having every discount`s num', function() {
      var discountCalculator = new DiscountCalculator(new Basket());
      var discountItem = discountCalculator.getDiscountArray();
      expect(discountItem).toEqual([]);

      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 1
      }, {
        number: 1002,
        count: 3
      }, {
        number: 1004,
        count: 3
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      discountItem = discountCalculator.getDiscountArray();
      expect(discountItem).toEqual([5, 4, 3]);

      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 1
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      discountItem = discountCalculator.getDiscountArray();
      expect(discountItem).toEqual([3, 2, 1]);
    });
  });

  describe('test the function getDiscountObjItem', function() {

    it('should return discountObjItem having every discountType and count', function() {
      var discountCalculator = new DiscountCalculator(new Basket());
      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 1
      }, {
        number: 1002,
        count: 3
      }, {
        number: 1004,
        count: 3
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      var discountObjItem = [];
      discountCalculator.getDiscountObjItem(discountObjItem, 5);
      expect(discountObjItem).toEqual([{
        discountType: 5,
        count: 1
      }]);

      discountCalculator.getDiscountObjItem(discountObjItem, 5);
      expect(discountObjItem).toEqual([{
        discountType: 5,
        count: 2
      }]);

      discountCalculator.getDiscountObjItem(discountObjItem, 4);
      expect(discountObjItem).toEqual([{
        discountType: 5,
        count: 2
      }, {
        discountType: 4,
        count: 1
      }]);
    });
  });


  describe('test the function transferDiscountItem', function() {

    it('should return discountObjItem having every discountType and count', function() {
      var discountCalculator = new DiscountCalculator(new Basket());
      var discountObjItem = discountCalculator.transferDiscountItem();
      expect(discountObjItem).toEqual([]);

      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 1
      }, {
        number: 1002,
        count: 3
      }, {
        number: 1004,
        count: 3
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      discountObjItem = discountCalculator.transferDiscountItem();
      expect(discountObjItem).toEqual([{
        discountType: 5,
        count: 1
      }, {
        discountType: 4,
        count: 1
      }, {
        discountType: 3,
        count: 1
      }]);
    });
  });

  describe('test the function modifyDiscountItem', function() {

    it('should return new discountItem when having discountType 5 and 3 in discountItem', function() {
      var discountCalculator = new DiscountCalculator(new Basket());
      var discountObjItem = discountCalculator.transferDiscountItem();
      expect(discountCalculator.modifyDiscountItem(discountObjItem, 1)).toEqual([{
        discountType: 4,
        count: 2
      }]);

      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 1
      }, {
        number: 1002,
        count: 3
      }, {
        number: 1004,
        count: 3
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      discountObjItem = discountCalculator.transferDiscountItem();
      expect(discountCalculator.modifyDiscountItem(discountObjItem, 1)).toEqual([{
        discountType: 5,
        count: 0
      }, {
        discountType: 4,
        count: 3
      }, {
        discountType: 3,
        count: 0
      }]);
    });
  });

  describe('test the function findDiscountType', function() {

    it('should return this discountType\'s count', function() {
      var discountCalculator = new DiscountCalculator(new Basket());
      var discountObjItem = discountCalculator.transferDiscountItem();
      var discountTypeCount = discountCalculator.findDiscountType(discountObjItem, 3);
      expect(discountTypeCount).toEqual(0);

      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 1
      }, {
        number: 1002,
        count: 3
      }, {
        number: 1004,
        count: 3
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      discountObjItem = discountCalculator.transferDiscountItem();
      discountTypeCount = discountCalculator.findDiscountType(discountObjItem, 3);
      expect(discountTypeCount).toEqual(1);
    });
  });

  describe('test the function getDiscountPrice', function() {

    it('should return discountPrice', function() {
      var discountCalculator = new DiscountCalculator(new Basket());
      var discountObjItem = discountCalculator.transferDiscountItem();
      var discountPrice = discountCalculator.getDiscountPrice(discountObjItem);
      expect(discountPrice).toEqual(0);

      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 1
      }, {
        number: 1002,
        count: 3
      }, {
        number: 1004,
        count: 3
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      discountObjItem = discountCalculator.transferDiscountItem();
      discountPrice = discountCalculator.getDiscountPrice(discountObjItem);
      expect(discountPrice).toEqual(18.8);
    });
  });

  describe('test the function calculateDiscountPrice', function() {

    it('should return get discount price', function() {
      var discountCalculator = new DiscountCalculator(new Basket());
      var discountPrice = discountCalculator.calculateDiscountPrice();
      expect(discountPrice).toEqual(0);

      discountCalculator.basket.basketItem = [{
        number: 1001,
        count: 1
      }, {
        number: 1002,
        count: 3
      }, {
        number: 1004,
        count: 3
      }, {
        number: 1003,
        count: 3
      }, {
        number: 1005,
        count: 2
      }];
      discountPrice = discountCalculator.calculateDiscountPrice();
      expect(discountPrice).toEqual(19.2);
    });
  });

  describe('test the function getFinalPrice', function() {

    it('should return get final price', function() {
      var basket = new Basket();
      var discountCalculator = new DiscountCalculator(basket);
      expect(discountCalculator.getFinalPrice()).toEqual(0);
      basket.addBasketItem(new Book(1001));
      basket.addBasketItem(new Book(1002));
      basket.addBasketItem(new Book(1002));
      basket.addBasketItem(new Book(1004));
      basket.addBasketItem(new Book(1003));
      basket.addBasketItem(new Book(1003));
      basket.addBasketItem(new Book(1005));
      basket.addBasketItem(new Book(1005));
      expect(discountCalculator.getFinalPrice()).toEqual(51.2);
    });
  });
});
