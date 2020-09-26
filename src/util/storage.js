let storage = window.localStorage;
let localStorageSupport = true;

try {
  storage.setItem('test', '1');
  storage.removeItem('test');
} catch (err) {
  localStorageSupport = false;
  console.log('localStorage is not support!');
  storage = {};
}

export default {
  get(key) {
    return localStorageSupport ? storage.getItem(key) : storage[key];
  },
  set(key, value) {
    if (localStorageSupport) {
      storage.setItem(key, value);
    } else {
      storage[key] = value;
    }
  },
  remove(key) {
    if (localStorageSupport) {
      storage.removeItem(key);
    } else {
      delete storage[key];
    }
  }
}
