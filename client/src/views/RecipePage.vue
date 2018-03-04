<template>
<div id="content" role="main"><section class="section">
  <div class="container" >
    
    <h2 v-if="dish" class="courgette vert" align="center">How to cook {{dish.name}}?</h2>

    <div v-if="recipe " >
      <div align="center">
        <div class="section container">
        <article class="col col-3">
        <button type="button" class="btn btn-default btn-circle"> <span class="vert glyphicon glyphicon-time"></span></button>
    <p> {{recipe.time}}</p>
        </article>
         <article class="col col-3 col-middle">
        <button type="button" class="btn btn-default btn-circle"><span class=" vert glyphicon glyphicon-cutlery"></span></button>
 <p> {{recipe.person}}</p>
 </article>
        <article class="col col-3">
        <button type="button" class="btn btn-default btn-circle"><span class=" vert glyphicon glyphicon-stats"></span></button>
    <p> {{recipe.easiness}}</p>    
    </article> 
      <div class="clearfix"></div>
        </div>
        <hr>
<div class="section">
<h4 class="courgette vert" >Ingredients</h4>
<ul>
  <li v-for="(ingredient,index) in recipe.ingredients" :key="index">
{{ingredient}}
  </li>
</ul>
</div>
<div class="section">
<h4 class="courgette vert">Tools</h4>
<ul>
  <li v-for="(tool,index) in recipe.tools" :key="index">
{{tool}}
  </li>
</ul>
</div>
<div class="section">
<h4 class="courgette vert">Directions</h4>
<ul>
  <li v-for="(direction,index) in recipe.directions" :key="index">
    <h5 class="courgette">- Step {{index+1}} -</h5>
 <p>{{direction}}</p>
  </li>
</ul>
</div>
</div>
<hr>
<br>
<br>
<!-- Add a review -->
<div>
  <h5 class="courgette ">How much did you like this recipe?</h5>
  <br>
    <star-rating v-model="rating"  ></star-rating>
    <br>
    <br>
    <textarea style="background-color:#00000005" rows="5" class="input-block-level form-control" type="text" v-model="comment" placeholder="Add your comment here"></textarea>
    <br>
    <br>

    <div v-if="rating && comment">
      <button @click="saveReview" id="btn" >
        <span style="color:white" class="courgette">save review</span>
        </button>
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
</section>
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
<style>
.btn-circle {
  width: 90px;
  height: 90px;
  text-align: center;
  padding: 6px 0;
  font-size: 24px;
  line-height: 1.428571429;
  border-radius: 45px;
  background-color: #e5e5e5;
}
.col {
  float: left;
}
.col-3 {
  width: 30%;
}
.col-middle {
  margin: 0% 10%;
}
.clearfix {
  clear: both;
}
</style>
