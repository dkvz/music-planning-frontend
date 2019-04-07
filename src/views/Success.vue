<template>
  <div class="container center-me">
    <div class="jumbotron border border-success">
      <h1 class="display-5 text-success">
        Vos disponibilités ont été enregistrées
      </h1>
      <hr>
      <p class="lead">Pour modifier quoi que ce soit il faut aller râler auprès de David.</p>
      <hr>
      <p>Vous pouvez fermer cette page.</p>
    </div>
  </div>
</template>

<script>
/**
 * Just a quick "success" screen when a full
 * planning has been posted.
 */

export default {
  name: 'Success'
}
</script>

<style>
.center-me {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
