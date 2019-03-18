<template>
  <div class="container py-3">
    <div class="jumbotron">
      <h1 class="display-4">Pas Autorisé</h1>
      <p class="lead">Vous n'êtes apparemment pas connecté.</p>
      <hr>
      <router-link class="btn btn-primary btn-lg" to="/">Se connecter</router-link>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'Error403',
  // mounted gets called everytime VueJS routes to this.
  // But we should probably use a router event instead.
  beforeRouteEnter: function(to, from, next) {
    next(self => {
      // The component instance is in "self".
      // Just log everything out when someone gets to this
      // page.
      api.logout(document);
      self.$emit('logged-out');
    });
  }
}
</script>
