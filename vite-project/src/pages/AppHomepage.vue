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
    }
  }
}
</script>

<template>
  <AppPresentation />
  <div id="welcome">
    <select name="" id="selettore">
      <option value="">cacca</option>
      <option value="">cacca</option>
    </select>
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