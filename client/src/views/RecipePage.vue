<template>
  <div class="content section">
    <h1 v-if="dish">How to cook {{dish.name}}?</h1>

    <div v-if="recipe " >
<h2>Rating</h2>{{recipe.average}}
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

<!-- Add a review -->
<div>
  <h3>How much did you like this recipe?</h3>
    <star-rating v-model="rating"  ></star-rating>
    <br>
    <textarea type="text" v-model="comment" placeholder="Add your comment here"></textarea>
    <br>
    <div v-if="rating && comment">
      <button @click="saveReview">save review</button>
    </div>
</div>
<!-- List of reviews -->
<div  v-if="reviews">
<div v-for="(review,i) in reviews" :key="i">
<review-card :comment="review.comment" :rating="review.value" ></review-card>
</div>
</div> 
</div>
</div>
</template>

<script>
import api from "../api";
import StarRating from "vue-star-rating";
import ReviewCard from "../components/ReviewCard";
export default {
  data() {
    return {
      dish: null,
      recipe: null,
      rating: null,
      comment: null,
      reviews: null
    };
  },
  methods: {
    saveReview() {
      api.addReview(this.$route.params.id, this.rating, this.comment).then();
    }
  },
  created() {
    api.getDish(this.$route.params.id).then(dish => {
      this.dish = dish;
      return api.getRecipe(this.$route.params.id).then(recipe => {
        this.recipe = recipe;
        return api.getReviews(this.$route.params.id).then(reviews => {
          this.reviews = reviews;
        });
      });
    });
  },
  components: {
    StarRating,
    ReviewCard
  }
};
</script>
