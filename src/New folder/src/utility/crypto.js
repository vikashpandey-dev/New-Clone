import  CryptoJS  from "crypto-js";
import  * as ENABLE_ENCRIPTION from "../config/ENABLE_ENCRIPTION"
function randomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  // var key = text + navigator.sayswho + $(window).width();
  var key = text;

  return key;
}

const decryptJS =  (cipherData) => {
  if(ENABLE_ENCRIPTION.ENABLE_ENCRIPTION==0)
  return cipherData
  if (!cipherData) {
    throw Error("somthing went wrong !!");
  }
  
  var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
  var iv = CryptoJS.enc.Utf8.parse(cipherData.slice(cipherData.length - 16));
  cipherData = cipherData.slice(0, cipherData.length - 16);
  var decrypted = CryptoJS.AES.decrypt(cipherData, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let Jsondata = JSON.parse(` ${decrypted.toString(CryptoJS.enc.Utf8)}`);

  return Jsondata;
};

const EncryptJS =  (plain) => {
  if(ENABLE_ENCRIPTION.ENABLE_ENCRIPTION==0)
  return plain
  let randomIV =  randomString(16);
  var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
  var iv = CryptoJS.enc.Utf8.parse(randomIV);
  // var iv = CryptoJS.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(plain), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let encrypt = encrypted.toString() + randomIV;

  return  encrypt.replace(/\\/g, "/");
  // return encrypted.toString();
};

const testEncrypt = async (plain) => {
  let randomIV = await randomString(16);
  var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
  var iv = CryptoJS.enc.Utf8.parse(randomIV);
  // var iv = CryptoJS.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
  // console.log(iv, randomIV);
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(plain), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  let encrypt = encrypted.toString() + randomIV;
  return encrypt.replace(/\\/g, "/");
};

const decode = function (req, res) {
  try {
    let encryptedBase64 = req.body.data;
    // INIT
    const encoded = encryptedBase64; // Base64 encoded string

    //const encodedWord =stringtoByte(encoded)
    let encodedWord = Buffer.from(encoded, "base64");

    let iv = encodedWord.slice(0, 16);
    let cipherText = encodedWord.slice(16, encodedWord.length);

    var strs = "55ed1e63769b6d0478e0fec9aa3e960f";
    let key = crypto.createHash("md5").update(strs).digest("hex");

    iv = Buffer.from(iv, "hex");
    key = Buffer.from(stringtoByte(key), "hex");
    cipherText = Buffer.from(cipherText, "hex");

    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(cipherText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    var data = {
      Data: decrypted.toString(),
      ResponseCode: 100,
    };
    res.send(data);
  } catch (error) {
    var data = {
      ResponseCode: 101,
    };
    res.send(data);
  }
  //   return Buffer.from(Buffer.concat([iv, encrypted])).toString('base64');
};

export default { decryptJS, EncryptJS };
