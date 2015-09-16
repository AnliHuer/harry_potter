var DiscountCalculate = require('../src/calculate-discount.js');
var Basket = require('../src/basket.js');
var discountCalculate = new DiscountCalculate(new Basket());

describe('DiscountCalculate',function(){

  describe('test the function modefyBasketItem',function(){
    it('should return new basketItem ,in basketItem',function(){
      var basketItem = [{no:1001,count:1},{no:1002,count:1},{no:1004,count:2}];
      basketItem = discountCalculate.modefyBasketItem(basketItem);
      expect(basketItem[0].count).toEqual(0);
    });
  });

  describe('test the function getFlagCount',function(){
    it('should return flagCount ,not equal 0 attribute in basketItem',function(){
      var basketItem = [{no:1001,count:0},{no:1002,count:1},{no:1004,count:2}];
      flagObj = discountCalculate.getFlagCount(basketItem);
      expect(flagObj.max).toEqual(2);
      expect(flagObj.flagCount).toEqual(2);
    });
  });

  describe('test the function setDiscountItem',function(){
    it('should return new discountItem',function(){
      var discountItem = [];
      var basketItem = [{no:1003,count:4},{no:1004,count:2},{no:1005,count:2}];
      var newDiscountItem = discountCalculate.setDiscountItem(discountItem,3);
      expect(newDiscountItem[0].discountType).toEqual(3);
    });
  });

  describe('test the function everyDiscountNum',function(){
    it('should return array having every discount`s num',function(){
      var basketItem = [{no:1003,count:3},{no:1005,count:2}];
      var discountItem = discountCalculate.everyDiscountNum(basketItem);
      expect(discountItem[0].discountType).toEqual(2);
    });
  });


  describe('test the function findDiscountType',function(){
    it('should return find discountType`s count',function(){
      var discountItem = [{discountType:5,count:2},{discountType:4,count:1}];
      var thisDiscounyCount = discountCalculate.findDiscountType(discountItem,5);
      var thatDiscounyCount = discountCalculate.findDiscountType(discountItem,3);
      expect(thisDiscounyCount).toEqual(2);
      expect(thatDiscounyCount).toEqual(0);
    });
  });

  describe('test the function modefiedDiscountItem',function(){
    it('should return new discountItem when having discountType 5 and 3 in discountItem',function(){
      var discountItem = [{discountType:5,count:2},{discountType:4,count:1},{discountType:3,count:1}];
      var newDiscountItem = discountCalculate.modefiedDiscountItem(discountItem,1,2);
      expect(newDiscountItem[0].count).toEqual(1);
      expect(newDiscountItem[1].count).toEqual(3);
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
        expect(discountPrice).toEqual(18.8);
    });
  });

  describe('test the function getFinalPrice',function(){
    it('should return get final price',function(){
      discountCalculate.basket.basketItem = [{no:1001,count:1},{no:1002,count:3},{no:1004,count:3},{no:1003,count:3},{no:1005,count:2}];
      expect(discountCalculate.getFinalPrice()).toEqual(77.2);
    });
  });
});
