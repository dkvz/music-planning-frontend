<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Navbar v-bind:class="{ 'd-none': !isAuthenticated  }"></Navbar>
    <main>
      <router-view 
        v-on:logged-in="showNavbar" 
        v-on:logged-out="hideNavbar" 
        v-bind:is-authenticated="isAuthenticated" />
    </main>
    <footer class="mt-auto bg-light py-3">
      <div class="container text-right">
        <a href="https://github.com/dkvz/music-planning-frontend" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/github.png" alt="Github Icon">
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    showNavbar: function() {
      this.isAuthenticated = true;
    },
    hideNavbar: function() {
      this.isAuthenticated = false;
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
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#app > main {
  flex: 1;
}

#app > footer {
  box-shadow: 0px 0px 6px rgba(0,0,0,0.5);
}
</style>
