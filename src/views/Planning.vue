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
          :event="eventToEdit"
          @event-cancel="cancelEvent"
          @event-submit="submitEvent">
        </AddEventForm>
      </template>
    </Modal>
    <Modal ref="presenceModal">
      <template v-slot:header>
        <strong>Ajouter une personne présente</strong>
      </template>
      <template v-slot:main>
        <form @submit.prevent="addPresence">
          <NameInput class="form-group"
            ref="presenceName"
            placeholder="Entrez un nom..."
            label="Nom de la personne">
          </NameInput>
          <DkAutocomplete :suggestions="instruments" 
            class="form-group"
            label="Instrument" 
            placeholder="Entrez instrument..."
            auto-scroll-to 
            @item-selected="setSelectedInstrument">
          </DkAutocomplete>
        </form>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary mr-2" @click="addPresence">
          OK
        </button>
        <button class="btn btn-secondary" @click="$refs.presenceModal.hide()">
          Annuler
        </button>
      </template>
    </Modal>
    <DkLoader :loading="loading"></DkLoader>
    <h1 v-if="planningName" class="planning-title">Planning: {{ planningName }}</h1>
    <transition name="fade">
      <div v-if="message.text" class="alert" :class="message.className">
        {{ message.text }}
      </div>
    </transition>
    <div v-if="planningName">
      <div v-if="!isAuthenticated" class="card mb-4">
        <div class="card-header">Vous êtes qui?</div>
        <div class="card-body row">
          <NameInput ref="mainNameInput" class="col-lg-6"></NameInput>
          <DkAutocomplete :suggestions="instruments" 
            class="col-lg-6"
            label="Votre instrument" 
            placeholder="Entrez instrument..."
            auto-scroll-to
            @item-selected="setSelectedInstrument">
          </DkAutocomplete>
        </div>
      </div>
      <div v-if="isAuthenticated" class="bg-light p-3 my-3">
        <button class="btn btn-primary mr-2" @click="showAddEventForm">
          <font-awesome-icon icon="plus-circle" />
          Ajouter un évènement
        </button>
        <button class="btn btn-primary" @click="getFullPlanning" title="Rafraîchir">
          <font-awesome-icon icon="sync" />
        </button>
      </div>
      <div v-else class="text-right mb-4">
        <button class="btn btn-primary" 
          @click="getFullPlanning"
          title="Rafraîchir">
          <font-awesome-icon icon="sync" />
        </button>
      </div>

      <Event v-for="event in events" :key="event.id"
        ref="evtComponents"
        :is-authenticated="isAuthenticated"
        :id="event.id"
        :name="event.name"
        :category="event.category"
        :description="event.description"
        :event-date="new Date(event.event_date)"
        :selected-instrument="instrumentSelected && instrumentSelected.code"
        :presences="event.presences"
        @add-presence="showPresenceModal" 
        @remove-presence="removePresence"
        @remove-event="removeEvent"
        @edit-event="editEvent"
        className="event-row">
      </Event>

      <button class="btn btn-primary btn-lg btn-huge"
        title="Soumettre vos choix (définitif) - ce bouton est immense"
        v-if="!isAuthenticated && events && events.length > 0"
        @click="submitAllPresences">
          <font-awesome-icon icon="file-export" />
          Enregistrer vos choix
      </button>

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
import Event from '@/components/Event.vue';

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
    AddEventForm,
    Event
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
      eventEditMode: false,
      instrumentSelected: null,
      currentEventId: null,
      eventToEdit: null
    };
  },
  methods: {
    showMessage: function(text, className, autoHide = false) {
      this.message.text = text;
      this.message.className = className;
      // Scroll to top:
      this.scrollToTop();
      if (autoHide) setTimeout(() => this.showMessage(''), 5000);
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
      this.$refs.eventModal.show();
      setTimeout(() => {
        this.eventEditMode = false;
      }, 150);
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
      this.scrollToTop();
      this.loading = true;
      evt.event_date = evt.eventDate.getTime();
      evt.planning_id = this.planningId;
      api.postEvent(
        evt,
        () => {
          // Basically means it got inserted.
          // That's what we're going to assume alright.
          this.showMessage(
            evt.id ? 'Evènement modifié' : 'Evènement ajouté', 
            'alert-success', 
            true
          );
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
    },
    setSelectedInstrument: function(instr) {
      this.instrumentSelected = instr;
    },
    _getEventById: function(eventId) {
      const curEvt = this.events.filter(
        evt => evt.id == eventId
      )[0];
      if (curEvt) return curEvt;
      else return null;
    },
    addPresence: function() {
      // Get the name from refs.
      // Selected instrument is in this.instrumentSelected.
      // If no instrument is selected, use the unknown one.
      // Check that we got the name:
      this.showMessage('');
      const name = this.$refs.presenceName.getValue();
      // I'm putting the event ID in a variable in case it 
      // changes during the web request for some reason. 
      // Yeah I'm like that.
      const curEventId = this.currentEventId;
      const curInstrument = 
        (this.instrumentSelected && this.instrumentSelected.code) || instruments[0].code;
      this.$refs.presenceModal.hide();
      if (name) {
        this.loading = true;
        api.postPresence(
          curEventId,
          name,
          curInstrument,
          (data) => {
            // We should add the new presence to the current
            // full array.
            /* const curEvt = this.events.filter(
              evt => evt.id == curEventId
            )[0]; */
            const curEvt = this._getEventById(curEventId);
            if (curEvt) {
              curEvt.presences.push({
                id: data.id,
                name,
                instrument_code: curInstrument,
                presence: true
              });
            }  
            this.loading = false;
          },
          (status) => {
            this.scrollToTop();
            switch(status) {
              case 400:
                this.showMessage(
                  'L\'évènement n\'existe plus ou n\'est pas valide.', 
                  'alert-danger'
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
      } else {
        this.showMessage('Le nom était vide, merci de réessayer', 'alert-warning');
      }
    },
    showPresenceModal: function(eventId) {
      this.instrumentSelected = null;
      this.currentEventId = eventId;
      this.$refs.presenceModal.show();
    },
    removePresence: function(presenceId, eventId) {
      if (confirm('Supprimer cette personne de la liste?')) {
        this.loading = true;
        api.deletePresence(
          presenceId,
          () => {
            // Success. Or assumed success.
            // Let's remove it manually from source data:
            const curEvt = this._getEventById(eventId);
            if (curEvt) {
              for (let i = 0; i < curEvt.presences.length; i++) {
                if (curEvt.presences[i].id == presenceId) {
                  // Splice that item:
                  curEvt.presences.splice(i, 1);
                  break;
                }
              }
            }
            this.loading = false;
          },
          (status) => {
            this.loading = false;
            this.scrollToTop();
            switch(status) {
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
          }
        );
      }
    },
    removeEvent: function(eventId) {
      if (confirm(`Supprimer cet évènement?\nToutes les présences associées seront également supprimées, vaut mieux être sûr de son coup. Supprimer?`)) {
          this.loading = true;
          // Reload all the data on success.
          api.deleteEvent(
            eventId,
            () => {
              this.showMessage('Evènement supprimé', 'alert-success', true);
              this.getFullPlanning();
            },
            () => {
              this.loading = false;
              this.scrollToTop();
              switch(status) {
                case 403:
                  this.$router.push({name: 'not-allowed'});
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
    editEvent: function(evt) {
      this.$refs.eventModal.show();
      setTimeout(() => {
        this.eventEditMode = true;
        this.eventToEdit = evt;
      }
      , 200);
    },
    submitAllPresences: function() {
      // Check that the name is filled up.
      // Instrument is not mandatory but will be replaced
      // with the default "uknown" one.
      // This function will use 1 million refs. Peak vue
      // expert here.
      const name = this.$refs.mainNameInput.getValue();
      if (!name) {
        this.scrollToTop();
        this.showMessage(
          'Vous devez entrer un nom dans le champ qui indique "Votre nom" où ça va pas être possible.',
          'alert-warning'
        );
        return;
      }
      this.loading = true;
      const res = {name};
      // The button is hidden if there are no events. So
      // that case should be covered up.
      // My awesome ugly array of refs to Event components comes into 
      // play now:
      res.presences = this.$refs.evtComponents.map(e => e.getValue());
      // I thought I needed to pass the res object but I actually need
      // its properties. Oh well...
      api.postAllPlanning(
        res.name, 
        res.presences,
        () => {
          // Redirect to a dedicated success page:
          this.$router.push({name: 'success'});
        },
        (status) => {
          this.loading = false;
          this.scrollToTop();
          switch(status) {
            case 503:
              this.showMessage(
                'Service temporairement indisponible, veuillez réessayer plus tard.',
                'alert-danger'
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

<style scoped>
.event-row {
  margin-bottom: 4rem; 
}
.planning-title {
  margin-bottom: 2rem;
}
.btn-huge {
  width: 100%;
  padding: 2rem !important;
  box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
  margin-bottom: 2rem;
  font-size: 1.8rem;
}
@media (max-width: 600px) {
  .btn-huge {
    font-size: 1.2rem;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
