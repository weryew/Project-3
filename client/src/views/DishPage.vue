<template>
<div id="content" role="main"><section class="section">
  <div class="container" >
  <div align="center">
    <div v-if="dish">
<h2 class="courgette vert"> {{dish.name}}</h2>
<div class="section">
    <img :src="dish.photo">  
<div class="section">
<h4 class="courgette vert">Description</h4>
<br>
  <p>{{dish.description}}</p>
  </div>
  <br>
<router-link :to="`/${dish._id}/recipe`" class="button " id="btn">Find a recipe</router-link> 
<span> or </span>  
<router-link :to="`/${dish._id}/resto`" class="button" id="btn">Find a restaurant</router-link>
</div>
</div>

  </div>
  </div>
  </section>
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
