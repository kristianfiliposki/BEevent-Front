<script>
import { store } from './store.js';
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppPresentation from './components/AppPresentation.vue';

export default {
  components: {
    AppHeader,
    AppPresentation,

  },
  data() {
    return {
      store,

    }
  },

  methods: {
    call() {

      axios.get("http://127.0.0.1:8000/api/dati").then(risultato => {
        store.operators = risultato.data.operators,
          store.messages = risultato.data.messages,
          store.votes = risultato.data.votes,
          store.sponsorships = risultato.data.sponsorships,
          store.specializations = risultato.data.specializations,
          store.operator_sponsorship = risultato.data.operator_sponsorship,
          store.reviews = risultato.data.reviews;
      })
    },
  },
  mounted() {
    this.call();
  },
}
</script>

<template>
  <AppHeader />

  <router-view></router-view>
</template>

<style scoped></style>
