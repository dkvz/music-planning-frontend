<template>
  <div class="container">
    <div class="row justify-content-center">
      <form class="col-lg-6 border py-3">
        <h1>S'enregistrer</h1>
        <div class="form-group">
          <label for="nameInput">Nom d'utilisateur</label>
          <input type="text" class="form-control" id="nameInput" placeholder="Nom d'utilisateur" required>
        </div>
        <div class="form-group">
          <label for="passwordInput">Mot de passe</label>
          <input type="password" class="form-control" id="passwordInput" placeholder="Mot de passe" required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-primary">Envoyer</button>  
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<style>

</style>
