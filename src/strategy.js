function Strategy() {
  this.strategyItem = [{
    differentNum: 2,
    discount: 0.05
  }, {
    differentNum: 3,
    discount: 0.1
  }, {
    differentNum: 4,
    discount: 0.2
  }, {
    differentNum: 5,
    discount: 0.25
  }];
}

Strategy.prototype.getStrategy = function(differentNum) {
  return this.strategyItem.filter(function(val){
      return val.differentNum === differentNum ;
  })[0].discount;
};

module.exports = Strategy;
