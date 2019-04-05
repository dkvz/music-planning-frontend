<template>
  <div>
    <label :for="inputId">{{ label || 'Votre nom' }}</label>
    <input 
      type="text"
      :id="inputId"
      class="form-control"
      :placeholder="placeholder || 'Entrez votre nom...'"
      v-model="value">
  </div>
</template>

<script>
export default {
  name: 'NameInput',
  props: {
    placeholder: String,
    label: String
  },
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
