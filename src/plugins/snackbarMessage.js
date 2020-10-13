import Vue from 'vue';

export const store = Vue.observable({
  snackbar: {
    show: false,
    message: "",
    type: "",
    duration: 5000,
    showClose: true
  }
});

export const mutation = {
  close() {
    store.snackbar.show = false;
    store.snackbar.duration = 5000;
  }
}

const defaultOptions = {
  message: "",
  type: "info",
  duration: 5000,
  showClose: true
}

const setOption = (option) => {
  store.snackbar.message = option.message;
  store.snackbar.type = option.type;
  store.snackbar.duration = option.duration;
  store.snackbar.showClose = option.showClose;
  store.snackbar.show = true;
}

const message = {
  message(options) {
    const option = Object.assign({}, defaultOptions, options);
    setOption(option);
  },
  success(message) {
    const option = Object.assign({}, defaultOptions, { type: "success", message: message });
    setOption(option);
  },
  warning(message) {
    const option = Object.assign({}, defaultOptions, { type: "warning", message: message });
    setOption(option);
  },
  info(message) {
    const option = Object.assign({}, defaultOptions, { type: "info", message: message });
    setOption(option);
  },
  error(message) {
    const option = Object.assign({}, defaultOptions, { type: "error", message: message });
    setOption(option);
  }
}

Vue.prototype.$message = message;
