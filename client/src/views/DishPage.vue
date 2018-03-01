<template>
<div class="content section">
    <div v-if="dish">
<h1 > {{dish.name}}</h1>
    <img :src="dish.photo">  

<h1>{{dish.description}}</h1>
  
  <br>
<router-link :to="`/${dish._id}/recipe`" class="button is-primary">Find a recipe</router-link> 
<span> or </span>  
<router-link :to="`/${dish._id}/resto`" class="button is-primary">Find a restaurant</router-link>

</div>

  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      dish: null
    };
  },
  created() {
    api.getDish(this.$route.params.id).then(dish => {
      this.dish = dish;
    });
  }
};
</script>
