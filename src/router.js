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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
