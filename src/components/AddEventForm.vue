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
        v-model="name">
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
    <div>
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
    editMode: Boolean
  },
  data: function() {
    return {
      name: '',
      eventId: -1,
      saving: false,
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
      const evt = {
        name: this.name,
        category: this.category,
        description: this.description,
        eventDate: this.date
      };
      if (this.eventId > 0) {
        evt.eventId = this.eventId;
      }
      this.$emit('event-submit', evt);
    },
    cancel: function() {
      this.$emit('event-cancel');
    },
    setValues: function(eventId, name, category, description, eventDate) {
      this.eventId = eventId;
      this.name = name;
      this.category = category;
      this.description = description;
      this.setDate(eventDate);
    },
    resetForm: function() {
      this.eventId = -1;
      this.name = '';
      this.category = 1;
      this.description = '';
      this.setDate(new Date());
    },
    setDate(date) {
      this.date = date;
      this.$refs.dateInput.value = date.toLocaleDateString();
    }
  },
  mounted: function() {
    this.setDate(new Date());
  },
  watch: {
    editMode: function(newVal, oldVal) {
      if (oldVal && !newVal) {
        // Reset the form:
        this.resetForm();
      }
    }
  }
}
</script>

<style>

</style>
