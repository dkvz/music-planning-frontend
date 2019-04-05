<template>
  <div class="row" :class="className">

    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <dir :class="'card no-padding ' + categoryClass">
        <div class="card-header event-header">
          <h5>{{ name }}</h5>
          <div v-if="isAuthenticated">
            <button class="btn btn-primary" title="Modifier">
              <font-awesome-icon icon="edit" />
            </button>
            <button class="btn btn-danger" title="Supprimer">
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

    <div class="col col-lg-1 col-md-1 d-none d-sm-none d-md-block"></div>

    <div class="col-lg-8 col-md-7 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          Présences
        </div>
        <div class="card-body">

           <div class="row">

            <div class="col col-sm-12 col-xs-12 col-lg-5 col-md-6 bg-light"
              v-if="!isAuthenticated">
              <div class="form-check presence-checkbox">
                <input type="checkbox"  
                  :id="'chkboxPres' + this.uid" 
                  class="form-check-input"
                  v-model="present">
                <label :for="'chkboxPres' + this.uid" 
                  class="form-check-label">
                  Présent!
                </label>
              </div>
              <div class="form-group">
                <DkAutocomplete :suggestions="instruments"
                  placeholder="Votre instrument..."
                  :selected="selectedInstrument">
                </DkAutocomplete>
              </div>
            </div>
            <div v-else class="col col-sm-12 col-xs-12 col-lg-3 col-md-4">
              <button class="btn btn-primary" @click="addPresence">
                <font-awesome-icon icon="plus-circle" />
                Ajouter
              </button>
            </div>

            <div class="col col-sm-12 col-lg-2 col-md-3"
              v-for="instrumentGroup in orderedPresences" 
              :key="instrumentGroup.code">
              <h5>{{ instrumentGroup.name }}</h5>
              <ul class="presence-list">
                <li v-for="presence in instrumentGroup.data" :key="presence.id">
                  <span>{{ presence.name }}</span>
                  <button class="btn btn-danger" :data-pid="presence.id" @click="removePresence">
                    <font-awesome-icon icon="trash" />
                  </button>
                </li>
              </ul>
            </div>

          </div>

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
      instruments
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
      this.$emit('remove-presence', Number(e.target.getAttribute('data-pid')));
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
        });
        // Now order everything by name:
        res.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      }
      return res;
    }
  }
}
</script>

<style>
.presence-list li, .event-header {
  display: flex;
  justify-content: space-between;
}
.no-padding {
  padding: 0;
  margin: 0;
}
.presence-checkbox {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}
</style>
