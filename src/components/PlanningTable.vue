<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Date de création</th>
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
        :creationDate="planning.creation_date">
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

