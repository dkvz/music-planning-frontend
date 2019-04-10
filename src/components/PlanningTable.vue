<template>
  <div>
    <div class="text-right button-row mb-1">
      <button class="btn btn-primary ml-2" @click="displayForm">Ajouter</button>
      <button class="btn btn-primary ml-2" @click="refreshClicked" title="Rafraîchir">
        <font-awesome-icon icon="sync" />
      </button>
    </div>
    <form @submit="postPlanning">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Date création</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:class="{'d-none': !showForm}">
          <th scope="row">
            <input type="text" :disabled="saving" required placeholder="Nom du planning" ref="nameInput" v-model="planningName">
          </th>
          <td></td>
          <td class="text-right">
            <rotate-loader class="p-spinner" :loading="saving"></rotate-loader>
            <button class="btn btn-success mr-1" :disabled="saving" aria-label="Enregistrer" title="Enregistrer" type="submit">
              <font-awesome-icon icon="save" />
            </button>
            <button class="btn btn-danger" :disabled="saving" aria-label="Annuler" title="Annuler" type="reset" @click="hideForm">
              <font-awesome-icon icon="times-circle" />
            </button>
          </td>
        </tr>
        <PlanningTableRow 
          v-for="planning in plannings" 
          :key="planning.uuid"
          v-on:delete-planning="deletePlanning"
          v-on:copy-planning="copyPlanning"
          :name="planning.name"
          :planning-id="planning.uuid"
          :creation-date="planning.jsDate">
        </PlanningTableRow>
      </tbody>
    </table>
    </form>
  </div>
</template>

<script>
import PlanningTableRow from '@/components/PlanningTableRow.vue';

export default {
  name: 'PlanningTable',
  components: {
    PlanningTableRow
  },
  props: {
    plannings: Array
  },
  data: function() {
    return {
      planningName: '',
      saving: false,
      showForm: false
    };
  },
  methods: {
    deletePlanning: function(planningId) {
      this.$emit('delete-planning', planningId);
    },
    copyPlanning: function(planningId) {
      this.$emit('copy-planning', planningId);
    },
    postPlanning: function(e) {
      e.preventDefault();
      if (this.planningName) {
        this.saving = true;
        this.$emit('new-planning', this.planningName);
        this.planningName = '';
      }
    },
    hideForm: function() {
      this.saving = false;
      this.showForm = false;
    },
    displayForm: function() {
      this.saving = false;
      this.showForm = true;
      // Aaah... Javascript...
      setTimeout(() => this.$refs.nameInput.focus(), 250);
    },
    refreshClicked: function(e) {
      this.$emit('refresh');
      e.currentTarget.blur();
    }
  }
};
</script>

<style>
.p-spinner {
  display: inline-block;

}
</style>
