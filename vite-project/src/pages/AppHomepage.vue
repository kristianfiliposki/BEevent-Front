<script>
import { store } from '../store';
import Appcard from '../components/Appcard.vue';
import AppPresentation from '../components/AppPresentation.vue';
export default {
  name: "AppHomepage",
  components: {
    Appcard,
    AppPresentation,
  },
  data() {
    return {
      store,
      filterSpec : ''
    }
  },
  computed: {
    filteredSpecs(){
    let operators = this.store.operators;
    if (this.filterSpec){
      operators = operators.filter(operator => operator.specializations.search().includes(this.filterSpec.search()));
      return operators;
    }
  }}}

</script>

<template>
  <AppPresentation />
  <div id="welcome">
     <input class="inputName" type="text" v-model="filterSpec" placeholder="Cerca per specializzazione">
  </div>
  <Appcard />
  <router-view></router-view>
</template>
<style scoped>
#welcome {
  margin-top: 2em;
  width: 100%;
  position: fixed;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
}

#welcome h1 {
  color: #FD129E;
}

#welcome h2 {
  color: #F6FB01;
}
</style>