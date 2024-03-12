<script>
import { store } from '../store';
import moment from 'moment';

export default {
  data() {
    return {
      store,
      selectedSpecialization: null,
    };
  },
  computed: {
    /* filtra gli operatori a secoonda dellle specializzazioni */
    filteredOperators() {
      return this.store.operators.filter(operator => {
        const operatorSpecializations = this.getOperatorSpecializations(operator.id);
        return operatorSpecializations.some(os => os.specialization.name === this.selectedSpecialization);

      });
    },
    operatorsWithActiveSponsorships() {
      return this.store.operators.filter(operator => {
        return this.isOperatorSponsored(operator.id) &&
          this.activeSponsorships(operator.id).length > 0;
      });
    },
    operatorReviews() {
      const operatorReviews = {};
      this.store.reviews.forEach(review => {
        if (!operatorReviews[review.operator_id]) {
          operatorReviews[review.operator_id] = [];
        }
        operatorReviews[review.operator_id].push(review.vote_id);
      });
      return operatorReviews;
    },
    operatorAverageRatings() {
      const averageRatings = {};
      Object.keys(this.operatorReviews).forEach(operatorId => {
        const ratings = this.operatorReviews[operatorId];
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);
        const average = sum / ratings.length;
        averageRatings[operatorId] = average.toFixed(2); // Arrotonda la media a 2 decimali
      });
      return averageRatings;
    },
    sortedOperators() {
      const operators = this.selectedSpecialization ? this.filteredOperators : this.store.operators;

      // Ordina gli operatori in modo che quelli sponsorizzati siano primi
      return operators.sort((a, b) => {
        const isASponsored = this.isOperatorSponsored(a.id);
        const isBSponsored = this.isOperatorSponsored(b.id);

        if (isASponsored && !isBSponsored) {
          return -1;
        } else if (!isASponsored && isBSponsored) {
          return 1;
        } else {
          // Se entrambi sponsorizzati o entrambi non sponsorizzati, mantieni l'ordine originale
          return 0;
        }
      });
    },
  },
  methods: {

    /* generatore di specializzazioni */
    getOperatorSpecializations(operatorId) {
      return this.store.operator_specializations
        .filter(os => os.operator_id === operatorId)
        .map(os => ({
          id: os.specialization_id,
          specialization: this.store.specializations.find(s => s.id === os.specialization_id),
        }));
    },
    navigateToRicerca() {
      if (this.selectedSpecialization) {
        this.setSelectedSpecialization(this.selectedSpecialization);
        this.$router.push({ name: 'ricerca', query: { specialization: this.selectedSpecialization } });
      }
    },
    redirectToFilteredOperators() {
      if (this.selectedSpecialization) {
        const filteredOperators = this.filteredOperators.map(operator => operator.id);

        this.$router.push({
          name: 'ricerca',
          query: {
            specialization: this.selectedSpecialization,
            operators: filteredOperators.join(','),
          },
        });
      }
    },
    /* generatrici di sponzorizzate */
    isOperatorSponsored(operatorId) {
      const isSponsored = this.store.operator_sponsorships.some(sponsorship => sponsorship.operator_id === operatorId);
      console.log(`Operatore ${operatorId} sponsorizzato: ${isSponsored}`);
      return isSponsored;
    },
    activeSponsorships(operatorId) {
      const sponsorships = this.store.operator_sponsorships.filter(s => s.operator_id === operatorId && this.isntSponsorshipExpired(s));
      console.log(`Operatore ${operatorId} ha sponsorizzazioni attive: ${sponsorships.length > 0}`);
      return sponsorships;
    },
    isntSponsorshipExpired(sponsorship) {
      const currentDateTime = moment();
      const startDate = moment(sponsorship.start_date, 'YYYY-MM-DD HH:mm:ss');
      const endDate = moment(sponsorship.end_date, 'YYYY-MM-DD HH:mm:ss');
      const isExpired = currentDateTime.isBetween(startDate, endDate);
      console.log(`Sponsorizzazione ${sponsorship.id} è scaduta: ${!isExpired}`);
      return isExpired;
    },
  },
};
</script>

