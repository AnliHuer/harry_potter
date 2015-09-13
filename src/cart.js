function Cart() {
  this.cartItem = [];
}


var obj = [];
Cart.prototype.calculateBuyNum = function() {
  this.cartItem.forEach(function(val) {
    compareToTransfer(val);
  });
  return obj;
};


function compareToTransfer(val){
  for (var i = 0; i < obj.length;i++) {
    if (obj[i].no === val) {
      obj[i].count++;
      return;
    }
  }
  obj.push({
    no: val,
    count: 1
  });
}

module.exports = Cart;
