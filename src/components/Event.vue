<template>
  <div class="row" :class="className">

    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <dir :class="'card no-padding ' + categoryClass">
        <div class="card-header event-header">
          <h4>{{ name }}</h4>
          <div v-if="isAuthenticated">
            <button class="btn-semi-small text-primary" title="Modifier" @click="editEvent">
              <font-awesome-icon icon="edit" />
            </button>
            <button class="btn-semi-small text-danger" title="Supprimer" @click="removeEvent">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">Date: {{ formattedDate }}</h5>
          <p class="card-text">{{ description }}</p>
        </div>
      </dir>
    </div>

    <div class="col col-lg-1 d-none d-sm-none d-md-none d-lg-block"></div>

    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h5>Présences</h5>
        </div>
        <div class="card-body">

           <div class="row">

            <div class="col-12 bg-secondary mb-2"
              v-if="!isAuthenticated">
              <div class="form-check presence-checkbox">
                <input type="checkbox"  
                  :id="'chkboxPres' + this.uid" 
                  class="form-check-input"
                  v-model="present">
                <label :for="'chkboxPres' + this.uid" 
                  class="form-check-label text-light">
                  <strong>Présent!</strong>
                </label>
              </div>
              <div class="form-group">
                <DkAutocomplete :suggestions="instruments"
                  placeholder="Votre instrument..."
                  :selected="selectedInstrument"
                  @item-selected="instrumentSelected">
                </DkAutocomplete>
              </div>
            </div>
            <div v-else class="col-sm-12 col-xs-12 col-lg-4 col-md-6 pb-2">
              <button class="btn btn-primary" @click="addPresence">
                <font-awesome-icon icon="plus-circle" />
                Ajouter
              </button>
            </div>

            <div class="col col-sm-12 col-xs-12 col-md-6 col-lg-4"
              v-for="(instrumentGroup, index) in orderedPresences" 
              :key="index">
              <strong>{{ instrumentGroup.name }}</strong>
              <ul class="presence-list">
                <li v-for="presence in instrumentGroup.data" :key="presence.id">
                  <span>{{ presence.name }}</span>
                  <button 
                    v-if="isAuthenticated"
                    class="btn-semi-small text-danger" 
                    :data-pid="presence.id" 
                    @click="removePresence"
                    title="Effacer">
                    <font-awesome-icon icon="trash" size="xs" />
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>
        <div class="card-footer">
          Total présent.e.s: <span class="badge badge-pill badge-info">{{ totalPresences }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DkAutocomplete from '@/components/DkAutocomplete.vue';
import instruments, { instrumentCodes } from '@/instruments';

export default {
  name: 'Event',
  props: {
    isAuthenticated: Boolean,
    id: Number,
    name: String,
    category: Number,
    description: String,
    eventDate: Date,
    selectedInstrument: String,
    presences: Array,
    className: String
  },
  components: {
    DkAutocomplete
  },
  data: function() {
    return {
      categoryClasses: [
        'text-white bg-secondary',
        'text-white bg-dark',
        'bg-light'
      ],
      // Can't I just actually use this._uid?
      uid: null,
      present: false,
      instruments,
      internalSelectedInstrument: ''
    };
  },
  mounted: function() {
    this.uid = this._uid;
  },
  methods: {
    addPresence: function() {
      // We have to send the event ID along.
      this.$emit('add-presence', this.id);
    },
    removePresence: function(e) {
      this.$emit(
        'remove-presence', 
        e.currentTarget.getAttribute('data-pid'),
        this.id
      );
    },
    removeEvent: function() {
      this.$emit('remove-event', this.id);
    },
    editEvent: function() {
      this.$emit(
        'edit-event', 
        {
          id: this.id,
          name: this.name,
          category: this.category,
          description: this.description,
          eventDate: this.eventDate
        }
      );
    },
    instrumentSelected({code}) {
      this.internalSelectedInstrument = code;
    },
    getValue: function() {
      return {
        event_id: this.id,
        presence: this.present,
        instrument_code: this.internalSelectedInstrument || instruments[0].code
      };
    }
  },
  computed: {
    categoryClass: function() {
      switch(this.category) {
        case 1:
        case 2:
          return this.categoryClasses[this.category];
        default:
          return this.categoryClasses[0];
      }
    },
    formattedDate: function() {
      if (this.eventDate) {
        if (this.eventDate.toLocaleDateString) {
          return this.eventDate.toLocaleDateString();
        } else {
          // Months and days won't be padded, this date
          // will look ugly. But hopefully people have
          // toLocaleDateString().
          return [
            this.eventDate.getDate(), 
            this.eventDate.getMonth() + 1, 
            this.eventDate.getFullYear()
          ].join('/');
        }
      }
      return '';
    },
    orderedPresences: function() {
      // Computed properties are cached so this should
      // be fine (lol).
      // Let's create an object that has instruments as keys.
      // And another one with instruments in alphabetical order.
      // I think ES6 has a Map object but I'm not going to use
      // it because I'm pretty sure Webpack won't polyfill it
      // and IE 11 has wonky support of it.
      // I need an array with ordered objects in it with
      // properties name and data, where data is an array
      // of presences.
      const res = [];
      if (this.presences) {
        this.presences.forEach(p => {
          // We should have the following properties:
          // id, name, instrument_code, presence
          // -> We need to resolve the instrument code to
          // an instrument.
          // I made a terrible code-to-name lookup table.
          // If the person is marked as absent we completely
          // ignore them here.
          if (p.presence) {
            let found = false;
            for (let instr of res) {
              if (instr.code === p.instrument_code) {
                instr.data.push(p);
                found = true;
              }
            }
            if (!found) {
              res.push(
                {
                  code: p.instrument_code,
                  name: instrumentCodes[p.instrument_code],
                  data: [p]
                }
              );
            }
          }
        });
        // Now order everything by name:
        res.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      }
      return res;
    },
    totalPresences: function() {
      if (this.presences) return this.presences.filter(p => p.presence).length;
      else return 0;
    }
  }
}
</script>

<style>
.presence-list li, .event-header {
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #999;
  padding-top: 0.5rem;
}
.presence-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.no-padding {
  padding: 0;
  margin: 0;
}
.presence-checkbox {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}
.btn-super-small {
  padding: 0;
  margin: 0;
  background-color: #ebedeb;
  line-height: 10px;
  border: 1px solid silver;
}
.btn-semi-small {
  padding: 2px 0px;
  margin: 0px;
  border: none;
  background-color: transparent;
}
</style>
