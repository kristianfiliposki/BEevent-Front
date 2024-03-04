<script>
import { store } from '../store';
export default {
  data() {
    return {
      store,
      selectedSpecialization: '',
    };
  },
  computed: {
    filteredOperators() {
      return this.store.operators.filter(operator => {
        const operatorSpecializations = this.getOperatorSpecializations(operator.id);
        return operatorSpecializations.some(os => os.specialization.name === this.selectedSpecialization);
      });
    },
  },
  methods: {
    getOperatorSpecializations(operatorId) {
      return this.store.operator_specializations
        .filter(os => os.operator_id === operatorId)
        .map(os => ({
          id: os.specialization_id,
          specialization: this.store.specializations.find(s => s.id === os.specialization_id),
        }));
    },
    filterSpec() {
      // Chiamato quando la selezione cambia
      // Puoi gestire l'aggiornamento qui se necessario
      console.log('Selezione cambiata:', this.selectedSpecialization);
    },
  },
};
</script>

<template>
  <div id="welcome">
    <label for="selettore" class="bebas-neue-regular">Seleziona una specializzazione:</label>
    <!-- Utilizza v-model per collegare direttamente la select a selectedSpecialization -->
    <select name="specializzazioni" id="selettore" v-model="selectedSpecialization">
      <option :value="dato.name" v-for="dato in store.specializations" :key="dato.id">{{ dato.name }}</option>
    </select>
  </div>

  <section id="fakeBody" class="wrapper" ref="card">
    <!-- Utilizza filteredOperators solo quando è stata selezionata una specializzazione -->
    <div class="card-css" v-for="operator in (selectedSpecialization ? filteredOperators : store.operators)" :key="operator.id">
      <h3>{{ operator.name }}</h3>
      <img :src="'/public/img/' + operator.image" alt="img" class="img-operator">
      <h4>{{ operator.description }}</h4>
      <h5>{{ operator.engagement_price }}</h5>
      <h5>{{ operator.phone }}</h5>

      <!-- Trova la corrispondente specializzazione per l'operatore -->
      <div v-for="operatorSpecialization in getOperatorSpecializations(operator.id)" :key="operatorSpecialization.id">
        <p ref="specializzazione_operatore">{{ operatorSpecialization.specialization.name }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
#welcome {
  margin-top: 2em;
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  color: white;
  font-size: 1.2em;
}
.bebas-neue-regular {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  margin: 0.6em;
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