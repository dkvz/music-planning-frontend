<template>
  <div>
    <label v-if="label" :for="inputId">{{ label }}</label>
    <input 
      type="text" 
      class="form-control"
      v-bind:class="{'is-valid': selectedCode}"
      :id="inputId" 
      :name="inputId" 
      :placeholder="placeholder"
      @blur="_blurred"
      @keyup="_keyup"
      v-model="value">
    <ul class="list-group autocomplete-list"
      v-bind:class="{'d-none': !listVisible}">
      <li 
        v-for="item in filtered" 
        :key="item.code" 
        :data-code="item.code" 
        :data-name="item.name" 
        class="list-group-item" 
        @click="_itemClick">
          {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DkAutocomplete',
  data: function() {
    return {
      inputId: null,
      listVisible: false,
      value: '',
      filtered: [],
      selectedCode: null
    };
  },
  props: {
    // Expects an array of instrument objects with
    // properties "name" and "code".
    suggestions: Array,
    placeholder: String,
    label: String,
    selected: String
  },
  methods: {
    _blurred: function() {
      setTimeout(() => this.listVisible = false, 150);
    },
    _keyup: function() {
      // Cancel selected code:
      this.selectedCode = null;
      if (this.value) {
        const lowercased = this.value.toLowerCase();
        const filtered = this.suggestions.filter(
          s => s.name.toLowerCase().indexOf(lowercased) >= 0
        );
        if (filtered.length > 0) {
          this.filtered = filtered;
          this.listVisible = true;
          return;
        } 
      }
      this.listVisible = false;
    },
    _itemClick: function(e) {
      this.selectedCode = e.target.getAttribute('data-code');
      this.value = e.target.getAttribute('data-name');
      this.$emit('item-selected', {name: this.value, code: this.selectedCode});
    }
  },
  mounted: function() {
    this.inputId = this._uid;
  },
  watch: {
    selected: function(newVal) {
      if (newVal) {
        const sugg = this.suggestions.filter(
          e => e.code == newVal
        );
        this.selectedCode = sugg.code;
        this.value = sugg.name;
      }   
    }
  }
}
</script>

<style>
ul.autocomplete-list {
  position: fixed;
}

ul.autocomplete-list li {
  cursor: pointer;
}

ul.autocomplete-list li:hover {
  background-color: #edebeb;
}
</style>
