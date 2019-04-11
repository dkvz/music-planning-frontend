import Vue from 'vue';
import Router from 'vue-router';
import Admin from './views/Admin.vue';
import Planning from './views/Planning.vue';
import Error403 from './views/Error403.vue';
import Success from './views/Success.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Admin
    },
    {
      path: '/planning/:id',
      name: 'planning',
      component: Planning
    },
    {
      path: '/not-allowed',
      name: 'not-allowed',
      component: Error403
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    }
  ]
});
