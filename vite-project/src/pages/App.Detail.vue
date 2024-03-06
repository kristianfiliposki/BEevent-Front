<script>
import { store } from '../store.js';
import { computed } from 'vue';

export default {
  name: 'AppDetail',
  data() {
    return {
      store,
      showTextarea: false,
      showTextarea2: false
    };
  },
  methods: {
    createTextarea: function() {
      this.showTextarea = true;
    },
    createTextarea2: function() {
      this.showTextarea2 = true;
    }
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
  <div class="container" v-if="operator">
    <div class="card">
      <h1>Dettagli di {{ operator.name }}</h1>
      <h2>{{ operator.description }}</h2>
      <p>{{ operator.address }}</p>
      <p>In attività dal :{{ operator.foundation_year }}</p>
      <p>recapito telefonico:{{ operator.phone }}</p>
      <h4>Prezzo di ingaggio : {{ operator.engagement_price }}</h4>
    </div>

  </div>
  <div class="btnCont">
    <button class="btn" @click="createTextarea">
      <H3>CONTATTA</H3>
    </button>

    <button class="btn" @click="createTextarea2">
      <H3>SCRIVI UNA RECENSIONE</H3>
    </button>
  </div>

<div class="textareacontainer">
  <div v-if="showTextarea">
    <textarea class="text" rows="4" cols="50" placeholder="Scrivi il tuo messaggio qui..."></textarea>
  </div>
  <div v-if="showTextarea2">
    <textarea class="text2" rows="4" cols="50" placeholder="Scrivi il tuo messaggio qui..."></textarea>
  </div>
</div>

</template>



<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: 4%;
}

.card {
  background-color: rgba(0, 0, 0, 0.121);
  padding: 2% 2% 2% 2%;

}

.btnCont {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn{
  margin: 2% 2% 2% 2%;
}
.card h1{
 color: white;
}
.card h2{
  color: white;
}
.card p{
  color: white;
}
.card h4{
  color: white;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: #774caf;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #45a049;
}

.btn:active {
  background-color: #3e8e41;
}
.text{
  width:32rem;
  height:15rem;
  margin-left: 5%;
  border: 1px solid  rgba(255, 255, 255, 0.582);
  background-color: rgba(255, 255, 255, 0.582) ;
}
textarea{
  border-radius: 0,6rem;

}
.text2{
  width:32rem;
  height:15rem;
  margin-left: 5%;
  border: 1px solid  rgba(255, 255, 255, 0.582);
  background-color: rgba(255, 255, 255, 0.582) ;
}
textarea{
  border-radius: 0.6rem;

}
.textareacontainer{
  display: flex;
  justify-content: space-around;
  align-items: center;
}




</style>
