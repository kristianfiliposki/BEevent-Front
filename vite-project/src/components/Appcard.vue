<script>
import { store } from '../store';
export default {
  data() {
    return {
      store,
      specialization:"",
    }
  },
  computed:{
    check(){
      
    },
  },
}
</script>
<template>
  <section id="fakeBody" class="wrapper">
    <div class="card-css" v-for="dato in store.operators">

      <h3>{{ dato.name }}</h3>
      <img :src="'/public/img/' + dato.image" alt="img" class="img-operator">
      <h4>{{ dato.description }}</h4>
      <h5>{{ dato.engagement_price }}</h5>
      <h5>{{ dato.phone }}</h5>

      <router-link :to="{
                name: 'detail', params: { id: dato.id }
            }">
                <p>dettaglio</p>
      </router-link>
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

.card-css {
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
</style>