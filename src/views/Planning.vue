<template>
  <h1>Planning</h1>
</template>

<script>
export default {
  name: 'Planning',
  beforeRouteEnter: function(to, from, next) {
    // The component instance is not accessible through "this"
    // inside beforeRouterEnter. But we can access it in next.
    console.log(to, from);
    next(self => {
      console.log(self);
    });
  }
}
</script>

<style>

</style>
