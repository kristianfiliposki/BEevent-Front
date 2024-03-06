<script>
import { store } from '../store';

export default {
    data() {
        return {
            store,
            filterName: '',
            filterMinPrice: null,
            filterMaxPrice: null,
            minPrice: 0, // Valore minimo prezzo
            maxPrice: 1000, // Valore massimo prezzo
        };
    },
    computed: {
        filteredOperators() {
            let operators = this.store.operators;

            if (this.filterName) {
                operators = operators.filter(operator => operator.name.toLowerCase().includes(this.filterName.toLowerCase()));
            }
            // Applica il filtro per il prezzo minimo solo se il valore è definito
            if (this.filterMinPrice !== null && this.filterMinPrice !== '') {
                operators = operators.filter(operator => parseFloat(operator.engagement_price) >= parseFloat(this.filterMinPrice));
            }
            // Applica il filtro per il prezzo massimo solo se il valore è definito
            if (this.filterMaxPrice !== null && this.filterMaxPrice !== '') {
                operators = operators.filter(operator => parseFloat(operator.engagement_price) <= parseFloat(this.filterMaxPrice));
            }
            return operators;
        },
        
    },
    methods:{
      redirectToOperatorView(operator) {
      // Utilizza il router di Vue.js per navigare alla vista dell'operatore
      this.$router.push({ name: 'operator-view', params: { operatorId: operator.id, operatorName: operator.name } });
    },
    },
};
</script>

<template>
    <div class="filterWrap">

        <div class="inputDiv">
            <h4>Nome:</h4>
            <input class="inputName" type="text" v-model="filterName" placeholder="Cerca per nome">
        </div>
        <div class="inputDiv">
            <h4>prezzo minimo</h4>

            <input class="inputNum" type="number" v-model.number="filterMinPrice" placeholder="Prezzo minimo"
                :min="minPrice" :max="maxPrice">
        </div>
        <div class="inputDiv">
            <h4>prezzo massimo</h4>

            <input class="inputNum" type="number" v-model.number="filterMaxPrice" placeholder="Prezzo massimo"
                :min="minPrice" :max="maxPrice">
        </div>
    </div>
    <section id="fakeBody" class="wrapper">
        <div id="card-css" v-for="dato in filteredOperators" :key="dato.id">
            <h3>{{ dato.name }}</h3>
            <img :src="'/public/img/' + dato.image" alt="img" class="img-operator">
            <h4>{{ dato.description }}</h4>
            <h5>{{ dato.engagement_price }}</h5>
            <h5>{{ dato.phone }}</h5>
        </div>
    </section>
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
    background-color: aqua;
    display: flex;
    align-items: center;
    justify-content: center;

}

.inputDiv {
    width: 15%;
    height: 3rem;

}

.inputNum {
    width: 50%;
    margin: 0.2rem auto;
    border-radius: 0.5rem;
}
</style>