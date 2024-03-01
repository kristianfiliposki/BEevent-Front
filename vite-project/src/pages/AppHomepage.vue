<script>

export default{
    name:"AppHomepage"
}
</script>

<template>
	<div id="welcome">
	  <h1>Ti diamo il benvenuto su Heavy Planning!</h1>
	  <h2>il nostro sito di gestione ed organizzazione di eventi!</h2>
	  <p>Dai un'occhiata ad i nostri artisti!</p>
	</div>
	<section id="fakeBody">
	  <div id="card-css" v-for="dato in store.operators">
		<h3>{{ dato.name }}</h3>
		<img src="" alt="img">
		<h4>{{ dato.description }}</h4>
		<h5>{{ dato.engagement_price }}</h5>
		<h5>{{ dato.phone }}</h5>
	  </div>
	</section>
  </template>
<style scoped>

#welcome{
  width: 100%;
  position: fixed;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
}
#welcome h1{
  color: #FD129E;
}
#welcome h2{
  color: #F6FB01;
}
#fakeBody{
  width: 100%;
  height: 70vh;
  overflow-y: auto;
  display:flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
#card-css{
  width: 26%;
  height:33%;
  background-color: rgb(165, 164, 164);
  border-radius: 20px;
  margin: 2% 2% 0% 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#card-css h3{
 border-bottom: 3px solid  rgb(143, 141, 141);
}
</style>