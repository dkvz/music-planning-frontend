<template>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="card modal-container">

          <div class="card-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="card-body">
            <slot name="main">
              default body
            </slot>
          </div>

          <div class="card-footer text-right">
            <slot name="footer">
              default footer
              <button class="btn btn-primary" @click="hide">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * I stole much of this component from the VueJS website.
 * See README for the exact link.
 */
export default {
  name: 'Modal',
  data: function() {
    return {
      showModal: false
    };
  },
  methods: {
    show: function() {
      this.showModal = true;
    },
    hide: function() {
      this.showModal = false;
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  margin-top: 5%;
  /*display: table-cell;
  vertical-align: middle;*/
}

/* .modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
} */

.modal-container {
  max-width: 600px;
  width: 100%;
  margin: 0px auto;
  transition: all .3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

