<script>
import {store} from '../store';
import axios from "axios";

export default{
name: "AppDetail",
props:["operators"],
data (){
return {
    store,
    event :null
}
},
mounted(){
 this.event = this.store.operators.find(item => item.id == this.id);
console.log(this.event);
this.getEventId();},
methods : {
    getEventId(){
        let url = this.store.
    }
}




}



</script>

<template>


</template>


<style scoped>



</style>