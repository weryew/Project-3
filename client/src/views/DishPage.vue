<template>
  <div class="content section">
    <div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img :src="dish.photo" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4" v-if="dish">{{dish.name}} </p>
    
      </div>
    </div>

    <div class="content">
   {{dish.description}} 
    </div>
  </div>
</div>
<br>

<router-link :to="`/${dish._id}/recipe`" class="button is-primary">Find a recipe</router-link> 
<span> or </span>  
<router-link :to="`/${dish._id}/resto`" class="button is-primary">Find a restaurant</router-link>

  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      dish: ""
    };
  },
  created() {
    api.getDish(this.$route.params.id).then(dish => {
      this.dish = dish;
    });
  }
};
</script>
