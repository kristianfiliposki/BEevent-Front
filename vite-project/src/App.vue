<script >
import { store } from './store.js';
import axios from 'axios';

export default{
  components:{

  },
  data(){
    return{
      store,

    }
  },

  methods:{
         call(){
          axios.get("http://127.0.0.1:8000/api/dati").then(risultato=>{
            store.operators=risultato.data.operators,
            store.messages=risultato.data.messages,
            store.votes=risultato.data.votes,
            store.sponsorships=risultato.data.sponsorships,
            store.specializations=risultato.data.specializations,
            store.operator_sponsorship=risultato.data.operator_sponsorship,
            store.reviews=risultato.data.reviews;})
        },
    },
    mounted(){
      this.call();
    },
}

</script>

<template>
  <router-view></router-view>
  <div>
    <h1>Organizzare un concerto non è mai stato cosi semplice</h1>
    <div>
      <p>scegli tra i nostri numerosissimi artisti:</p>
      <ul>
        <li v-for="dato in store.reviews">
          {{ dato.comment }}
        </li>
      </ul>

    </div>
  </div>  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
