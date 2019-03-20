<template>
  <div class="container">
    <h1>Plannings</h1>
    <div v-if="message" class="alert" v-bind:class="{'alert-warning': errorMessage, 'alert-success': !errorMessage}" role="alert">
      {{ message }}
    </div>
    <PlanningTable 
      :plannings="plannings" 
      @refresh="loadData"
      ref="planningTable"
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
              this.message = `Erreur inconnue bizarre, 
                l'API a répondu avec un statut ${status}.`;
          }
        }
      );
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
          // I chose to keep showing the form.
          switch(status) {
            case 403:
              this.$router.push({name: 'not-allowed'});
              break;
            default:
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
      api.deletePlanning(
        this.toDelete,
        () => {
          this.message = 'Planning supprimé.';
          this.toDelete = '';
        },
        (status) => {
          this.toDelete = '';
          switch(status) {
            case 403:
              this.$router.push({name: 'not-allowed'});
              break;
            default:
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

</style>
