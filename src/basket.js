function Basket() {
  this.basketItem = [];
}


Basket.prototype.getBookNum = function() {
  var bookNum = 0;
  this.basketItem.forEach(function(val) {
    bookNum += val.count;
  });
  return bookNum;
};


Basket.prototype.addBasketItem = function(newItem) {
  var item = this.basketItem.filter(function(val) {
    return val.no === newItem.no;
  });
  if (item.length) {
    item[0].count += newItem.count;
  } else {
    this.basketItem.push(newItem);
  }
};


module.exports = Basket;
