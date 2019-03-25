<template>
  <div>
    <label :for="inputId">Votre nom</label>
    <input 
      type="text"
      :id="inputId"
      class="form-control"
      placeholder="Entrez votre nom..."
      v-model="value">
  </div>
</template>

<script>
export default {
  name: 'NameInput',
  data: function() {
    return {
      inputId: null,
      value: ''
    };
  },
  methods: {
    getValue: function() {
      return this.value;
    }
  },
  mounted: function() {
    this.inputId = this._uid;
  }
}
</script>

<style>

</style>
