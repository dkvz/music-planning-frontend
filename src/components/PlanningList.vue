<template>
  <div class="container">
    <h1>Plannings</h1>
    <div v-if="warningMessage" class="alert alert-warning" role="alert">
      {{ warningMessage }}
    </div>
    <PlanningTable :plannings="plannings">
    </PlanningTable>
  </div>
</template>

<script>
import PlanningTable from '@/components/PlanningTable.vue';
import api from '@/api';

export default {
  name: 'PlanningList',
  components: {
    PlanningTable
  },
  data: function() {
    return {
      plannings: [],
      warningMessage: ''
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      // Route to the 403 page if we get a 403 response 
      // from the API.
      this.warningMessage = '';
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
              this.warningMessage = `Erreur inconnue bizarre, 
                l'API a répondu avec un statut ${status}.`;
          }
        }
      );
    }
  }
};
</script>

<style>

</style>
