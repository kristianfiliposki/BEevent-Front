<script>
import { store } from './store.js';
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader

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
  <router-view></router-view>
  <AppHeader />
  <section id="welcome">
    <h1>Ti diamo il benvenuto su Heavy Planning!</h1>
    <h2>il nostro sito di gestione ed organizzazione di eventi!</h2>
    <p>Dai un'occhiata ad i nostri artisti!</p>
  </section>
  <section id="fakeBody">
      <div id="card-css" v-for="dato in store.operators">
        <h3>{{ dato.name }}</h3>
        <img src="" alt="img">
        <h4>{{ dato.description }}</h4>
        <div id="card_space">
          <h5>{{ dato.engagement_price }}</h5>
          <h5>{{ dato.phone }}</h5>
        </div> 
      </div>
  </section>
</template>

<style scoped>
#welcome{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#welcome h1{
  color: #FD129E;
}
#welcome h2{
  color: #F6FB01;
}
#fakeBody{
  width: 100vw;
  height: 80vh;
}

</style>