<template>
  <div>
    <div class="filterWrap"> <!-- Input select per selezionare una specializzazione -->
      <div id="welcome">
        <label for="selettore" class="bebas-neue-regular">Se hai voglia di un suono in particolare:</label>
        <select name="specializzazioni" id="selettore" v-model="selectedSpecialization"
          @change="redirectToFilteredOperators">
          <option :value="null" disabled>Seleziona una specializzazione</option>
          <option :value="dato.name" v-for="dato in store.specializations" :key="dato.id">
            {{ dato.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <!-- Carosello per gli operatori con sponsorizzazioni attive -->
  <div class="title">
    <h2 class="subtitle">Oppure dai un occhiata ai nostri talenti preferiti</h2>
  </div>

  <section class="wrapper2" ref="activeSponsorships">

    <div class="card-css2 sponsored" v-for="operator in operatorsWithActiveSponsorships" :key="operator.id">
      <img :src="'http://127.0.0.1:8000/storage/' + operator.file_path" alt="img" class="img-operatorS">
      <div class="content-box">
        <h3>{{ operator.name }}</h3>
        <h5>tariffa: {{ operator.engagement_price }} $</h5>

        <div class="stelline">
          <div v-if="operatorAverageRatings[operator.id]"
            v-for="index in Math.round((operatorAverageRatings[operator.id]))" :key="index">
            <i class="fa-solid fa-star"></i>
          </div>
        </div>

        <!-- Trova la corrispondente specializzazione per l'operatore -->
        <div v-for="operatorSpecialization in getOperatorSpecializations(operator.id)" :key="operatorSpecialization.id">
          <p ref="specializzazione_operatore">{{ operatorSpecialization.specialization.name }}</p>
        </div>

        <router-link :to="{
          name: 'detail', params: { id: operator.id }
        }">
          <button class="btn">Visualizza</button>
        </router-link>
      </div>
    </div>

  </section>



  <!-- Carosello per tutti gli operatori -->
  <section id="fakeBody" class="wrapper" ref="allOperators">
    <!-- Utilizza filteredOperators solo quando è stata selezionata una specializzazione -->
    <div v-for="operator in sortedOperators" :key="operator.id"
      :class="{ 'card-css': true, 'sponsored': isOperatorSponsored(operator.id) }"> <img
        :src="'http://127.0.0.1:8000/storage/' + operator.file_path" alt="img" class="img-operator">
      <div class="carouselBottom">
        <h3>{{ operator.name }}</h3>
        <h4>{{ operator.description }}</h4>
        <h5>{{ operator.engagement_price }}</h5>


        <div class="stelline">
          <div v-if="operatorAverageRatings[operator.id]"
            v-for="index in Math.round((operatorAverageRatings[operator.id]))" :key="index">
            <i class="fa-solid fa-star"></i>
          </div>
        </div>


        <router-link :to="{
          name: 'detail', params: { id: operator.id }
        }">
          <button class="btn">Visualizza</button>
        </router-link>

        <!-- Trova la corrispondente specializzazione per l'operatore -->
        <div class="specWrap">
          <div v-for="operatorSpecialization in getOperatorSpecializations(operator.id)" :key="operatorSpecialization.id">
            <p ref="specializzazione_operatore">{{ operatorSpecialization.specialization.name }}</p>
          </div>
        </div>
        <!-- Aggiunta per visualizzare l'ID dell'operatore se sponsorizzato -->
        <div v-if="isOperatorSponsored(operator.id)">
          <!-- <p v-for="sponsorship in store.operator_sponsorships.filter(s => s.operator_id === operator.id)"
          :key="sponsorship.id">
          Sponsorizzazione: {{ sponsorship.id }}, {{ sponsorship.start_date }}, {{ sponsorship.end_date }}
        </p> -->
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.card-css2.sponsored {
  width: 15%;
  aspect-ratio: 1;
  border-radius: 15px;
  margin: 9px 5%;
  text-align: center;

  height: 22rem;

  -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
  box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);

  background-color: gold;
  /* Colore dorato di sfondo */
  border: 2px solid gold;
  /* Colore dorato del bordo */

}

.card-css2.sponsored .img-operatorS {
  width: 100%;
  height: 60%;
  object-fit: cover;
  object-position: top;
  border-radius: 15px 15px 0 0;
}

.content-box {
  height: 40%;
}

.card-css2.sponsored .stelline {
  display: flex;
  justify-content: center;
  color: gold;
}

.card-css2.sponsored button.btn {
  background-color: gold;
  /* Colore del pulsante dorato */
  color: #000000 !important;

}


.card-css2.sponsored {
  width: calc(100% / 7);
  aspect-ratio: 1;
  border-radius: 15px;
  margin: 9px 5%;
  text-align: center;


  -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
  box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);

  background-color: rgba(255, 223, 0, 0.2);
  /* Colore dorato di sfondo */

}

.card-css.sponsored {
  position: relative;
  background-color: rgba(255, 223, 0, 0.2);
  border: 2px solid #ffd700;
  box-shadow: 0px 0px 20px 0px rgba(255, 223, 0, 0.5);
}

.card-css.sponsored .img-operatorS {
  width: 100%;
  height: 60%;
  object-fit: cover;
  object-position: top;
  border-radius: 15px 15px 0 0;
}


