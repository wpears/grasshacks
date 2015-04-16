Drag and drag geocoding front-end
  - Also allow individual queries via a search bar
      - autocomplete

Design front-end wrapper for geocoding API

API gateway in node
  - Just proxying requests, passing data..
  - Orrrrrr nginx.. would there need to be validation/processing done in this layer?
  - Or is this in the realm of the clientside library?
    - would loose ability to transparently/immediately swap out microservices,
      unless providing a low-cache cdn option for the library
    - the clientside library could also work together with the gateway to maximum flexibility

Server-side checks in node.
  - Allows for code-sharing with the browser
    - updates are done in a single place
    - lower chance for subtle inconsistencies between browser/server
