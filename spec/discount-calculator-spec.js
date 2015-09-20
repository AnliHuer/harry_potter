var DiscountCalculator = require('../src/discount-calculator.js');
var Basket = require('../src/basket.js');


describe('DiscountCalculator',function(){

  describe('test the function getDiscountType',function(){
    var discountCalculator = new DiscountCalculator(new Basket());
    discountCalculator.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return discountItem having all discountType',function(){
      var discountItem = discountCalculator.getDiscountType([]);
      expect(discountItem[0]).toEqual(5);
    });
  });

  describe('test the function getDiscountArray',function(){
    var discountCalculator = new DiscountCalculator(new Basket());
    discountCalculator.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return array having every discount`s num',function(){
      var discountItem = discountCalculator.getDiscountArray();
      expect(discountItem).toEqual([5,4,3]);
    });
  });

   describe('test the function transferDiscountItem',function(){
     var discountCalculator = new DiscountCalculator(new Basket());
     discountCalculator.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
     it('should return discountObjItem having every discountType and count',function(){
      var discountObjItem = discountCalculator.transferDiscountItem();
      expect(discountObjItem[0]).toEqual({discountType:5,count:1});
    });
  });

  describe('test the function modefiedDiscountItem',function(){
    var discountCalculator = new DiscountCalculator(new Basket());
    discountCalculator.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return new discountItem when having discountType 5 and 3 in discountItem',function(){
      var discountObjItem = discountCalculator.transferDiscountItem();
      expect(discountCalculator.modefiedDiscountItem(discountObjItem,1)[0]).toEqual({discountType: 5, count: 0 });
    });
  });

  describe('test the function findDiscountType',function(){
    var discountCalculator = new DiscountCalculator(new Basket());
    discountCalculator.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return this discountType\'s count',function(){
      var discountObjItem = discountCalculator.transferDiscountItem();
      var discountTypeCount = discountCalculator.findDiscountType(discountObjItem,3);
      expect(discountTypeCount).toEqual(1);
    });
  });

  describe('test the function getDiscountPrice',function(){
    var discountCalculator = new DiscountCalculator(new Basket());
    discountCalculator.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return discountPrice',function(){
      var discountObjItem = discountCalculator.transferDiscountItem();
      var discountPrice = discountCalculator.getDiscountPrice(discountObjItem);
      expect(discountPrice).toEqual(18.8);
    });
  });

describe('test the function calculateDiscountPrice',function(){
    var discountCalculator = new DiscountCalculator(new Basket());
    discountCalculator.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return get discount price',function(){
        var discountPrice = discountCalculator.calculateDiscountPrice();
        expect(discountPrice).toEqual(19.2);
    });
  });

  describe('test the function getFinalPrice',function(){
    var discountCalculator = new DiscountCalculator(new Basket());
    discountCalculator.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return get final price',function(){
      expect(discountCalculator. getFinalPrice()).toEqual(76.8);
    });
  });
});
