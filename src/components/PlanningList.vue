<template>
  <div class="container">
    <h1>Plannings</h1>
    <transition name="fade">
      <div v-if="message" class="alert" v-bind:class="{'alert-warning': errorMessage, 'alert-success': !errorMessage}" role="alert">
        {{ message }}
      </div>
    </transition>
    <PlanningTable 
      :plannings="plannings" 
      ref="planningTable"
      v-on:refresh="loadData"
      v-on:copy-planning="copyPlanning"
      v-on:new-planning="createPlanning"
      v-on:delete-planning="deletePlanning">
    </PlanningTable>
    <Modal ref="confirmDelete">
      <template v-slot:header>
        <strong>Confirmer la suppression</strong>
      </template>
      <template v-slot:main>
        Supprimer le planning (En réalité il est juste archivé)?
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary mr-2" @click="confirmDelete">OK</button>
        <button class="btn btn-secondary" @click="$refs.confirmDelete.hide()">Annuler</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import PlanningTable from '@/components/PlanningTable.vue';
import Modal from '@/components/Modal.vue';
import api from '@/api';
import config from '@/config';

export default {
  name: 'PlanningList',
  components: {
    PlanningTable,
    Modal
  },
  data: function() {
    return {
      plannings: [],
      message: '',
      errorMessage: true,
      toDelete: ''
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      // Route to the 403 page if we get a 403 response 
      // from the API.
      this.message = '';
      api.getPlannings(
        (data) => this.plannings = data.map(e => {
          e.jsDate = new Date(e.created_date);
          return e;
        }),
        (status) => {
          switch(status) {
            case 403:
              this.$router.push({name: 'not-allowed'});
              break;
            default:
              this.errorMessage = true;
              this.message = `Erreur inconnue bizarre, 
                l'API a répondu avec un statut ${status}.`;
          }
        }
      );
    },
    copyPlanning: function(planningId) {
      /**
       * Somehow I'd rather add the dummy input field 
       * to the body element rather than my component 
       * here. Clipboard support is horrible anyway.
       */
      const toCopy = `${config.prodUrl}/planning/${planningId}`;
      const input = document.createElement('input');
      input.value = toCopy;
      input.style.position = 'absolute';
      input.style.left = 0;
      input.style.top = 0;
      input.style.zIndex = -999;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      this.errorMessage = false;
      this.message = `URL du planning ${toCopy} copiée dans le presse-papier`;
    },
    createPlanning: function(pName) {
      // To make things easy we just refresh at the end.
      api.postPlanning(
        pName,
        () => {
          this.loadData();
          this.$refs.planningTable.hideForm();
        },
        status => {
          this.$refs.planningTable.hideForm();
          switch(status) {
            case 403:
              this.$router.push({name: 'not-allowed'});
              break;
            default:
              this.errorMessage = true;
              this.message = `Erreur inconnue bizarre, 
                l'API a répondu avec un statut ${status}.`
          }
        }
      );
    },
    deletePlanning: function(planningId) {
      this.toDelete = planningId;
      this.$refs.confirmDelete.show();
    },
    confirmDelete: function() {
      // To make things easy we just refresh at the end.
      this.$refs.confirmDelete.hide();
      api.deletePlanning(
        this.toDelete,
        () => {
          this.errorMessage = false;
          this.message = 'Planning supprimé.';
          this.toDelete = '';
          this.loadData();
        },
        (status) => {
          this.toDelete = '';
          switch(status) {
            case 403:
              this.$router.push({name: 'not-allowed'});
              break;
            default:
              this.errorMessage = true;
              this.message = `Erreur inconnue bizarre, 
                l'API a répondu avec un statut ${status}.`
          }
        }
      );
    }
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
