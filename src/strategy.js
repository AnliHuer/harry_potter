function Strategy() {
  this.strategyItem = [{
    differentNum: 1,
    discount: 0
  }, {
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
  var item = this.strategyItem.filter(function(val) {
    return val.differentNum === differentNum;
  });
  if(item.length){
    return item[0].discount;
  }
  return 0;
};

module.exports = Strategy;
