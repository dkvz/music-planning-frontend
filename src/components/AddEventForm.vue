<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="dateInput">Date de l'évènement</label>
      <input type="date" class="form-control" id="dateInput" ref="dateInput">
    </div>
    <div class="form-group">
      <label for="categorySelect">Catégorie</label>
      <select class="form-control" id="categorySelect" v-model="category">
        <option 
          v-for="categ in categories" 
          v-bind:value="categ.id"
          v-bind:key="categ.id">
            {{ categ.name }}
          </option>
      </select>
    </div>
    <div class="form-group">
      <label for="eventNameInput">Nom de l'évènement</label>
      <input type="text" 
        class="form-control" 
        id="eventNameInput" 
        placeholder="Entrer le nom de l'évènement"
        v-model="name"
        required>
    </div>
    <div class="form-group">
      <label for="descriptionTextArea">Description</label>
      <textarea class="form-control" 
        id="descriptionTextArea" 
        rows="3"
        placeholder="Courte description de l'évènement"
        v-model="description">
      </textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-primary mr-2" type="submit">Enregistrer</button>
      <button class="btn btn-warning" @click="cancel">Annuler</button>
    </div>
  </form>
</template>

<script>
// I think we can't use v-model with date input.
// Going to have to use refs.

// We'll use the editMode prop to signal we're editing.
export default {
  name: 'AddEventForm',
  props: {
    planningId: String,
    editMode: Boolean,
    event: Object
  },
  data: function() {
    return {
      name: '',
      id: -1,
      category: 1,
      categories: [
        {id: 1, name: 'Garde'},
        {id: 2, name: 'Indépendance'}
      ],
      description: '',
      date: null
    }
  },
  methods: {
    submitForm: function() {
      // I could probably v-model the date as a string
      // as the date input outputs YYYY-MM-DD, but I'm 
      // going to use refs for now.
      const evt = {
        name: this.name,
        category: this.category,
        description: this.description,
        //eventDate: this.date
        eventDate: this.getDate()
      };
      if (this.id > 0) {
        evt.id = this.id;
      }
      this.$emit('event-submit', evt);
    },
    cancel: function() {
      this.$emit('event-cancel');
    },
    setValues: function(id, name, category, description, eventDate) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.description = description;
      this.setDate(eventDate);
    },
    resetForm: function() {
      this.id = -1;
      this.name = '';
      this.category = 1;
      this.description = '';
      this.setDate(new Date());
    },
    setDate(date) {
      this.date = date;
      if (this.$refs.dateInput) 
        this.$refs.dateInput.value = date.toISOString().substr(0, 10);
    },
    getDate() {
      return new Date(
        this.$refs.dateInput ? this.$refs.dateInput.value : undefined
      );
    }
  },
  mounted: function() {
    this.setDate(new Date());
  },
  watch: {
    editMode: function(newVal) {
      if (!newVal) {
        // Reset the form:
        this.resetForm();
      }
    },
    event: function(newVal) {
      if (newVal) {
        // Set the values:
        if (newVal.event_id) this.id = newVal.event_id;
        else if (newVal.id) this.id = newVal.id;
        this.name = newVal.name;
        this.category = newVal.category;
        this.description = newVal.description;
        if (newVal.eventDate) this.setDate(newVal.eventDate);
        else if (newVal.event_date) this.setDate(newVal.event_date);
        else this.setDate(new Date());
      }
    }
  }
}
</script>

<style>

</style>
