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
        <label for="selettore" class="bebas-neue-regular">Seleziona il tuo specialista:</label>
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


  <!-- Carosello per tutti gli operatori -->
  <section id="fakeBody" class="wrapper" ref="allOperators">
    <!-- Utilizza filteredOperators solo quando è stata selezionata una specializzazione -->
    <div class="card-css" v-for="operator in (selectedSpecialization ? filteredOperators : store.operators)"
      :key="operator.id">
      <h3>{{ operator.name }}</h3>
      <img :src="'/public/img/' + operator.filename" alt="img" class="img-operator">
      <h4>{{ operator.description }}</h4>
      <h5>{{ operator.engagement_price }}</h5>
      <h5>{{ operator.phone }}</h5>
      <p>Average Rating: {{ operatorAverageRatings[operator.id] }}</p>


      <router-link :to="{
        name: 'detail', params: { id: operator.id }
      }">
        <p>dettaglio</p>
      </router-link>

      <!-- Trova la corrispondente specializzazione per l'operatore -->
      <div v-for="operatorSpecialization in getOperatorSpecializations(operator.id)" :key="operatorSpecialization.id">
        <p ref="specializzazione_operatore">{{ operatorSpecialization.specialization.name }}</p>
      </div>

      <!-- Aggiunta per visualizzare l'ID dell'operatore se sponsorizzato -->
      <div v-if="isOperatorSponsored(operator.id)">
        <p v-for="sponsorship in store.operator_sponsorships.filter(s => s.operator_id === operator.id)"
          :key="sponsorship.id">
          Sponsorizzazione: {{ sponsorship.id }}, {{ sponsorship.start_date }}, {{ sponsorship.end_date }}
        </p>
      </div>
    </div>
  </section>

  <!-- Carosello per gli operatori con sponsorizzazioni attive -->
  <h2>Operatori con sponsorizzazioni attive</h2>
  <section class="wrapper" ref="activeSponsorships">

    <div class="card-css2" v-for="operator in operatorsWithActiveSponsorships" :key="operator.id">
      <img :src="'/public/img/' + operator.filename" alt="img" class="img-operatorS">
      <div class="content-box">
        <h3>{{ operator.name }}</h3>
        <h4>{{ operator.description }}</h4>
        <h5>{{ operator.engagement_price }}</h5>
        <h5>{{ operator.phone }}</h5>
        <p>Average Rating: {{ operatorAverageRatings[operator.id] }}</p>

        <!-- Trova la corrispondente specializzazione per l'operatore -->
        <div v-for="operatorSpecialization in getOperatorSpecializations(operator.id)" :key="operatorSpecialization.id">
          <p ref="specializzazione_operatore">{{ operatorSpecialization.specialization.name }}</p>
        </div>
        <div v-if="isOperatorSponsored(operator.id)">
          <p v-for="sponsorship in activeSponsorships(operator.id)" :key="sponsorship.id" style="color: white;">
            Sponsorizzazione: {{ sponsorship.id }}, {{ sponsorship.start_date }}, {{ sponsorship.end_date }}
          </p>
        </div>
        <router-link :to="{
          name: 'detail', params: { id: operator.id }
        }">
          <p>dettaglio</p>
        </router-link>
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
  width: calc((100% / 4));
  background-color: rgb(165, 164, 164);
  border-radius: 15px;
  margin: 9px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 96%;
  background-color: rgba(0, 0, 0, 0.121);
}

#card-css h3 {
  border-bottom: 3px solid rgb(143, 141, 141);
}

.img-operator {
  min-height: 60%;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
}

.card-css2 {
  width: 30%;
  border-radius: 15px;
  margin: 9px;
  height: 20rem;
  background-color: rgba(0, 0, 0, 0.121);
  display: flex;
}

.img-operatorS {
  width: 50%;
  object-fit: cover;
  object-position: center;
  border-radius: 10%;
}
.content-box,.img-operatorS{
  margin: 1.1em;
}
</style>