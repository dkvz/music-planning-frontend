<template>
  <div class="autocomplete-box">
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
      @keydown="_keydown"
      v-model="value"
      ref="input">
    <ul class="list-group autocomplete-list"
      v-bind:class="{'d-none': !listVisible}">
      <li 
        v-for="(item, index) in filtered" 
        :key="item.code" 
        :data-code="item.code" 
        :data-name="item.name" 
        class="list-group-item" 
        :class="{'list-item-active': index === highlighted}"
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
      selectedCode: null,
      highlighted: -1,
      scrolledTo: false
    };
  },
  props: {
    // Expects an array of instrument objects with
    // properties "name" and "code".
    suggestions: Array,
    placeholder: String,
    label: String,
    selected: String,
    autoScrollTo: Boolean,
    scroller: Object,
    forceSelection: Boolean
  },
  methods: {
    _blurred: function() {
      // If nothing was selected, select default.
      // Optional behavior set by the 
      // "forceSelection" prop.
      if (this.forceSelection && !this.selectedCode) {
        // Force value to null just in case:
        this._deselect();
        this.value = this.suggestions[0].name;
      }
      setTimeout(() => {
        this.listVisible = false;
        this.scrolledTo = false;
      }, 150);
    },
    _keyup: function(e) {
      // Ignore what we'll treat with keydown:
      if (e.code.indexOf('Arrow') >= 0 ||
        e.code === 'Esc' ||
        e.code === 'Enter') {
          return;
        }
      // Cancel selected code:
      if (this.selectedCode) {
        this._deselect();
      }
      this.highlighted = -1;
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
    _keydown: function(e) {
      // We be looking for ArrowDown, ArrowUp, Enter and Escape.
      // We shouldn't do anything unless the suggestions
      // are currently showing.
      if (this.autoScrollTo && 
        document.documentElement.clientWidth <= 600 &&
        !this.scrolledTo &&
        this.$refs.input.scrollIntoView) {
        // Scroll to the element. I'm using the ID.
        // The check for clientWidth is so that this only happens on mobile.
        //location.hash = this.inputId;
        //this.$refs.input.focus();
        // We can't use location.hash, it blurs the input.
        this.scrolledTo = true;
        /* const scroller = this.scroller ? this.scroller : document.documentElement;
        scroller.scrollTop = this.$refs.input.offsetTop + 200; */
        // Let's use an experimental feature 'scrollIntoView'.
        // I check for its existence above.
        this.$refs.input.scrollIntoView();
      }
      if (this.listVisible) {
        switch (e.code) {
          case 'ArrowDown':
            if (this.highlighted < (this.filtered.length - 1)) {
              this.highlighted++;
            }
            break;
          case 'ArrowUp':
            if (this.highlighted > 0) {
              this.highlighted--;
            }
            break;
          case 'Enter':
            if (this.filtered[this.highlighted]) {
              this.selectedCode = this.filtered[this.highlighted].code;
              this.value = this.filtered[this.highlighted].name;
              this.$emit('item-selected', this.filtered[this.highlighted]);
            }
            // I thought I was smart just falling to the next case which
            // also calls _blurred() but apparently the linter doesn't 
            // allow switch cases with no break at the end... Oh well.
            this._blurred();
            break;
          case 'Escape':
            this._blurred();
        }
      }
    },
    _itemClick: function(e) {
      this.selectedCode = e.target.getAttribute('data-code');
      this.value = e.target.getAttribute('data-name');
      this.$emit('item-selected', {name: this.value, code: this.selectedCode});
    },
    _deselect: function() {
      this.selectedCode = null;
      this.$emit('item-selected', {code: null, name: null});
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
        if (sugg && sugg.length > 0) {
          this.selectedCode = sugg[0].code;
          this.value = sugg[0].name;
          this.$emit('item-selected', {name: this.value, code: this.selectedCode});
        }
      }   
    }
  }
}
</script>

<style scoped>
.autocomplete-box {
  position: relative;
}

ul.autocomplete-list {
  display: block;
  position: absolute;
  z-index: 999;
  box-shadow: 4px 4px 8px rgba(0,0,0,0.6);
}

ul.autocomplete-list li {
  cursor: pointer;
}

ul.autocomplete-list li:hover, .list-item-active {
  background-color: #edebeb;
}
</style>
