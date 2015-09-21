var Strategy = require('../src/strategy.js');
var strategy = new Strategy();
describe('Strategy', function() {

  describe('test Strategy constructor', function() {
    it('should have attribute strategyItem', function() {
      var expect_strategItem = [{
        differentCount: 1,
        discount: 0
      }, {
        differentCount: 2,
        discount: 0.05
      }, {
        differentCount: 3,
        discount: 0.1
      }, {
        differentCount: 4,
        discount: 0.2
      }, {
        differentCount: 5,
        discount: 0.25
      }];
      expect(expect_strategItem.length).toEqual(strategy.strategyItem.length);
    });
  });

  describe('test Strategy the function getStrategy', function() {
    it('should return the discount of strategyItem', function() {
      var discount = strategy.getStrategy(4);
      var expect_discount = 0.2;
      expect(expect_discount).toEqual(discount);

      discount = strategy.getStrategy(10);
      expect_discount = 0;
      expect(expect_discount).toEqual(discount);
    });
  });
});
