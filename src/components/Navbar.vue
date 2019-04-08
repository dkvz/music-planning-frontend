<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarToggler" ref="collapsible">
      <a class="navbar-brand" href="#">Plannings</a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item" @click="collapseNavbar">
          <router-link class="nav-link" to="/">Liste des plannings</router-link>
        </li>
      </ul>
      <div class="my-2 my-lg-0">
        <button class="btn btn-outline-primary" @click="disconnect">Se déconnecter</button>
      </div>
    </div>
  </nav> 
</template>

<script>
import api from '@/api';

export default {
  name: 'Navbar',
  props: {
    //isAuthenticated: Boolean
  },
  methods: {
    disconnect: function() {
      api.logout(document);
      // Reload for good measure:
      window.location.reload();
    },
    collapseNavbar: function() {
      // I'm hacking Bootstrap, look at me
      this.$refs.collapsible.classList.remove('show');
    }
  }
}
</script>
