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
	  <h1>Ti diamo il benvenuto su Heavy Planning!</h1>
	  <h2>il nostro sito di gestione ed organizzazione di eventi!</h2>
    <div>

      <p>Dai un'occhiata ad i nostri artisti!</p>
  
      <select name="" id="selettore">
          <option value="">cacca</option>
          <option value="">cacca</option>
      </select>
    </div>

	</div>
  <Appcard/>
  </template>
<style scoped>

#welcome{
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