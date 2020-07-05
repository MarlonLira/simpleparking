import * as CryptoJS from 'crypto-js'


export abstract class Crypto {

  private static readonly cryptographyData = {
    algorithm: 'aes256',
    coding: 'utf8',
    secret: '|*#5522&*QWE?/',
    type: 'hex'
  };

  public static Encrypt = (value: string): string => CryptoJS.AES.encrypt(value, Crypto.cryptographyData.secret).toString();
  public static Decrypt = (hash: string): string => CryptoJS.AES.decrypt(hash, Crypto.cryptographyData.secret).toString(CryptoJS.enc.Utf8);
}
