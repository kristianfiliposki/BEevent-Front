<script>
import { store } from '../store';
export default {
  data() {
    return {
      store,
      specialization:"",
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
  },
}
</script>
<template>
  <section id="fakeBody" class="wrapper">
    <div class="card-css" v-for="operator in store.operators" :key="operator.id">
      <h3>{{ operator.name }}</h3>
      <img :src="'/public/img/' + operator.image" alt="img" class="img-operator">
      <h4>{{ operator.description }}</h4>
      <h5>{{ operator.engagement_price }}</h5>
      <h5>{{ operator.phone }}</h5>

      <!-- Trova la corrispondente specializzazione per l'operatore -->
      <div v-for="operatorSpecialization in getOperatorSpecializations(operator.id)" :key="operatorSpecialization.id">
        <p>{{ operatorSpecialization.specialization.name }}</p>
      </div>
    </div>
  </section>



</template>
<style scoped>
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