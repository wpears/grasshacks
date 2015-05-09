ogr2ogr -f GeoJSON -t_srs WGS84 /vsistdout/ utah.gdb | \
ogr2ogr -f CSV utah.csv /vsistdin/ -lco GEOMETRY=AS_XY
zip utah.zip utah.csv

This will bring any spatially-aware format to our preferred storage format
Will need something special for csv starting format (pass in fields, srs)

this can then be streamed -> unzipped -> fed into ogrChild module
Leads to null geometry
Build into pointTransformer:

if (props.geometry === null){
  if(props.X){
   geometry = {"type": "Point",
     "coordinates" : [
      geometry.X
      geometry.Y
     ]
   }
  }else{
  throw new Error('No spatial information in <filename>');  
  }
}


!!
If passing json to the loader (and no srs is specified) SKIP ogrChild and pass JSON directly to splitOGRJSON
This MAY need a flag (--preformatted) to avoid weirdness (or a flag to force the opposite (--format))
