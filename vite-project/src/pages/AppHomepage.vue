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
  },
  methods:{
    selettore(){
      let selector=this.$ref.selettore;
      selector
    }
  },
}
</script>

<template>

  <Appcard />
  <router-view></router-view>
</template>
<style scoped>

</style>