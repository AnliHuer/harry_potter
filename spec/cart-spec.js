var Cart = require('../src/cart.js');

describe('Cart',function(){
  var cart = new Cart();
  describe('test Cart calculateBuyNum',function(){
    it('should finish sort for cartItem',function(){
      cart.cartItem = [1001,1003,1004,1002,1001,1004,1001];
      var obj = cart.calculateBuyNum();
      var expect_obj = [{no:1001,count:3},{no:1003,count:1},{no:1004,count:2},{no:1002,count:1}];
      expect(obj[0].count).toEqual(expect_obj[0].count);
    });
  });
});
