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


Basket.prototype.addBasketItem = function(book) {
  var item = this.basketItem.filter(function(val) {
    return val.number === book.number;
  });
  if (item.length) {
    item[0].count += 1;
  } else {
    this.basketItem.push({
      number: book.number,
      count: 1
    });
  }
};


module.exports = Basket;
