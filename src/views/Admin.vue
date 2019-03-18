<template>
  <div class="py-3">
    <Login v-if="!isAuthenticated" v-on:logged-in="loggedIn"></Login>
    <PlanningList v-else></PlanningList>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import PlanningList from '@/components/PlanningList.vue';
import api from '@/api';

export default {
  name: 'Admin',
  components: {
    Login,
    PlanningList
  },
  mounted: function() {
    if (api.getTokenFromCookie(document)) {
      // We assume the token is valid.
      // API endpoints won't work if it isn't
      // (well, hopefully).
      this.isAuthenticated = true;
      api.authenticated = true;
      this.$emit('logged-in');
    }
  },
  data: function() {
    return {
      isAuthenticated: false
    }
  },
  methods: {
    // loggedIn is an event that receives
    // the username in param.
    loggedIn: function() {
      this.isAuthenticated = true;
      // I'm so sorry.
      this.$emit('logged-in');
    }
  }
};
</script>

<style>

</style>
