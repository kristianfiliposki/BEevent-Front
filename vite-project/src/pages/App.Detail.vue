<script>
import { store } from '../store.js';
import { computed } from 'vue';
import axios from 'axios';

export default {
  name: 'AppDetail',
  data() {
    return {
      store,
      showTextarea: false,
      showTextarea2: false,
      showforms: false,
      showforms2: false,
      votes: []
    };
  },
  methods: {
    toggleTextarea: function () {
      this.showTextarea = !this.showTextarea;
      this.showforms = this.showTextarea;
    },
    toggleTextarea2: function () {
      this.showTextarea2 = !this.showTextarea2;
      this.showforms2 = this.showTextarea2;
    },
    getVotes: function () {
      axios.get("http://127.0.0.1:8000/api/votes").then(risultato => {
        for (let i = 0; i < risultato.data.length; i++) {
          this.votes.push(
            {
              id: risultato.data[i].id,
              vote: risultato.data[i].vote
            }
          )
        }
        console.log(this.votes);
      })
    },
    getOperatorSpecializations(operatorId) {
      return this.store.operator_specializations
        .filter(os => os.operator_id === operatorId)
        .map(os => ({
          id: os.specialization_id,
          specialization: this.store.specializations.find(s => s.id === os.specialization_id),
        }));
    }
  },
  computed: {
    operator() {
      const operatorId = parseInt(this.$route.params.id); // Ottieni l'ID dell'operatore dall'URL
      return this.store.operators.find(operator => operator.id === operatorId); // Trova l'operatore corrispondente nell'array degli operatori
    },
    filteredOperators() {
      return this.store.operators.filter(operator => {
        const operatorSpecializations = this.getOperatorSpecializations(operator.id);
        return operatorSpecializations.some(os => os.specialization.name === this.selectedSpecialization);

      });
    }
  },
  mounted() {
    this.getVotes();
  }
};
</script>

<template>
  <div class="container" v-if="operator">
    <div class="card">
      <h1>Dettagli di {{ operator.name }}</h1>
      <img id="operatorImg" :src="'http://127.0.0.1:8000/storage/' + operator.file_path" alt="img">
      <h2>{{ operator.description }}</h2>
      <p>{{ operator.address }}</p>
      <p>In attività dal :{{ operator.foundation_year }}</p>
      <p>recapito telefonico:{{ operator.phone }}</p>
      <h4>Prezzo di ingaggio : {{ operator.engagement_price }}</h4>
      <div>
        <div id="flexino" v-for="operatorSpecialization in getOperatorSpecializations(operator.id)"
          :key="operatorSpecialization.id">
          <img class="specimg" :src="'../../public/img/' + operatorSpecialization.specialization.background_image"
            alt="img">
        </div>
      </div>
    </div>

  </div>
  <div class="btnCont">
    <button class="btn" @click="toggleTextarea">
      <h3>{{ showTextarea ? 'ANNULLA' : 'CONTATTA' }}</h3>
    </button>

    <button class="btn" @click="toggleTextarea2">
      <h3>{{ showTextarea2 ? 'ANNULLA' : 'SCRIVI UNA RECENSIONE' }}</h3>
    </button>
  </div>

  <div class="textareacontainer">
    <form v-if="showforms" action="http://127.0.0.1:8000/message" method="GET">
      <input name="operator_id" type="hidden" v-model="operator.id">
      <textarea class="text" name="text" cols="50" rows="4" placeholder="Scrivi il tuo messaggio qui..."></textarea>
      <input class="inputShow" name="author" type="text" placeholder="Inserisci il tuo nome">
      <input class="inputShow" name="user_email" type="email" placeholder="Inserisci la tua email">
      <input id="invisiButton" type="submit" value="Invia">
    </form>


    <form v-if="showforms2" action="http://127.0.0.1:8000/review" method="GET">
      <input name="operator_id" type="hidden" v-model="operator.id">
      <textarea class="text2" name="comment" cols="50" rows="4" placeholder="Scrivi la tua recensione qui..."></textarea>
      <input class="inputShow" name="author" type="text" placeholder="Inserisci il tuo nome">
      <input class="inputShow" name="user_email" type="email" placeholder="Inserisci la tua email">
      <select class="inputShow" name="vote_id">
        <option v-for="vote in votes" :value="vote.id">{{ vote.vote }}</option>
      </select>
      <input id="invisiButton2" type="submit" value="Invia">
    </form>
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

.btn {
  margin: 2% 2% 2% 2%;
}

.card h1 {
  color: white;
}

.card h2 {
  color: white;
}

.card p {
  color: white;
}

.card h4 {
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

.text {
  width: 80%;
  height: 5rem;
  margin-left: 5%;
  border: 1px solid rgba(255, 255, 255, 0.582);
  background-color: rgba(255, 255, 255, 0.582);

}

textarea {
  border-radius: 0, 6rem;

}

#operatorImg {
  width: 35vw;
  max-height: 80vh;
  object-fit: cover;
  border-radius: 20px;
  -webkit-box-shadow: -10px 0px 13px -7px #ffcc00, 10px 0px 13px -7px #ffcc00, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
  box-shadow: -10px 0px 13px -7px #ffcc00, 10px 0px 13px -7px #ffcc00, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
}

.text2 {
  width: 80%;
  height: 5rem;
  margin-left: 5%;
  border: 1px solid rgba(255, 255, 255, 0.582);
  background-color: rgba(255, 255, 255, 0.582);
}

textarea {
  border-radius: 0.6rem;

}

.textareacontainer {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  min-height: 10vh;
}

/* Stile per l'input email */
.inputShow {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border-radius: 20px;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s;
  margin-left: 4%;
  margin-top: 2%;

}

/* Stile per l'effetto al passaggio del mouse */
.inputShow:hover,
.inputShow:focus {
  border-color: #6c5ce7;
  /* Cambia il colore del bordo al passaggio del mouse o al focus */
}

/* Stile per l'effetto di transizione */
.inputShow:focus {
  box-shadow: 0 0 5px rgba(108, 92, 231, 0.5);
  /* Aggiunge una leggera ombra al focus */
}

form {
  display: flex;
  flex-direction: column;
  margin: 0.4rem;

}

#invisiButton {
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
  width: 20%;
  transition: background-color 0.3s;
  margin-left: 86%;
}

#invisiButton:hover {
  background-color: #45a049;
}

#invisiButton:active {
  background-color: #3e8e41;
}

#invisiButton2 {
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
  width: 20%;
  margin-left: 86%;
  transition: background-color 0.3s;
}

#invisiButton2:hover {
  background-color: #45a049;
}

#invisiButton2:active {
  background-color: #3e8e41;
}

.specimg {
  width: 10%;
  margin: 1% 3% 1% 1%;
  border-radius: 12em;
}

#flexino {
  display: inline;
}

@media only screen and (max-width: 768px) {
  #invisiButton {
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
  width: 20%;
  transition: background-color 0.3s;
  margin-left: 83%;
}
#invisiButton2 {
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
  width: 20%;
  margin-left: 80%;
  transition: background-color 0.3s;
}
}
@media only screen and (max-width: 468px){
  #navbar {
  width: 118%;
  height: 20vh;
  background-color: #090021;
  display: flex;
  align-items: center;
  justify-content: space-between;
  

}
.textareacontainer {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  min-height: 10vh;
  height: 43vh;
}
}
</style>
