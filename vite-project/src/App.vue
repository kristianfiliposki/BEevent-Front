<script >
import { store } from './store.js';
import axios from 'axios';
import AppPresentation from "./components/AppPresentation.vue"

export default {
  components: {
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
        store.dati = risultato.data
      })
    },
  },
  mounted() {
    this.call();
  },
}

</script>

<template>
  <div class="navbar"></div>
  <AppPresentation />


  <div class="container">
    <p>scegli tra i nostri numerosissimi artisti:</p>


    <ul>
      <li v-for="dato in store.dati">
        {{ dato }}
      </li>
    </ul>

  </div>
</template>

<style scoped>
.navbar {
  height: 8em;
  width: 100%;
  background-color: #01a7aa;
  position: fixed;

}
</style>
