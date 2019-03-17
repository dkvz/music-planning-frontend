<template>
  <div class="py-3">
    <Login v-if="!isAuthenticated()"></Login>
    <PlanningList v-else></PlanningList>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import PlanningList from '@/components/PlanningList.vue';
import auth from '@/auth';

export default {
  name: 'Admin',
  components: {
    Login,
    PlanningList
  },
  methods: {
    isAuthenticated: function() {
      return auth.token !== null;
    }
  }
};
</script>

<style>

</style>
