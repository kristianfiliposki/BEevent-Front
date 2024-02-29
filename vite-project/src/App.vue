<script >
import AppHeader from './components/AppHeader.vue';
import { store } from './store.js';
import axios from 'axios';

export default{
  components:{
    AppHeader,

  },
  data(){
    return{
      store,

    }
  },

  methods:{
         call(){
          axios.get("http://127.0.0.1:8000/api/dati").then(risultato=>{
            store.dati=risultato.data;
            console.log(store.dati);})
        },
    },
    mounted(){
      this.call();
    },
}

</script>

<template>
  <AppHeader/>
  <div>
    <h1>Organizzare un concerto non è mai stato cosi semplice</h1>
    <div>
      <p>scegli tra i nostri numerosissimi artisti:</p>
      <ul>
        <li v-for="dato in store.dati ">
          {{ dato }}
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
