<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Date création</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <PlanningTableRow 
        v-for="planning in plannings" 
        :key="planning.uuid"
        v-on:delete-planning="deletePlanning"
        :name="planning.name"
        :planning-id="planning.uuid"
        :creation-date="planning.jsDate">
      </PlanningTableRow>
    </tbody>
  </table>
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
  methods: {
    deletePlanning: function(planningId) {
      this.$emit('delete-planning', planningId);
    }
  }
};
</script>

