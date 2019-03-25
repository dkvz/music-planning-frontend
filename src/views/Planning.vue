<template>
  <div class="container py-3">
    <DkLoader :loading="loading"></DkLoader>
    <h1 v-if="planningName">{{ planningName }}</h1>
    <div v-if="message.text" class="alert" :class="message.className">
      {{ message.text }}
    </div>
    <div v-if="planningName">
      <div v-if="!isAuthenticated" class="card">
        <div class="card-header">Vous êtes qui?</div>
        <div class="card-body row">
          <NameInput ref="mainNameInput" class="col-lg-6"></NameInput>
          <DkAutocomplete :suggestions="instruments" 
            class="col-lg-6"
            label="Votre instrument" 
            placeholder="Entrez instrument...">
          </DkAutocomplete>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import api from '@/api';
import instruments from '@/instruments';
import DkLoader from '@/components/DkLoader.vue';
import DkAutocomplete from '@/components/DkAutocomplete.vue';
import NameInput from '@/components/NameInput.vue';

export default {
  name: 'Planning',
  props: {
    isAuthenticated: Boolean
  },
  components: {
    DkLoader, DkAutocomplete, NameInput
  },
  data: function() {
    return {
      planningName: '',
      loading: true,
      events: [],
      planningId: '',
      message: {
        text: '',
        className: 'alert-warning'
      },
      instruments
    };
  },
  methods: {
    showMessage: function(text, className) {
      this.message.text = text;
      this.message.className = className;
      // Scroll to top:
      this.scrollToTop();
    },
    scrollToTop: function() {
      window.scrollTo(0, 0);
    },
    getFullPlanning: function() {
      this.planningName = '';
      api.getFullPlanning(
        this.planningId,
        (data) => {
          this.loading = false;
          this.planningName = data.name;
          this.events = data.events || [];
        },
        (status) => {
          this.loading = false;
          switch(status) {
            case 404:
              this.showMessage(
                'Ce planning n\'existe pas', 'alert-warning'
              );
              break;
            case 400:
              this.showMessage(
                'Identifiant de planning trop court', 'alert-warning'
              );
              break;
            default:
              this.showMessage(
                'Erreur serveur - Voir avec l\'administrateur', 'alert-warning'
              );
          }
        }
      );
    }
  },
  beforeRouteEnter: function(to, from, next) {
    // The component instance is not accessible through "this"
    // inside beforeRouterEnter. But we can access it in next.
    //console.log(to, from);
    next(self => {
      // The component instance is in "self".
      // Load the planning data. We got the id in
      // to.params.id.
      self.planningId = to.params.id;
      self.getFullPlanning();
    });
  }
}
</script>

<style>

</style>
