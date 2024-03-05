<script>
import axios from "axios";
import { store } from "../store.js";
export default {
  name: "Detail",
  props: ["id"],
  data() {
    return {
      detail: null,
      store 
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let url = this.store.apiUrl + "/" + this.operator_specializations; 

      axios.get(url)
        .then(response => {
          if (response.status === 200 && response.data.success) {
            this.detail = response.data.payload;

           
          const operatorID = this.detail.operator_id;
          this.detail.operator = this.store.operators.find(operator => operator.id === operatorID);

         
          const specializationID = this.detail.specialization_id;


          this.detail.specialization = this.store.specializations.find(specialization => specialization.id === specializationID);
          } else {
            console.error("Errore nella richiesta dei dettagli dell'utente.");
          }
        })
        .catch(error => {
          console.error("Errore nella richiesta:", error);
        });
    }
  }
};
</script>

<template>
<div v-for="dato in store.operator_specializations">
<h1>{{ dato.operator_id }}</h1>
<p>{{ dato.specialization_id }}</p>
</div>

<!-- <div v-if="detail.operator">
  <h2>Operatore:</h2>
  <p>Nome: {{ detail.operator.name }}</p>
  <p>Email: {{ event.operator.email }}</p>
</div>

<div v-if="detail.specialization">
  <h2>Specializzazione:</h2>
  <p>Nome: {{ detail.specialization.name }}</p>
</div> -->



</template>


<style scoped>



</style>
