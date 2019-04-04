<template>
  <div class="container py-3">
    <Modal ref="eventModal" no-footer>
      <template v-slot:header>
        <strong>Ajouter un évènement</strong>
      </template>
      <template v-slot:main>
        <AddEventForm 
          :edit-mode="eventEditMode"
          :planning-id="planningId"
          @event-cancel="cancelEvent"
          @event-submit="submitEvent">
        </AddEventForm>
      </template>
    </Modal>
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
      <div v-if="isAuthenticated" class="bg-light p-3">
        <button class="btn btn-primary" @click="showAddEventForm">
          <font-awesome-icon icon="plus-circle" />
          Ajouter un évènement
        </button>
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
import Modal from '@/components/Modal.vue';
import AddEventForm from '@/components/AddEventForm.vue';
import { setTimeout } from 'timers';

export default {
  name: 'Planning',
  props: {
    isAuthenticated: Boolean
  },
  components: {
    DkLoader, 
    DkAutocomplete, 
    NameInput, 
    Modal,
    AddEventForm
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
      instruments,
      eventEditMode: false
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
    },
    showAddEventForm: function() {
      this.eventEditMode = false;
      this.$refs.eventModal.show();
    },
    hideEventForm: function() {
      this.$refs.eventModal.hide();
    },
    cancelEvent: function() {
      this.hideEventForm();
    },
    submitEvent: function(evt) {
      // It doesn't matter if editing or not, the
      // backend will figure it out by the presence
      // of the "id" property.
      this.hideEventForm();
      this.loading = true;
      this.scrollToTop();
      evt.event_date = evt.eventDate.getTime();
      evt.planning_id = this.planningId;
      api.postEvent(
        evt,
        () => {
          // Basically means it got inserted.
          // That's what we're going to assume alright.
          this.showMessage('Evènement ajouté', 'alert-success');
          setTimeout(() => this.showMessage(''), 5000);
          this.getFullPlanning();
        },
        (status) => {
          switch(status) {
            case 404:
              this.showMessage(
                'Euuuh... On me dit que le planning n\'existe plus?', 'alert-danger'
              );
              break;
            case 403:
              this.$router.push({name: 'not-allowed'});
              break;
            default:
              this.showMessage(
                `Erreur inconnue bizarre, 
                l'API a répondu avec un statut ${status}.`,
                'alert-danger'
              );
          }
          this.loading = false;
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
