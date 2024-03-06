<script>
import { store } from '../store';
import moment from 'moment';

export default {
    data() {
        return {
            store,
            filterName: '',
            filterMinPrice: null,
            filterMaxPrice: null,
            filterMinRating: null,
            minPrice: 0,
            maxPrice: 1000,
        };
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

            return operators;
        },
        operatorAverageRatings() {
            const operatorAverageRatings = {};
            this.store.operators.forEach(operator => {
                const operatorReviews = this.store.reviews.filter(review => review.operator_id === operator.id);
                if (operatorReviews.length > 0) {
                    const ratings = operatorReviews.map(review => review.vote_id); // Supponendo che vote_id contenga il voto della recensione
                    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
                    const average = sum / ratings.length || 0;
                    operatorAverageRatings[operator.id] = average.toFixed(2);
                } else {
                    operatorAverageRatings[operator.id] = 0; // Se non ci sono recensioni, imposta la media a 0
                }
            });
            console.log('Operator Average Ratings:', operatorAverageRatings);
            return operatorAverageRatings;
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

        </div>

        <section id="fakeBody" class="wrapper">
            <div id="card-css" v-for="operator in filteredOperators" :key="operator.id">
                <h3>{{ operator.name }}</h3>
                <img :src="'/public/img/' + operator.image" alt="img" class="img-operator">
                <h4>{{ operator.description }}</h4>
                <h5>{{ operator.engagement_price }}</h5>
                <h5>{{ operator.phone }}</h5>

                <p>Average Rating: {{ operatorAverageRatings[operator.id] }}</p>
            </div>
        </section>
    </div>
</template>
  
  
  
<style scoped>
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

#card-css {
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
</style>