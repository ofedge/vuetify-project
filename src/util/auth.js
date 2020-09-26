import storage from './storage';
import consts from './consts';

export function setToken(token) {
  storage.set(consts.tokenStoreKey, token);
}

export function getBearerToken() {
  const storageToken = storage.get(consts.tokenStoreKey);
  return storageToken ? 'Bearer ' + storageToken : '';
}

export function removeToken() {
  storage.remove(consts.tokenStoreKey);
}
