import CryptoJS from 'crypto-js'
import consts from './consts';

export function md5(str) {
  return CryptoJS.MD5(str).toString().toLowerCase();
}

export function md5Password(password) {
  return md5(md5(password + consts.md5Salt) + consts.md5Salt);
}
