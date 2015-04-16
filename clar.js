var blocked = require('blocked');
var clarinet = require('clarinet');
var jStream = require('JSONstream');
var fs = require('fs');

var stream = clarinet.createStream();
var js = jStream.parse("0")

console.time('read');
var read = fs.readFileSync('fi.txt').toString();
console.timeEnd('read');
var rs =fs.createReadStream('fi.txt');

  stream.on('end',function(){
    console.timeEnd('clar'); 
  });

  js.on('end', function(){
    console.timeEnd('js');
  })
blocked(function(ms){
  console.log('Blocked for %d ms', ms);
});
console.time('json');
console.time('clar');
console.time('js');


rs.pipe(stream);
rs.pipe(js);

JSON.stringify(JSON.parse(read));
console.timeEnd('json');
