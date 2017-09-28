# Guess MIME from Binary String.


A Library to determine mime type from binary string.

```js
import guessMIME from 'guess-mime';

const base64 = '...'; // just base64 code of image, without mime segment
const binaryString = window.atob(base64);
const mime = guessMIME(binaryString);
```
