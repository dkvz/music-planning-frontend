<template>
  <div v-if="loading" class="jumbotron center-it">
    <h1 class="display-4">Chargement...</h1>
  </div>
</template>

<script>
export default {
  name: 'DkLoader',
  props: {
    loading: Boolean
  }
}
</script>

<style scoped>
.center-it {
  display: flex;
  align-items: center;
  justify-content: center;
}


@keyframes scaler {
  0% {transform: scale(1)}   
  50% {transform: scale(1.25)}   
  100% {transform: scale(1)}
}

.center-it h1 {
  animation: scaler 0.6s infinite; 
}
</style>
