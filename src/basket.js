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
    return val.no === book.no;
  });
  if (item.length) {
    item[0].count += 1;
  } else {
    this.basketItem.push({no:book.no,count:1});
  }
};


module.exports = Basket;
