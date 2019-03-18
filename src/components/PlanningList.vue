<template>
  <div class="container">
    <h1>Plannings</h1>
    <PlanningTable></PlanningTable>
  </div>
</template>

<script>
import PlanningTable from '@/components/PlanningTable.vue';

export default {
  name: 'PlanningList',
  components: {
    PlanningTable
  }
};
</script>

<style>

</style>
