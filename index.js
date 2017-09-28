function isPNG(binStr) {
  var PNG_MARKER = [137, 80, 78, 71, 13, 10, 26, 10]
    .map(function(code){
      return String.fromCharCode(code);
    }).join('');
  return binStr.indexOf(PNG_MARKER) === 0;
}

function isJPEG(binStr) {
  var length = binStr.length;
  var SOI = String.fromCharCode(0xff) + String.fromCharCode(0xd8);
  var DQT = String.fromCharCode(0xff) + String.fromCharCode(0xdb);
  var DHT = String.fromCharCode(0xff) + String.fromCharCode(0xc4);
  var EOI = String.fromCharCode(0xff) + String.fromCharCode(0xd9);
  var EOIIndex = binStr.indexOf(EOI);
  return ((binStr.indexOf(SOI) !== -1) 
    && (binStr.indexOf(DQT) !== -1) 
    && (binStr.indexOf(DHT) !== -1) 
    && (EOIIndex!== -1)
    && (EOIIndex + 2 === length)
  );
}

function isGIF(binStr) {
  var GIF87 = 'GIF87a';
  var GIF89 = 'GIF89a';
  return (binStr.indexOf(GIF87) === 0) || (binStr.indexOf(GIF89) === 0);
}

function isBMP(binStr) {
  var length = binStr.length;
  if (length < 14) {
    return false;
  }
  var ID = ['BM', 'BA', 'CI', 'CP', 'IC', 'PT'];
  if(ID.indexOf(binStr.slice(0,2 )) === -1) {
    return false;
  }
  var a = binStr.charCodeAt(5);
  var b = binStr.charCodeAt(4);
  var c = binStr.charCodeAt(3);
  var d = binStr.charCodeAt(2);
  var value = (a<<24) + (b<<16) + (c<<8) + d;
  return value === length;
}

function isWEBP(binStr) {
  var length = binStr.length;
  if (binStr.slice(0, 4) !== 'RIFF') {
    return false;
  }
  if (binStr.slice(8, 12) !== 'WEBP') {
    return false;
  }
  var d = binStr.charCodeAt(4);
  var c = binStr.charCodeAt(5);
  var b = binStr.charCodeAt(6);
  var a = binStr.charCodeAt(7);
  var value = (a<<24) + (b<<16) + (c<<8) + d;
  return value + 8 === length;
}

module.exports = function(binStr) {
  if (isPNG(binStr)) {
    return 'image/png';
  }
  if (isJPEG(binStr)) {
    return 'image/jpeg';
  }
  if (isGIF(binStr)) {
    return 'image/gif';
  }
  if (isBMP(binStr)) {
    return 'image/bmp';
  }
  if (isWEBP(binStr)) {
    return 'image/webp';
  }
  return null;
};
