<script>
import { store } from '../store';
import moment from 'moment';

export default {
    props: ['specialization'], // Muovi la dichiarazione delle props qui
    data() {
        return {
            specializationsData: [],
            store,
            filterName: '',
            filterMinPrice: null,
            filterMaxPrice: null,
            filterMinRating: null,
            minPrice: 0,
            maxPrice: 1000,
            selectedSpecialization: this.specialization || null,
        };
    },
    created() {
        // Quando il componente viene creato, puoi applicare il filtro
        this.filterName = ''; // Puoi anche impostare i filtri in base alla tua logica
        this.filterMinPrice = null;
        this.filterMaxPrice = null;
        this.filterMinRating = null;
        // ... altre inizializzazioni
    },
    computed: {
        filteredOperators() {
            let operators = this.store.operators;

            if (this.filterName) {
                operators = operators.filter(operator => operator.name.toLowerCase().includes(this.filterName.toLowerCase()));
            }

            if (this.filterMinPrice !== null && this.filterMinPrice !== '') {
                operators = operators.filter(operator => parseFloat(operator.engagement_price) >= parseFloat(this.filterMinPrice));
            }

            if (this.filterMaxPrice !== null && this.filterMaxPrice !== '') {
                operators = operators.filter(operator => parseFloat(operator.engagement_price) <= parseFloat(this.filterMaxPrice));
            }

            if (this.filterMinRating !== null && this.filterMinRating !== '') {
                operators = operators.filter(operator => {
                    const averageRating = parseFloat(this.operatorAverageRatings[operator.id]);
                    return averageRating >= parseFloat(this.filterMinRating);
                });
            }


            if (this.specialization) {
                operators = operators.filter(operator => {
                    const operatorSpecializations = this.getOperatorSpecializations(operator.id);
                    return operatorSpecializations.some(os => os.specialization.name === this.specialization);
                });
            }

            return operators;
        },
        operatorAverageRatings() {
            const operatorAverageRatings = {};
            this.store.operators.forEach(operator => {
                const operatorReviews = this.store.reviews.filter(review => review.operator_id === operator.id);
                if (operatorReviews.length > 0) {
                    const ratings = operatorReviews.map(review => review.vote_id);
                    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
                    const average = sum / ratings.length || 0;
                    operatorAverageRatings[operator.id] = average.toFixed(2);
                } else {
                    operatorAverageRatings[operator.id] = 0;
                }
            });
            console.log('Operator Average Ratings:', operatorAverageRatings);
            return operatorAverageRatings;
        },
    },
    methods: {
        getOperatorSpecializations(operatorId) {
            // Fix the usage of getOperatorSpecializations
            return this.store.operator_specializations
                .filter(os => os.operator_id === operatorId)
                .map(os => ({
                    id: os.specialization_id,
                    specialization: this.store.specializations.find(s => s.id === os.specialization_id),
                }));
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
    },

};
</script>

<template>
    <div>
        <div class="filterWrap">
            <div class="inputDiv">
                <h4>Nome:</h4>
                <input class="inputName" type="text" v-model="filterName" placeholder="Cerca per nome">
            </div>
            <div class="inputDiv">
                <h4>Prezzo minimo</h4>
                <input class="inputNum" type="number" v-model.number="filterMinPrice" placeholder="Prezzo minimo"
                    :min="minPrice" :max="maxPrice">
            </div>
            <div class="inputDiv">
                <h4>Prezzo massimo</h4>
                <input class="inputNum" type="number" v-model.number="filterMaxPrice" placeholder="Prezzo massimo"
                    :min="minPrice" :max="maxPrice">
            </div>
            <div class="inputDiv">
                <h4>Voto medio: {{ filterMinRating }}</h4> <!-- Mostra il valore corrente del range -->
                <input class="inputRange" type="range" v-model.number="filterMinRating" min="0" max="5" step="0.1">
            </div>

            <!-- Input select pre-selezionato con la specializzazione ricevuta come prop -->
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
        <div class="card-css" v-for="operator in filteredOperators" :key="operator.id">
            <!-- ... Existing card content ... -->
            <h3>{{ operator.name }}</h3>
            <img :src="'/public/img/' + operator.filename" alt="img" class="img-operator">
            <h4>{{ operator.description }}</h4>
            <h5>tariffa: {{ operator.engagement_price }}</h5>
            <h3>Average Rating</h3>
            <div class="stelline">
                <div v-if="operatorAverageRatings[operator.id] " v-for="index in Math.round((operatorAverageRatings[operator.id]))" :key="index">
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>

            <router-link :to="{
                name: 'detail', params: { id: operator.id }
            }">
                <button class="btn">Visualizza</button>
            </router-link>
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




.img-operator {
    min-height: 60%;
    width: 100%;
    object-fit: cover;
    object-position: center;
}


.filterWrap {
    background-color: #090021;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inputDiv {
    width: 15%;
    height: 3rem;
}

.inputDiv h4 {
    color: #FD129E;
}

.inputNum {
    width: 50%;
    margin: 0.2rem auto;
    border-radius: 0.5rem;
}

.inputRange {
    width: 80%;
    height: 0.5rem;
    border-radius: 0.2rem;
}

/* Barra del range per WebKit (Chrome, Safari) */
.inputRange::-webkit-slider-runnable-track {
    background-color: #FD129E;
    height: 0.5rem;
    border-radius: 0.2rem;
    /* Colore di default della barra */
}

/* Barra del range per Gecko (Firefox) */
.inputRange::-moz-range-track {
    background-color: #FD129E;
    height: 0.5rem;
    border-radius: 0.2rem;
    /* Colore di default della barra */
}

.inputRange::-webkit-slider-thumb {
    transform: translateY(-25%);
}

/* Barra del range per Gecko (Firefox) */
.inputRange::-moz-range-thumb {
    transform: translateY(-25%);
}

.img-operator {

    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center;
}

.wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}

.card-css {
    width: 15%;
    aspect-ratio: 1 1;
    border-radius: 15px;
    margin: 1rem 2%;
    text-align: center;
    padding: 0.2rem;

    -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);


    background-color: rgba(0, 0, 0, 0.121);

}

.img-operatorS {

    width: 30%;
    object-fit: cover;
    object-position: center;
}
.stelline{
    display: flex;
    justify-content: center;
    color: violet;
    margin: 0.6em;
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
</style>
