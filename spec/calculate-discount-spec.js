var DiscountCalculate = require('../src/calculate-discount.js');
var Basket = require('../src/basket.js');


describe('DiscountCalculate',function(){

  describe('test the function getDiscountType',function(){
    var discountCalculate = new DiscountCalculate(new Basket());
    discountCalculate.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return discountItem having all discountType',function(){
      var discountItem = discountCalculate.getDiscountType([]);
      expect(discountItem[0]).toEqual(5);
    });
  });

  describe('test the function getDiscountArray',function(){
    var discountCalculate = new DiscountCalculate(new Basket());
    discountCalculate.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return array having every discount`s num',function(){
      var discountItem = discountCalculate.getDiscountArray();
      expect(discountItem).toEqual([5,4,3]);
    });
  });

   describe('test the function transferDiscountItem',function(){
     var discountCalculate = new DiscountCalculate(new Basket());
     discountCalculate.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
     it('should return discountObjItem having every discountType and count',function(){
      var discountObjItem = discountCalculate.transferDiscountItem();
      expect(discountObjItem[0]).toEqual({discountType:5,count:1});
    });
  });

  describe('test the function modefiedDiscountItem',function(){
    var discountCalculate = new DiscountCalculate(new Basket());
    discountCalculate.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return new discountItem when having discountType 5 and 3 in discountItem',function(){
      var discountObjItem = discountCalculate.transferDiscountItem();
      expect(discountCalculate.modefiedDiscountItem(discountObjItem,1)[0]).toEqual({discountType: 5, count: 0 });
    });
  });

  describe('test the function findDiscountType',function(){
    var discountCalculate = new DiscountCalculate(new Basket());
    discountCalculate.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return this discountType\'s count',function(){
      var discountObjItem = discountCalculate.transferDiscountItem();
      var discountTypeCount = discountCalculate.findDiscountType(discountObjItem,3);
      expect(discountTypeCount).toEqual(1);
    });
  });

  describe('test the function getDiscountPrice',function(){
    var discountCalculate = new DiscountCalculate(new Basket());
    discountCalculate.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return discountPrice',function(){
      var discountObjItem = discountCalculate.transferDiscountItem();
      var discountPrice = discountCalculate.getDiscountPrice(discountObjItem);
      expect(discountPrice).toEqual(18.8);
    });
  });

describe('test the function calculateDiscountPrice',function(){
    var discountCalculate = new DiscountCalculate(new Basket());
    discountCalculate.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return get discount price',function(){
        var discountPrice = discountCalculate.calculateDiscountPrice();
        expect(discountPrice).toEqual(19.2);
    });
  });

  describe('test the function getFinalPrice',function(){
    var discountCalculate = new DiscountCalculate(new Basket());
    discountCalculate.basket.basketItem = [{number:1001,count:1},{number:1002,count:3},{number:1004,count:3},{number:1003,count:3},{number:1005,count:2}];
    it('should return get final price',function(){
      expect(discountCalculate. getFinalPrice()).toEqual(76.8);
    });
  });
});
