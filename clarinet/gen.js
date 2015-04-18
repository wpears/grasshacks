var fs = require('fs');

var file = fs.createWriteStream('fi.txt');
file.write('[\n');
  var arr = [];
console.time('ttest')
for(var i=1; i<=1e7; i++){
  arr.push('{"' + i%10 + '": ' + i%5 + '},\n');
  if(i%10000 === 0){
    file.write(arr.join(''));
    arr.length = 0;
  }
}
console.timeEnd('ttest');
file.end('{"end":1}\n]')


