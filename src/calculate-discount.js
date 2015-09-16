var Strategy = require('./strategy.js');

function DiscountCalculate(basket) {
  this.basket = basket;
}

DiscountCalculate.prototype.getFlagCount = function(basketItem) {
  var flagCount = 0;
  var max = 0;
  basketItem.forEach(function(val) {
    if (val.count > 0) {
      flagCount++;
    }
    max = val.count > max ? val.count : max;
  });
  return {
    flagCount: flagCount,
    max: max
  };
};

DiscountCalculate.prototype.modefyBasketItem = function(basketItem) {
  var flagCount = 0;
  basketItem.forEach(function(val) {
    val.count--;
  });
  return basketItem;
};

DiscountCalculate.prototype.setDiscountItem = function(discountItem, flagCount) {
  for (var item in discountItem) {
    if (discountItem[item].discountType === flagCount) {
      discountItem[item].count++;
      return discountItem;
    }
  }
  discountItem.push({
    discountType: flagCount,
    count: 1
  });
  return discountItem;
};

DiscountCalculate.prototype.everyDiscountNum = function(basketItem) {
  var discountItem = [];
  var flagObj = this.getFlagCount(basketItem);
  var max = flagObj.max;
  for (var i = 0; i < max; i++) {
    if (flagObj.flagCount) {
      basketItem = this.modefyBasketItem(basketItem);
      discountItem = this.setDiscountItem(discountItem, flagObj.flagCount);
      flagObj = this.getFlagCount(basketItem);
    }
  }
  return discountItem;
};

DiscountCalculate.prototype.findDiscountType = function(discountItem, discountType) {
  var item = discountItem.filter(function(val) {
    return val.discountType === discountType;
  });
  if (item.length) {
    return item[0].count;
  } else {
    return 0;
  }
};

DiscountCalculate.prototype.modefiedDiscountItem = function(discountItem, decreaseNum) {
  discountItem.forEach(function(val) {
    if (val.discountType === 5 || val.discountType === 3) {
      val.count -= decreaseNum;
    }
    if (val.discountType === 4) {
      val.count += decreaseNum * 2;
    }
  });
  return discountItem;
};

DiscountCalculate.prototype.getDiscountPrice = function(discountItem) {
  var discountPrice = 0;
  var r1, r2, m;
  var strategy = new Strategy();
  discountItem.forEach(function(val) {
    strategy.strategyItem.forEach(function(item) {
      if (val.discountType === item.differentNum) {
        discountPrice +=(val.discountType * val.count * item.discount * 8);
      }
    });
  });
  return parseFloat(discountPrice.toFixed(1));
};

DiscountCalculate.prototype.calculateDiscountPrice = function(basketItem) {
  var discountItem = this.everyDiscountNum(basketItem);
  var typeFiveCount = this.findDiscountType(discountItem, 5);
  var typeThreeCount = this.findDiscountType(discountItem, 1);
  if (typeFiveCount && typeThreeCount) {
    if (typeFiveCount > typeThreeCount) {
      discountItem = this.modefiedDiscountItem(discountItem, typeThreeCount);
    } else {
      discountItem = this.modefiedDiscountItem(discountItem, typeFiveCount);
    }
  }
  return this.getDiscountPrice(discountItem);
};

DiscountCalculate.prototype.getFinalPrice = function() {
  var oldPrice = this.basket.getBookNum() * 8;
  var discountPrice = this.calculateDiscountPrice(this.basket.basketItem);
  return oldPrice - discountPrice;
};

module.exports = DiscountCalculate;
