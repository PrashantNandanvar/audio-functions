window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function b64ToUint6 (nChr) {

  return nChr > 64 && nChr < 91 ?
      nChr - 65
    : nChr > 96 && nChr < 123 ?
      nChr - 71
    : nChr > 47 && nChr < 58 ?
      nChr + 4
    : nChr === 43 ?
      62
    : nChr === 47 ?
      63
    :
      0;

}

function base64DecToArr (sBase64, nBlocksSize) {

  var
    sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
    nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);

  for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
      }
      nUint24 = 0;

    }
  }

  return taBytes;
}

function loadFile(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'text';

    request.onload = function () {
        var decoded = CryptoJS.AES.decrypt(request.response.split(/\s/).join(''), 'testpass');
        
        var arr = base64DecToArr(decoded.toString(CryptoJS.enc.Base64));
        context.decodeAudioData(arr.buffer, function (buffer) {
            alert('success decoding buffer');
        }, function (err) {
            alert('couldnt decode buffer');
        });
    }
    request.send();
}

loadFile('https://plannerpal-secure-bucket.s3.eu-west-2.amazonaws.com/65aa52eeab2f97c139665edd_audioFile/65aa52eeab2f97c139665edd_1711698907084.wav.aes?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZAWH5F44EFVB4JVF%2F20240401%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240401T061452Z&X-Amz-Expires=900&X-Amz-Signature=ebb04226744cb220fc29901931e5df6296d1f4eb18ae44eb569ba77d43bb87f2&X-Amz-SignedHeaders=host');