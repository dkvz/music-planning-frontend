<template>
  <div class="py-3">
    <Login v-if="!isAuthenticated" v-on:logged-in="loggedIn"></Login>
    <PlanningList v-else></PlanningList>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import PlanningList from "@/components/PlanningList.vue";
import api from "@/api";

export default {
  name: "Admin",
  components: {
    Login,
    PlanningList
  },
  mounted: function() {
    if (api.isLoggedInBefore(document)) {
      // We assume the token is still valid.
      // API endpoints won't work if it isn't
      // (well, hopefully).
      this.isAuthenticated = true;
      api.authenticated = true;
      this.$emit("logged-in");
    }
    /* api.checkLogin(
      () => {
        this.isAuthenticated = true;
        api.authenticated = true;
        this.$emit('logged-in');
      },
      () => {
        this.isAuthenticated = false;
        api.authenticated = false;
        this.$emit('logged-out');
      }
    ); */
  },
  data: function() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    // loggedIn is an event that receives
    // the username in param.
    loggedIn: function() {
      this.isAuthenticated = true;
      // Set a weird cookie because the token
      // cookie is not readable in document.cookie
      // on the prod app only. For some reason I
      // don't understand.
      this._setCookie('was-logged-in', 1);
      // I'm so sorry.
      this.$emit("logged-in");
    },
    _setCookie(cname, cvalue, exdays) {
      let expires = '';
      if (exdays > 0) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        expires = "expires=" + d.toUTCString();
      }
      let cook = cname + "=" + cvalue + ";path=/";
      if (expires) {
        cook = cook + ";" + expires;
      }
      document.cookie = cook;
    }
  }
};
</script>

<style>
</style>
