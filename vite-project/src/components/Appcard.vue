<script>
import { store } from '../store';
export default {
  data() {
    return {
      store,
      specialization:"",
      visible:true,
    }
  },
  methods: {
    getOperatorSpecializations(operatorId) {
      // Filtra le specializzazioni corrispondenti all'operatore
      const operatorSpecializations = this.store.operator_specializations
        .filter(os => os.operator_id === operatorId)
        .map(os => ({
          id: os.specialization_id,
          specialization: this.store.specializations.find(s => s.id === os.specialization_id),
        }));

      return operatorSpecializations;
    },
    filterSpec(){
      let selector=this.$refs.selector;
      let specializzatione=this.$refs.specializzatione;
      /* se la specializzazione dell'operatore iclude il valore del selettore */
      if (
        specializzatione.innerText.include(selector.innerText)
      ) 
      /* allora... */
      {
        this.visible=true;
      }
      else{
        this.visible=false;
      }
    
      console.log(this.visible)
      return this.visible;
    }

  },
}
</script>
<template>

  <div id="welcome">
    <select name="specializzazioni" id="selettore">
      <option ref="selector" :value="dato.name" v-for="dato in store.specializations " @click="">{{ dato.name }}</option>
    </select>
  </div>



  <section id="fakeBody" class="wrapper" ref="card" v-show="this.visible">
    <div class="card-css" v-for="operator in store.operators" :key="operator.id">
      <h3>{{ operator.name }}</h3>
      <img :src="'/public/img/' + operator.image" alt="img" class="img-operator">
      <h4>{{ operator.description }}</h4>
      <h5>{{ operator.engagement_price }}</h5>
      <h5>{{ operator.phone }}</h5>

      <!-- Trova la corrispondente specializzazione per l'operatore -->
      <div v-for="operatorSpecialization in getOperatorSpecializations(operator.id)" :key="operatorSpecialization.id">
        <p ref="specializzazione">{{ operatorSpecialization.specialization.name }}</p>
      </div>
    </div>
  </section>



</template>
<style scoped>
#welcome {
  margin-top: 2em;
  width: 100%;
  position: fixed;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
}

#welcome h1 {
  color: #FD129E;
}

#welcome h2 {
  color: #F6FB01;
}

#fakeBody {
  width: 100vw;
  height: 60vh;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2em;
  flex-direction: column;
}

.card-css {
  width: calc((100% / 3));
  background-color: rgb(165, 164, 164);
  border-radius: 15px;
  margin: 9px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 96%;
}

#card-css h3 {
  border-bottom: 3px solid rgb(143, 141, 141);
}

.img-operator {
  min-height: 75%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>