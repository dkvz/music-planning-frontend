<template>
  <div class="row">

    <div :class="'card col col-lg-3 col-md-4 col-ms-12 ' + categoryClass">
      <div class="card-header">
        <span>{{ name }}</span>
        <div class="float-right" v-if="isAuthenticated">
          <button class="btn btn-primary" title="Modifier">
            <font-awesome-icon icon="edit" />
          </button>
          <button class="btn btn-primary" title="Supprimer">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">Date: {{ formattedDate }}</h5>
        <p class="card-text">{{ description }}</p>
      </div>
    </div>

    <div class="col col-lg-1 col-md-1 d-none d-sm-none d-md-block"></div>

    <div class="col border-secondary">
      <h3>Présences</h3>
      <div class="row">

        <div class="col col-sm-12 col-lg-3 col-md-4 bg-secondary text-white"
          v-if="!isAuthenticated">
          <div class="form-group">
            <input type="checkbox" 
              class="form-check-input" 
              :id="'chkboxPres' + this.uid" 
              v-model="present">
            <label class="form-check-label" :for="'chkboxPres' + this.uid">
              Présent!
            </label>
          </div>
          <div class="form-group">
            <DkAutocomplete :suggestions="instruments"
              label="Instrument"
              placeholder="Votre instrument..."
              :selected="selectedInstrument">
            </DkAutocomplete>
          </div>
        </div>
        <div v-else class="col col-sm-12 col-lg-3 col-md-4 bg-secondary text-white">
          <!-- Button to add a person when authenticated -->
        </div>

        <div class="col col-sm-12 col-lg-2 col-md-3"
          v-for="instrumentGroup in orderedPresences" 
          :key="instrumentGroup.code">
          <h5>{{ instrumentGroup.name }}</h5>
          <ul class="presence-list">
            <li v-for="presence in instrumentGroup.data" :key="presence.id">

            </li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import DkAutocomplete from '@/components/DkAutocomplete.vue';
import { instrumentCodes } from '@/instruments';

export default {
  name: 'Event',
  props: {
    isAuthenticated: Boolean,
    id: Number,
    name: String,
    category: Number,
    description: String,
    eventDate: Date,
    instruments: Array,
    selectedInstrument: String,
    presences: Array
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
      present: false
    };
  },
  mounted: function() {
    this.uid = this._uid;
  },
  methods: {

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
.presence-list li {
  display: flex;
  justify-content: space-between;
}
</style>
