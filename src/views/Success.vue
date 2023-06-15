<template>
  <div class="container center-me">
    <div class="jumbotron border border-success text-center">
      <h1 class="display-5 text-success">
        Vos disponibilités ont été enregistrées
      </h1>
      <img class="tournage" src="@/assets/chapocut.png" alt="Chapeau qui tourne">
      <hr>
      <p class="lead">Pour modifier quoi que ce soit il faut aller râler sur le groupe WhatsApp mais pas pour dire qu'en fait vous allez être absent parce qu'on a dit de plus faire ça si possible, merci bien.</p>
      <hr>
      <p>Vous pouvez fermer cette page et je vous conseille de le faire parce que le chapeau qui tourne utilise de la batterie.</p>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tournage {
  padding-top: 2rem;
  animation: tournage 2s infinite;
  padding-bottom: 2rem;
}

@keyframes tournage {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
