import CryptoJS from "crypto-js";
import { JSEncrypt } from "encryptlong";
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function aesEncrypt(data, keyStr, ivStr) {
  let key = keyStr;
  let iv = ivStr;

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let srcs = CryptoJS.enc.Utf8.parse(data);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  // console.log("-=-=-=-", encrypted.ciphertext)
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function aesDecrypt(data, keyStr, ivStr) {
  let key = keyStr;
  let iv = ivStr;

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let base64 = CryptoJS.enc.Base64.parse(data);
  let src = CryptoJS.enc.Base64.stringify(base64);

  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

/**
 * AES 加密 ：字符串 key iv  返回base64
 *
 */
export function AesEncrypt(data) {
  var ciphertext = "";
  localStorage.getItem({
    key: "AES_KEY",
    success: function(res) {
      console.log("AES_KEY:::" + res.data);
      if (res) {
        var key = CryptoJS.enc.Utf8.parse(res.data);
        var iv = CryptoJS.enc.Utf8.parse(res.data);
      }

      let srcs = CryptoJS.enc.Utf8.parse(data);
      var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      });

      ciphertext = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    }
  });

  console.log("2222-=-=-=-", ciphertext);
  return ciphertext;
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function AesDecrypt(data) {
  var AES_KEY = localStorage.getItem("AES_KEY");

  var key = CryptoJS.enc.Utf8.parse(AES_KEY);
  var iv = CryptoJS.enc.Utf8.parse(AES_KEY);

  let base64 = CryptoJS.enc.Base64.parse(data);
  let src = CryptoJS.enc.Base64.stringify(base64);

  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  decryptedStr = decryptedStr.toString();

  console.log(decryptedStr);
  return decryptedStr;
}

/*
 * 生成RSA秘钥对儿
 */
export function rsaGenKey() {
  //生成本地的RSA Keys
  var keySize = 1024;
  var rsa = new JSEncrypt({ default_key_size: keySize });
  rsa.getKey();

  let lpubKey = rsa.getPublicKey();
  let lprvKey = rsa.getPrivateKey();
  let localRsaKeys = {
    lpubKey: lpubKey,
    lprvKey: lprvKey
  };
  //console.log(localRsaKeys)
  return localRsaKeys;
}

//RSA加密
export function rsaEncrypt(rawData, publicKey) {
  //用服务端公钥加密本地私钥
  var encrypt = new JSEncrypt();

  var fdStart = publicKey.indexOf("-----BEGIN");
  if (fdStart == 0) {
    encrypt.setPublicKey(publicKey);
  } else if (fdStart == -1) {
    encrypt.setPublicKey(
      "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----"
    );
  }

  //console.log('加密前数据:%o', rawData);
  //console.log('加密公钥:%o', publicKey);
  var encrypted = encrypt.encryptLong(rawData);

  return encrypted;
}

//RSA解密
export function rsaDecrypt(encryptedData, privateKey) {
  console.log(privateKey);
  if (privateKey) {
    var decrypt = new JSEncrypt();
    var fdStart = privateKey.indexOf("-----BEGIN");
    if (fdStart == 0) {
      decrypt.setPrivateKey(privateKey);
    } else if (fdStart == -1) {
      decrypt.setPrivateKey(
        "-----BEGIN PUBLIC KEY-----" + privateKey + "-----END PUBLIC KEY-----"
      );
    }

    //  decrypt.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----' + privateKey + '-----END RSA PRIVATE KEY-----');
    var uncrypted = decrypt.decryptLong(encryptedData);
    console.log(uncrypted);
    return uncrypted;
  }
}
