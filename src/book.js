function Book(number) {
  this.number = number;
  this.price = 8;
}

Book.prototype.getNumber = function(){
  return this.number;
};

Book.prototype.getPrice = function(){
  return this.price;
};

module.exports = Book;
