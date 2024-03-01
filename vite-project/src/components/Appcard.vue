<script>
import { store } from '../store';
export default {
    data(){
        return{
            store,
        }
    },
}
</script>
<template>
    <section id="fakeBody" class="wrapper">
	    <div id="card-css" v-for="dato in store.operators">
		  <h3>{{ dato.name }}</h3>
		  <img src="/public/img/cantante-1.jpeg" alt="img" class="img-operator">
		  <h4>{{ dato.description }}</h4>
		  <h5>{{ dato.engagement_price }}</h5>
		  <h5>{{ dato.phone }}</h5>
	  </div>
	</section>
</template>
<style scoped>


#fakeBody{
  width: 100%;
  height: 60vh;
  overflow-x: auto;
  overflow-y: hidden;
  display:flex;
  align-items: center;
  justify-content: space-between;
}
#card-css{
  height: 30%;
  width: calc(100% / 4);
  background-color: rgb(165, 164, 164);
  border-radius: 15px;
  margin: 20% 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#card-css h3{
 border-bottom: 3px solid  rgb(143, 141, 141);
}

.img-operator{
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>