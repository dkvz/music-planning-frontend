<template>
  <div class="container">
    <div class="row justify-content-center">
      <form class="col-lg-6 border py-3" @submit="sendLogin">
        <h1>S'enregistrer</h1>
        <transition name="fade">
          <div v-if="warningMessage" class="alert alert-warning" role="alert">
            {{ warningMessage }}
          </div>
        </transition>
        <div class="form-group">
          <label for="nameInput">Nom d'utilisateur</label>
          <input v-model="username" type="text" class="form-control" id="nameInput" placeholder="Nom d'utilisateur" required>
        </div>
        <div class="form-group">
          <label for="passwordInput">Mot de passe</label>
          <input v-model="password" type="password" class="form-control" id="passwordInput" placeholder="Mot de passe" required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-primary">Envoyer</button>  
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'Login',
  methods: {
    reset: function() {
      this.username = '';
      this.password = '';
    },
    sendLogin: function(e) {
      e.preventDefault();
      this.warningMessage = '';
      const currentUsername = this.username;
      api.postLogin(
        this.username,
        this.password,
        false,
        () => {
          // Pretty much means we're connected.
          // The backend is a little weird.
          api.authenticated = true;
          api.username = currentUsername;
          // We could route to PlanningList but for
          // some reason I made it a component on the 
          // previous page.
          this.reset();
          this.$emit('logged-in', this.username);
        },
        (status) => {
          api.authenticated = false;
          switch (status) {
            case 403:
              this.warningMessage = `Mauvais nom d'utilisateur 
                ou mot de passe.`;
              break;
            default:
              this.warningMessage = `Nous avons recontré un problème 
                serveur ou autre truc qui ne devrait pas arriver, 
                il faudrait contacter quelqu'un qui serait en mesure 
                d'investiguer. Ou alors réessayer dans deux heures. 
                Ou les deux.`;
          }
        } 
      );
    }
  },
  data: function() {
    return {
      username: '',
      password: '',
      warningMessage: ''
    };
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .6s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
