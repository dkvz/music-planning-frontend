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
      <tr>
        <th scope="row">Machin</th>
        <td>Mark</td>
        <td>Otto</td>
      </tr>
      <tr>
        <th scope="row">Bidule truc</th>
        <td>Jacob</td>
        <td>Thornton</td>
      </tr>
      <tr>
        <th scope="row">Brol machin truc</th>
        <td>Larry</td>
        <td>the Bird</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PlanningTableRow from '@/components/PlanningTableRow.vue';

export default {
  name: 'PlanningTable',
  components: {
    PlanningTableRow
  }
};
</script>

