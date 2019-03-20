<template>
  <div class="container">
    <h1>Planning</h1>
  </div>
</template>

<script>
export default {
  name: 'Planning',
  props: {
    isAuthenticated: Boolean
  },
  beforeRouteEnter: function(to, from, next) {
    // The component instance is not accessible through "this"
    // inside beforeRouterEnter. But we can access it in next.
    //console.log(to, from);
    next(self => {
      // The component instance is in "self".
      
    });
  }
}
</script>

<style>

</style>
