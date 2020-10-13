import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { zhHans, en },
      current: 'en',
    },
});
