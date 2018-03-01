<template>
  <div class="content section">
    <div v-if="resto">
<h1 > {{resto.name}}</h1>
    <img :src="resto.photo">  
<h3>Dish Price</h3>
{{resto.dishPrice}}
  </div>
  </div>
 
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      resto: null
    };
  },
  created() {
    api.getResto(this.$route.params.id).then(resto => {
      this.resto = resto;
    });
  }
};
</script>
