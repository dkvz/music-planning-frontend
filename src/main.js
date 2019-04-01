import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faSave, faTimesCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import RotateLoader from 'vue-spinner/src/RotateLoader.vue';

library.add(faTrash, faSave, faTimesCircle, faPlusCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('rotate-loader', RotateLoader);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
