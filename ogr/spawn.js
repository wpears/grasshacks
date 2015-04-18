var spawn = require('child_process').spawn;
var fs = require('fs');

console.time('parse');
console.time('good');
console.time('firstByte');
console.time('gdb');
console.time('shp');

var child = spawn('ogr2ogr', ['-f', 'GeoJson', 'badout.txt', '/vsistdin/']);
var goodChild = spawn('ogr2ogr', ['-f', 'GeoJson', '/vsistdout/', '/vsistdin/']);
var gdbChild = spawn('ogr2ogr', ['-f', 'GeoJson', '/vsistdout/', 'utah.gdb']);
var shpChild = spawn('ogr2ogr', ['-f', 'GeoJson', '/vsistdout/', 'arkansas/STRUC_SITUS_ADDRESS_PT.shp']);

var stream = fs.createReadStream('arkansas.json')
var badStream = fs.createReadStream('badArkansas.json')

child.stderr.on('end', function(){
 console.timeEnd('parse'); 
})

goodChild.on('exit', function(){
  console.timeEnd('good');
})

goodChild.stdout.once('data', function(d){
  console.timeEnd('firstByte');
})

shpChild.stdout.once('data', function(d){
  console.timeEnd('shp');
  shpChild.kill();
})

gdbChild.stdout.once('data', function(d){
  console.timeEnd('gdb');
  gdbChild.kill();
})

stream.pipe(goodChild.stdin);
badStream.pipe(child.stdin);


