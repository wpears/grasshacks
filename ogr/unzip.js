var zlib = require('zlib');
var fs = require('fs');
fs.createReadStream('ark.json').pipe(zlib.createDeflate()).pipe(fs.createWriteStream('ark.zip'));


