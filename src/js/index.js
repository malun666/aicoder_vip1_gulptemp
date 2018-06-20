var a,
  b,
  c;
[a, b, c] = [1, 2, 3];
var d = 'ss';

c += d;
console.log(a);
console.log(b);
console.log(c);

window.onload = function() {
  document
    .getElementById('tt')
    .innerHTML = Date.now();
};
