var Book = require('../src/book.js');

describe('Book', function() {
  describe('test Book constructor', function() {
    it('should have attribute number and price', function() {
      var expect_number = 1001;
      var expect_price = 8;
      var book = new Book(1001);
      expect(book.number).toEqual(expect_number);
      expect(book.price).toEqual(expect_price);
    });
  });
});
