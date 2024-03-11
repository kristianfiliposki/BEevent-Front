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
        sortedOperators() {
            const operators = this.filteredOperators;

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
        isOperatorSponsored(operatorId) {
            if (this.store.sponsoredOperators && Array.isArray(this.store.sponsoredOperators)) {
                console.log('Sponsored Operators:', this.store.sponsoredOperators);
                return this.store.sponsoredOperators.includes(operatorId);
            } else {
                console.error('this.store.sponsoredOperators is not defined or is not an array.');
                console.log('this.store.sponsoredOperators:', this.store.sponsoredOperators);
                return false;
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
        <div v-for="operator in sortedOperators" :key="operator.id"
            :class="{ 'card-css': true, 'sponsored': isOperatorSponsored(operator.id) }">
            <!-- ... Existing card content ... -->
            <img :src="'http://127.0.0.1:8000/storage/' + operator.file_path" alt="img" class="img-operator">
            <h3>{{ operator.name }}</h3>
            <h4>{{ operator.description }}</h4>
            <h5>tariffa: {{ operator.engagement_price }}</h5>
            <h3>Average Rating</h3>
            <div class="stelline">
                <div v-for=" in  (Math.round((operatorAverageRatings[operator.id])))">
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>

            <router-link :to="{ name: 'detail', params: { id: operator.id } }">
                <button class="btn">Visualizza</button>
            </router-link>
        </div>
    </section>
</template>



<style scoped>
.sponsored {
    /* Aggiungi qui gli stili per rendere gli operatori sponsorizzati dorati */
    background-color: gold;
    /* Cambia questo con il tuo stile desiderato */
    border: 2px solid gold;
    /* Aggiunto per rendere il bordo dorato */
}

.card-css {
    /* Altri stili rimangono invariati */
    height: 40rem;
    width: calc(100% / 4);
    border-radius: 15px;
    margin: 1rem 2%;
    text-align: center;
    padding: 0.2rem;
    -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
    background-color: rgba(0, 0, 0, 0.121);
}


.card-css.sponsored .img-operatorS {
    width: 100%;
    height: 60%;
    object-fit: cover;
    object-position: top;
    border-radius: 10% 10% 0 0;
}


.card-css.sponsored .stelline {
    display: flex;
    justify-content: center;
    color: gold;
}

.card-css.sponsored button.btn {
    background-color: gold;
    /* Colore del pulsante dorato */
    color: #000000;
}


#welcome {
    margin: 0.4em 2em;
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: end;
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



.filterWrap {
    background-color: #090021;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inputName {
    width: 70%;
}

.inputDiv {
    width: 50%;
    height: 3rem;
    margin-left: 3%;
}

.inputDiv h4 {
    color: #FD129E;
    max-height: 2em;
}

h4 {
    font-size: 0.7em;
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



.wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    min-height: 58vh;
}

.card-css {
    height: 40rem;
    width: calc(100% / 4);
    border-radius: 15px;
    margin: 1rem 2%;
    text-align: center;
    padding: 0.2rem;
    -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
    background-color: rgba(0, 0, 0, 0.121);

}

.img-operator {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center;
    border-radius: 15px 15px 0 0;
}

.stelline {
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

@media screen and (max-width: 768px) {

    #welcome {
        margin: 0.4em 2em;
        width: 100%;
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: sticky;
        color: white;
        font-size: 1.2em;
    }

    .card-css {
        width: calc(100% / 3);
        height: 27rem;
        border-radius: 15px;
        margin: 1rem 2%;
        text-align: center;
        padding: 0.2rem;

        -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
        box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);


        background-color: rgba(0, 0, 0, 0.121);

    }

    .filterWrap {
        background-color: #090021;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .inputDiv[data-v-0b7fbc46] {
        width: calc(100% / 7);
        height: 3rem;
        margin: 4% 7%;
    }

    .inputNum {
        width: 100%;
        margin: 0.2rem auto;
        border-radius: 0.5rem;
    }

    .inputName {
        width: 100%;
    }

}

@media screen and (max-width: 468px) {

    #welcome {
        margin: 0.4em 2em;
        width: 100%;
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: sticky;
        color: white;
        font-size: 1.2em;
    }

    .card-css {
        width: calc(100% - 1%);
        border-radius: 15px;
        height: 40rem;
        margin: 2%;
        text-align: center;
        padding: 0.2rem;

        -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);
        box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 0px 5px 9px 6px rgba(0, 0, 0, 0.38);


        background-color: rgba(0, 0, 0, 0.121);

    }

    .filterWrap {
        background-color: #090021;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .inputDiv[data-v-0b7fbc46] {
        width: calc(100% / 7);
        height: 3rem;
        margin: 4% 7%;
    }

    .inputNum {
        width: 160%;
        margin: 0.2rem auto;
        border-radius: 0.5rem;
    }

    .inputName {
        width: 150%;
    }

    .inputRange {
    width: 120%;
    height: 0.5rem;
    border-radius: 0.2rem;
}
}
</style>
