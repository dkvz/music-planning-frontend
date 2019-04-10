<template>
  <tr>
    <th scope="row">
      <router-link :to="{name: 'planning', params: {id: planningId}}">
        {{ name }}
      </router-link>
    </th>
    <td>
      {{ creationDate.toLocaleDateString() }}
    </td>
    <td class="text-right">
      <button class="btn btn-primary btn-sm mr-1" aria-label="Copier URL dans le presse-papier" title="Copier URL dans le presse-papier" @click="copyPlanningURL">
        <font-awesome-icon icon="copy" />
      </button>
      <button class="btn btn-danger btn-sm" aria-label="Supprimer élément" title="Supprimer élément" @click="deletePlanning">
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
    creationDate: Date,
    planningId: String
  },
  methods: {
    deletePlanning: function() {
      this.$emit('delete-planning', this.planningId);
    },
    copyPlanningURL: function() {
      this.$emit('copy-planning', this.planningId);
    }
  }
};
</script>

