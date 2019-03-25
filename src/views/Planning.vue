<template>
  <div class="container">
    <h1>{{ planningName }}</h1>
    <DkLoader :loading="loading"></DkLoader>
  </div>
</template>

<script>
import api from '@/api';
import DkLoader from '@/components/DkLoader.vue';

export default {
  name: 'Planning',
  props: {
    isAuthenticated: Boolean
  },
  data: function() {
    return {
      planningName: 'Chargement...',
      loading: true,
      events: []
    };
  },
  beforeRouteEnter: function(to, from, next) {
    // The component instance is not accessible through "this"
    // inside beforeRouterEnter. But we can access it in next.
    //console.log(to, from);
    next(self => {
      // The component instance is in "self".
      // Load the planning data:

    });
  }
}
</script>

<style>

</style>
