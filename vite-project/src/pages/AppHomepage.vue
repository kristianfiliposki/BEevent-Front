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
    }
}
</script>

<template>
	<div id="welcome">
      <select name="" id="selettore">
          <option value="">SELEZIONA PER SPECIALITA'</option>
          <option value="">NON SO CHE ALTRO SCRIVERCI</option>
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