<template>
  <div>
    <h1>Admin</h1>
    <Login></Login>
    <PlanningList></PlanningList>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import PlanningList from '@/components/PlanningList.vue';

export default {
  name: 'Admin',
  components: {
    Login,
    PlanningList
  }
};
</script>

<style>

</style>
