<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#">Plannings</a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Liste des plannings</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'planning', params: {id: 'qsjdfhqskljdf'}}">TEST</router-link>
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
    }
  }
}
</script>
