var Book = require('../src/book.js');

describe('Book', function() {

  describe('test the function of getNumber', function() {

    it('should have attribute number and price', function() {
      var book = new Book(1001);
      var expect_number = 1001;
      expect(book.getNumber()).toEqual(expect_number);
    });
  });

  describe('test the function of getPrice', function() {

    it('should have attribute number and price', function() {
      var book = new Book(1001);
      var expect_price = 8;
      expect(book.getPrice()).toEqual(expect_price);
    });
  });

});
