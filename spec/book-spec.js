var Book = require('../src/book.js');

describe('Book', function() {
  describe('test Book constructor', function() {
    it('should have attribute no and price', function() {
      var expect_no = 1001;
      var expect_price = 8;
      var book = new Book(1001);
      expect(book.no).toEqual(expect_no);
      expect(book.price).toEqual(expect_price);
    });
  });
});
