<script>
import { store } from '../store';
import Appcard from '../components/Appcard.vue';
export default{
    name: "AppHomepage",
    components: { 
      Appcard,
     },
    data(){
        return{
          store,
        }
    },
    methods:{
       search(){
        // Ottenere un array di elementi con lo stesso ref "myDiv"
        let divElements = this.$refs.category;

        // Ora puoi iterare attraverso gli elementi e fare qualcosa con ognuno di essi
        if  (
              store.operators.name.forEach(operator => {
                operator==divElements.innerText
              })
            ){
              console.log(
                store.operators.name.forEach(operator => {
                operator==divElements.innerText
              })
              )
            };
    },
    mounted(){  
        console.log("Componente Header caricato");
    },
  }
}
</script>

<template>
	<div id="welcome">
      <select name="" id="selettore">
          <option value="" ref="category" @click="search()">Giulia Bianchi</option>
          <option value="" ref="category" @click="search()">cacca</option>
      </select>
	</div>
  <Appcard/>
  <router-view></router-view>
  </template>
<style scoped>

#welcome{
  margin-top:2em ;
  width: 100%;
  position: fixed;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
}
#welcome h1{
  color: #FD129E;
}
#welcome h2{
  color: #F6FB01;
}

</style>