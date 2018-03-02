<template>
  <div class="content section">
    <div v-if="resto">
      <h1 > {{resto.name}}</h1>
      <img :src="resto.photo">  
      <h2>{{resto.url}}</h2>
  


    </div>
    <div v-else>
      Loading...
    </div>
  </div>
 
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      resto: null,
      dish: null
    };
  },
  created() {
    api.getResto(this.$route.params.id).then(resto => {
      this.resto = resto;
    });
  }
};
</script>
