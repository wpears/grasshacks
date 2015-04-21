var spawn = require('child_process').spawn;
var fs = require('fs');

console.time('parse fails');
console.time('streamed json finished');
console.time('firstByte from json');
console.time('utah.gdb');
console.time('arkansas/STRUC_SITUS_ADDRESS_PT.shp');
console.time('/vsizip/arkansas.zip')
var child = spawn('ogr2ogr', ['-f', 'GeoJson', 'badout.txt', '/vsistdin/']);
var goodChild = spawn('ogr2ogr', ['-f', 'GeoJson', '/vsistdout/', '/vsistdin/']);

var stream = fs.createReadStream('arkansas.json')
var badStream = fs.createReadStream('badArkansas.json')

child.stderr.on('end', function(){
 console.timeEnd('parse fails'); 
})

goodChild.on('exit', function(){
  console.timeEnd('streamed json finished');
})

goodChild.stdout.once('data', function(d){
  console.timeEnd('firstByte from json');
})

var files = ['utah.gdb','arkansas/STRUC_SITUS_ADDRESS_PT.shp','/vsizip/arkansas.zip']

files.forEach(function(v){
  var currChild = spawn('ogr2ogr', ['-f', 'GeoJson', '/vsistdout/', v]);

  currChild.stdout.once('data', function(d){
    console.log(d.slice(0,250).toString());
    console.timeEnd(v);
    currChild.kill();
  });

  currChild.stderr.pipe(process.stdout);
});


stream.pipe(goodChild.stdin);
badStream.pipe(child.stdin);


