<template>
  <tr>
    <th scope="row">
      <router-link :to="{name: planning, params: {id: planningId}}">
        {{ name }}
      </router-link>
    </th>
    <td>
      {{ creationDate }}
    </td>
    <td class="text-right">
      <button class="btn btn-alert" aria-label="Supprimer élément" @click="deletePlanning">
        <font-awesome-icon icon="trash" />
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'PlanningTableRow',
  props: {
    name: String,
    creationDate: String,
    planningId: String
  },
  methods: {
    deletePlanning: function() {
      this.$emit('delete-planning', this.planningId);
    }
  }
};
</script>

