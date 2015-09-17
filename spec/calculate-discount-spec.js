var DiscountCalculate = require('../src/calculate-discount.js');
var Basket = require('../src/basket.js');
var discountCalculate = new DiscountCalculate(new Basket());

describe('DiscountCalculate',function(){

  describe('test the function getDiscountType',function(){
    it('should return discountItem having all discountType',function(){
      var basketItem = [{no:1001,count:1},{no:1002,count:3},{no:1004,count:3},{no:1003,count:3},{no:1005,count:2}];
      var discountItem = discountCalculate.getDiscountType(basketItem,[]);
      expect(discountItem[0]).toEqual(5);
    });
  });

  describe('test the function getDiscountArray',function(){
    it('should return array having every discount`s num',function(){
      var basketItem =[{no:1001,count:1},{no:1002,count:3},{no:1004,count:3},{no:1003,count:3},{no:1005,count:2}];
      var discountItem = discountCalculate.getDiscountArray(basketItem);
      expect(discountItem).toEqual([5,4,3]);
    });
  });

  describe('test the function transferDiscountItem',function(){
    it('should return discountObjItem having every discountType and count',function(){
      var basketItem =[{no:1001,count:1},{no:1002,count:3},{no:1004,count:3},{no:1003,count:3},{no:1005,count:2}];
      var discountObjItem = discountCalculate.transferDiscountItem(basketItem);
      expect(discountObjItem[0]).toEqual({discountType:5,count:1});
    });
  });

  describe('test the function modefiedDiscountItem',function(){
    it('should return new discountItem when having discountType 5 and 3 in discountItem',function(){
      var discountObjItem = [{discountType:5,count:1},{discountType:4,count:1},{discountType:3,count:1}];
      expect(discountCalculate.modefiedDiscountItem(discountObjItem,1)[0]).toEqual({ discountType: 5, count: 0 });
    });
  });

  describe('test the function findDiscountType',function(){
    it('should return this discountType\'s count',function(){
      var discountItem = [{discountType:4,count:1},{discountType:3,count:1}];
      var discountTypeCount = discountCalculate.findDiscountType(discountItem,3);
      expect(discountTypeCount).toEqual(1);
    });
  });

  describe('test the function getDiscountPrice',function(){
    it('should return discountPrice',function(){
      var discountItem = [{discountType:4,count:1},{discountType:3,count:1}];
      var discountPrice = discountCalculate.getDiscountPrice(discountItem);
      expect(discountPrice).toEqual(8.8);
    });
  });

  describe('test the function calculateDiscountPrice',function(){
    it('should return get discount price',function(){
        var basketItem = [{no:1001,count:1},{no:1002,count:3},{no:1004,count:3},{no:1003,count:3},{no:1005,count:2}];
        var discountPrice = discountCalculate.calculateDiscountPrice(basketItem);
        expect(discountPrice).toEqual(19.2);
    });
  });

  describe('test the function getFinalPrice',function(){
    it('should return get final price',function(){
      discountCalculate.basket.basketItem = [{no:1001,count:1},{no:1002,count:3},{no:1004,count:3},{no:1003,count:3},{no:1005,count:2}];
      expect(discountCalculate. getFinalPrice()).toEqual(76.8);
    });
  });
});
