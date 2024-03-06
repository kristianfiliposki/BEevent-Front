<script>
import { store } from '../store.js';
import { computed } from 'vue';

export default {
  name: 'AppDetail',
  data() {
    return {
      store,
    };
  },
  computed: {
    operator() {
      const operatorId = parseInt(this.$route.params.id); // Ottieni l'ID dell'operatore dall'URL
      return this.store.operators.find(operator => operator.id === operatorId); // Trova l'operatore corrispondente nell'array degli operatori
    },
  },
};
</script>
<template>
<div v-if="operator">
    <h2>Dettagli di {{ operator.name }}</h2>
    <h3>Descrizione: {{ operator.description }}</h3>
    <h4>Prezzo di ingaggio : {{ operator.engagement_price }}</h4>

  </div>
</template>



<style scoped>



</style>
