# A tiny page to say Hi Mum!

Not really sure why, but I have found it fun to try make this page use
as few bytes as possible over the wire and also get 100% in all the tests
in chrome lighthouse

I have achieved this by:

- minimizing the html, css, and js
- encoding the font as a data url
- rendering the favicon using a canvas
- editing font file to only include "HMimu!" characters
- strip font metadata
