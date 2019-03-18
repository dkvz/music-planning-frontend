<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Navbar v-bind:class="{ 'd-none': !isAuthenticated  }"></Navbar>
    <main>
      <router-view v-on:logged-in="showNavbar" />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import api from '@/api';

export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    showNavbar: function() {
      this.isAuthenticated = true;
    }
  },
  data: function() {
    return {
      isAuthenticated: false
    };
  }
}
</script>

<style>

</style>
