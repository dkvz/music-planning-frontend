<template>
  <div class="container">
    <div class="row justify-content-center">
      <form class="col-lg-6 border py-3" @submit="sendLogin">
        <h1>S'enregistrer</h1>
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
    sendLogin: function(e) {
      e.preventDefault();
      api.postLogin(
        this.username,
        this.password,
        false,
        (res) => console.log(res),
        (err) => console.log(err) 
      );
    }
  },
  data: function() {
    return {
      username: '',
      password: ''
    };
  }
};
</script>

<style>

</style>
