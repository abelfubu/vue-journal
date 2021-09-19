import Vue from 'vue';
import App from './App.vue';
import lang from 'element-ui/lib/locale/lang/es';
import locale from 'element-ui/lib/locale';
import router from './router';
import store from './store';

import '@/theme/index.css';
import '@/theme/global.scss';

import { Message, MessageBox, Button, DatePicker } from 'element-ui';

Vue.config.productionTip = false;

Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message);
Vue.component(Button.name, Button);
Vue.use(DatePicker, { locale });
locale.use(lang);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
