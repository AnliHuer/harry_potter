function Strategy() {
  this.strategyItem = [{
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
}

Strategy.prototype.getStrategy = function(differentCount) {
  var item = this.strategyItem.filter(function(val) {
    return val.differentCount === differentCount;
  });
  if(item.length){
    return item[0].discount;
  }
  return 0;
};

module.exports = Strategy;
