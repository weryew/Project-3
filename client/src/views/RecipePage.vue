<template>
  <div class="content section">
    <h1 v-if="dish">How to cook {{dish.name}}?</h1>
    <div v-if="recipe">
<h2>Ingredients</h2>
<ul>
  <li v-for="(ingredient,index) in recipe.ingredients" :key="index">
{{ingredient}}
  </li>
</ul>
<h2>Tools</h2>
<ul>
  <li v-for="(tool,index) in recipe.tools" :key="index">
{{tool}}
  </li>
</ul>
<h2>Time to cook</h2>
<span>{{recipe.cookTime}}</span>
<h3>How much did you like this recipe?</h3>
<star-rating v-model="recipe.rating"  ></star-rating>

<button @click="saveRecipe">save </button>

  </div>
  </div>
</template>

<script>
import api from "../api";
import StarRating from "vue-star-rating";
export default {
  data() {
    return {
      dish: null,
      recipe: null
    };
  },
  methods: {
    saveRecipe() {
      api
        .addRating(this.$route.params.id, this.recipe.rating)
        .then(recipe => console.log(recipe.rating));
    }
  },
  created() {
    api.getDish(this.$route.params.id).then(dish => {
      this.dish = dish;
    }),
      api.getRecipe(this.$route.params.id).then(recipe => {
        this.recipe = recipe;
      });
  },
  components: {
    StarRating
  }
};
</script>
