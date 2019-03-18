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
  }
};
</script>