.card-css.sponsored .stelline {
  display: flex;
  justify-content: center;
  color: gold;
}

.card-css.sponsored button.btn {
  background-color: gold;
  /* Colore del pulsante dorato */
  color: #000000 !important;
}


.title {
  display: flex;
  justify-content: center;
  margin: 1em;
  color: white;
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
}

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
  font-size: 3rem;
  margin: 0.6em;
}

#selettore {
  width: 20%;
  height: 40%;
  border-radius: 3%;
}

s .subtitle {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: center;

  margin: 0.6em;
}

#welcome h1 {
  color: #FD129E;
}

#welcome h2 {
  color: #F6FB01;
}

#fakeBody {
  width: 100%;
  height: 65vh;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 2rem 0;
  flex-direction: column;
  scrollbar-color: rgba(0, 0, 0, 0.5) transparent;
}

.card-css {
  width: calc((100% / 4));
  border-radius: 15px;
  margin: 9px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background-color: rgba(255, 255, 255, 0.413);
}

.card-css h4 {
  height: 2.5rem;
  overflow: auto;
}

.specWrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.3rem;


}

#card-css h3 {
  border-bottom: 3px solid rgb(143, 141, 141);
}

.img-operator {
  height: 60%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 15px 15px 0 0;
}

.carouselBottom {
  text-align: center;
  height: 40%;
}


.wrapper2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;
}

.card-css2 {
  width: 15%;
  aspect-ratio: 1;
  border-radius: 15px;
  margin: 9px 5%;
  text-align: center;


  -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
  box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);


  background-color: rgba(255, 255, 255, 0.28);

}

.img-operatorS {
  width: 100%;
  height: 60%;
  object-fit: cover;
  object-position: top;
  border-radius: 10% 10% 0 0;

}

.stelline {
  display: flex;
  justify-content: center;
  color: violet;
}

.btn {
  display: inline-block;
  padding: 2%;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: #774caf;
  color: white;
  border: none;
  transition: background-color 0.3s;
  margin: 0.5rem;
}

.btn:hover {
  background-color: #45a049;
}

.btn:active {
  background-color: #3e8e41;
}

/*media query cards*/
@media only screen and (max-width: 768px) {
  .card-css {
    width: calc((100% / 2));
    background-color: rgb(165, 164, 164);
    border-radius: 15px;
    margin: 5% 2% 0% 0%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 79%;
    background-color: rgba(0, 0, 0, 0.121);
  }

  #fakeBody {
    width: 100vw;
    height: 70vh;
    overflow-y: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 2em;
    flex-direction: column;
  }

  .card-css2 {
    width: 23%;
    border-radius: 15px;
    margin: 9px 5%;
    text-align: center;
    padding: 0.2rem;

    -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);


    background-color: rgba(0, 0, 0, 0.121);

  }


  .card-css2.sponsored {
    width: calc(100% / 5);
    aspect-ratio: 1;
    border-radius: 15px;
    margin: 9px 5%;
    text-align: center;
    padding: 0.2rem;

    -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);

    background-color: rgba(255, 223, 0, 0.2);
    /* Colore dorato di sfondo */

  }


  .bebas-neue-regular {
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 2rem;
    margin: 0.6em;
  }

  .subtitle {
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: center;

    margin: 0.6em;
  }

  #selettore {
    width: 28%;
    height: 40%;
    border-radius: 3%;
  }
}

@media only screen and (max-width: 468px) {
  .card-css {
    width: 98%;
    background-color: rgba(38, 38, 38, 0.586);
    border-radius: 15px;
    margin: 5% auto;
    padding: 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: fit-content;
    background-color: rgba(0, 0, 0, 0.318);
  }


  .card-css2.sponsored {
    width: calc(100% / 3);
    aspect-ratio: 1;
    border-radius: 15px;
    margin: 9px 5%;
    text-align: center;
    padding: 0.2rem;

    -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);

    background-color: rgba(255, 223, 0, 0.2);
    /* Colore dorato di sfondo */

  }

  #fakeBody {
    width: 100vw;
    height: fit-content;


    display: block;


    margin-top: 2em;

  }

  .card-css2 {
    width: 40%;
    aspect-ratio: 1;
    border-radius: 15px;
    margin: 4px 5%;
    text-align: center;
    padding: 0.5rem;

    -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);


    background-color: rgba(0, 0, 0, 0.121);

  }

  #welcome {
    margin-top: 2em;
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    position: sticky;
    color: white;
    font-size: 1.2em;
  }

  .bebas-neue-regular {
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.4rem;
    margin: 0.6em;
  }

  .subtitle {
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: center;

    margin: 0.6em;
  }

  #selettore {
    width: 60%;
    height: 40%;
    border-radius: 3%;
    margin: 1em;
  }

}
</style>