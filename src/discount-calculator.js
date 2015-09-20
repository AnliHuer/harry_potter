var Strategy = require('./strategy.js');
var TYPEFIVE = 5,TYPETHREE = 3,TYPEFOUR = 4,  BOOKPRICE =8 , TRANFERTIMES = 2;
function DiscountCalculate(basket) {
  this.basket = basket;
}

DiscountCalculate.prototype.getDiscountType = function(discountItem) {
  var discountType = this.basket.getBasketItem().filter(function(val) {
    return val.count > 0;
  }).length;
  return discountType;
};

DiscountCalculate.prototype.getDiscountArray = function() {
  var discountItem = [];
  while (this.basket.getBasketItem().filter(function(item) {
      return item.count > 0;
    }).length) {
    discountItem.push(this.getDiscountType(discountItem));
    this.basket.getBasketItem().forEach(function(val) {
      val.count--;
    });
  }
  return discountItem;
};

DiscountCalculate.prototype.getDiscountObjItem = function(discountObjItem, val) {
  for (var obj in discountObjItem) {
    if (discountObjItem[obj].discountType === val) {
      discountObjItem[obj].count++;
      return discountObjItem;
    }
  }
  discountObjItem.push({
    discountType: val,
    count: 1
  });
  return discountObjItem;
};

DiscountCalculate.prototype.transferDiscountItem = function() {
  var discountObjItem = [];
  var that = this;
  var discountItem = this.getDiscountArray();
  discountItem.forEach(function(val) {
    discountObjItem = that.getDiscountObjItem(discountObjItem, val);
  });
  return discountObjItem;
};

DiscountCalculate.prototype.modifyDiscountItem = function(discountObjItem, decreaseNum) {
  discountObjItem.forEach(function(val) {
    val.count -= (val.discountType === TYPEFIVE || val.discountType === TYPETHREE) ? decreaseNum : 0;
  });
  for (var obj in discountObjItem) {
    if (discountObjItem[obj].discountType === TYPEFOUR) {
      discountObjItem[obj].count += decreaseNum * TRANFERTIMES;
      return discountObjItem;
    }
  }
  discountObjItem.push({
    discountType: TYPEFOUR,
    count: decreaseNum * TRANFERTIMES
  });
  return discountObjItem;
};

DiscountCalculate.prototype.findDiscountType = function(discountObjItem, discountType) {
  var obj = discountObjItem.filter(function(val) {
    return val.discountType === discountType;
  });
  return obj[0] ? obj[0].count : 0;
};

DiscountCalculate.prototype.getDiscountPrice = function(discountObjItem) {
  var discountPrice = 0;
  var strategy = new Strategy();
  discountObjItem.forEach(function(val) {
    strategy.strategyItem.forEach(function(item) {
      if (val.discountType === item.differentNum) {
        discountPrice += (val.discountType * val.count * item.discount * BOOKPRICE);
      }
    });
  });
  return parseFloat(discountPrice.toFixed(1));
};

DiscountCalculate.prototype.calculateDiscountPrice = function() {
  var discountObjItem = this.transferDiscountItem();
  var typeFiveCount = this.findDiscountType(discountObjItem, TYPEFIVE);
  var typeThreeCount = this.findDiscountType(discountObjItem, TYPETHREE);
  discountObjItem = ((typeFiveCount > typeThreeCount) ? (this.modifyDiscountItem(discountObjItem, typeThreeCount)) : (this.modifyDiscountItem(discountObjItem, typeFiveCount)));
  return this.getDiscountPrice(discountObjItem);
};

DiscountCalculate.prototype.getFinalPrice = function() {
  var originalPrice = this.basket.getBookNum() * BOOKPRICE;
  var discountPrice = this.calculateDiscountPrice();
  return originalPrice - discountPrice;
};

module.exports = DiscountCalculate;
