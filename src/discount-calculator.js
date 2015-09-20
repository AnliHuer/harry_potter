var Strategy = require('./strategy.js');

function DiscountCalculate(basket) {
  this.basket = basket;
}

DiscountCalculate.prototype.getDiscountType = function(discountItem) {
  var discountType = this.basket.getBasketItem().filter(function(val) {
    return val.count > 0;
  }).length;
  discountItem.push(discountType);
  return discountItem;
};

DiscountCalculate.prototype.getDiscountArray = function() {
  var discountItem = [];
  while (this.basket.getBasketItem().filter(function(item) {
      return item.count > 0;
    }).length) {
    discountItem = this.getDiscountType(discountItem);
    this.basket.getBasketItem().forEach(function(val) {
      val.count--;
    });
  }
  return discountItem;
};

DiscountCalculate.prototype.transferDiscountItem = function() {
  var discountObjItem = [];
  var discountItem = this.getDiscountArray();
  discountItem.forEach(function(val) {
    for (var obj in discountObjItem) {
      if (discountObjItem[obj].discountType === val) {
        discountObjItem[obj].count++;
        break;
      }
    }
    discountObjItem.push({
      discountType: val,
      count: 1
    });
  });
  return discountObjItem;
};

DiscountCalculate.prototype.modefiedDiscountItem = function(discountObjItem, decreaseNum) {
  discountObjItem.forEach(function(val) {
    val.count -= (val.discountType === 5 || val.discountType === 3) ? decreaseNum : 0;
  });
  for (var obj in discountObjItem) {
    if (discountObjItem[obj].discountType === 4) {
      discountObjItem[obj].count += decreaseNum * 2;
      return discountObjItem;
    }
  }
  discountObjItem.push({
    discountType: 4,
    count: decreaseNum * 2
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
        discountPrice += (val.discountType * val.count * item.discount * 8);
      }
    });
  });
  return parseFloat(discountPrice.toFixed(1));
};

DiscountCalculate.prototype.calculateDiscountPrice = function() {
  var discountObjItem = this.transferDiscountItem();
  var typeFiveCount = this.findDiscountType(discountObjItem, 5);
  var typeThreeCount = this.findDiscountType(discountObjItem, 3);
  discountObjItem = ((typeFiveCount > typeThreeCount) ? (this.modefiedDiscountItem(discountObjItem, typeThreeCount)) : (this.modefiedDiscountItem(discountObjItem, typeFiveCount)));
  return this.getDiscountPrice(discountObjItem);
};

DiscountCalculate.prototype.getFinalPrice = function() {
  var originalPrice = this.basket.getBookNum() * 8;
  var discountPrice = this.calculateDiscountPrice(this.basket.getBasketItem());
  return originalPrice - discountPrice;
};

module.exports = DiscountCalculate;
