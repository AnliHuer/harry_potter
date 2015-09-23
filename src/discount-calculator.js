var Strategy = require('./strategy.js');
var TYPE_FIVE = 5,TYPE_THREE = 3,TYPE_FOUR = 4,  BOOK_PRICE =8 , TRANFER_TIMES = 2;
function DiscountCalculator(basket) {
  this.basket = basket;
}

DiscountCalculator.prototype.getDiscountType = function(discountItem) {
  var discountType = this.basket.getBasketItem().filter(function(val) {
    return val.count > 0;
  }).length;
  return discountType;
};

DiscountCalculator.prototype.getDiscountArray = function() {
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

DiscountCalculator.prototype.getDiscountObjItem = function(discountObjItem, val) {
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

DiscountCalculator.prototype.transferDiscountItem = function() {
  var discountObjItem = [];
  var that = this;
  var discountItem = this.getDiscountArray();
  discountItem.forEach(function(val) {
    discountObjItem = that.getDiscountObjItem(discountObjItem, val);
  });
  return discountObjItem;
};

DiscountCalculator.prototype.modifyDiscountItem = function(discountObjItem, decreaseNum) {
  discountObjItem.forEach(function(val) {
    val.count -= (val.discountType === TYPE_FIVE || val.discountType === TYPE_THREE) ? decreaseNum : 0;
  });
  for (var obj in discountObjItem) {
    if (discountObjItem[obj].discountType === TYPE_FOUR) {
      discountObjItem[obj].count += decreaseNum * TRANFER_TIMES;
      return discountObjItem;
    }
  }
  discountObjItem.push({
    discountType: TYPE_FOUR,
    count: decreaseNum * TRANFER_TIMES
  });
  return discountObjItem;
};

DiscountCalculator.prototype.findDiscountType = function(discountObjItem, discountType) {
  var obj = discountObjItem.filter(function(val) {
    return val.discountType === discountType;
  });
  return obj[0] ? obj[0].count : 0;
};

DiscountCalculator.prototype.getDiscountPrice = function(discountObjItem) {
  var discountPrice = 0;
  var strategy = new Strategy();
  discountObjItem.forEach(function(val) {
    strategy.strategyItem.forEach(function(item) {
      if (val.discountType === item.differentCount) {
        discountPrice += (val.discountType * val.count * item.discount * BOOK_PRICE);
      }
    });
  });
  return parseFloat(discountPrice.toFixed(1));
};

DiscountCalculator.prototype.calculateDiscountPrice = function() {
  var discountObjItem = this.transferDiscountItem();
  var typeFiveCount = this.findDiscountType(discountObjItem, TYPE_FIVE);
  var typeThreeCount = this.findDiscountType(discountObjItem, TYPE_THREE);
  discountObjItem = ((typeFiveCount > typeThreeCount) ? (this.modifyDiscountItem(discountObjItem, typeThreeCount)) : (this.modifyDiscountItem(discountObjItem, typeFiveCount)));
  return this.getDiscountPrice(discountObjItem);
};

DiscountCalculator.prototype.getFinalPrice = function() {
  var originalPrice = this.basket.getBookNum() * BOOK_PRICE;
  var discountPrice = this.calculateDiscountPrice();
  return originalPrice - discountPrice;
};

module.exports = DiscountCalculator;
