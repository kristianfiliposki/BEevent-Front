<script>
import axios from "axios";
import { store } from "../store.js"; // Importa il file store.js

export default {
  name: "Detail",
  props: ["id"],
  data() {
    return {
      detail: null,
      store // Aggiungi store come dato del componente
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let url = this.store.apiUrl + "/" + this.operator_specializations.operator_id; // Utilizza l'URL dallo store

      axios.get(url)
        .then(response => {
          if (response.status === 200 && response.data.success) {
            this.event = response.data.payload;
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
</div>

</template>


<style scoped>



</style>