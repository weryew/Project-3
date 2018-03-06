<template>

<div id="content" role="main"><section class="section">
  <div class="container" >

   
      <div  v-if="resto">
        <div align="center">
    <h2  class="courgette vert" >{{resto.name}}</h2>
    <!-- star rating -->
<div class="star-ratings-sprite"><span :style="`width:${resto.average}%`" class="star-ratings-sprite-rating"></span></div>
<div class="section">
<p>{{resto.url}}</p>

<br>
<img :src="resto.photo">
  </div>    

<hr>
<br>
<br>
<!-- Add a review -->
</div>
<div>
  <h5 class="courgette ">How much did you like this restaurant?</h5>
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
<!-- <div  v-if="resto.reviews">
<div v-for="(review,i) in resto.reviews" :key="i">
<review-card :comment="review.comment" :rating="review.value" ></review-card>
</div>
</div> -->
</div> 

</div>
</section>
</div>
</template>
  
<script>
import api from "../api";
import StarRating from "vue-star-rating";

export default {
  methods: {
    saveReview() {
      api
        .addReviewResto(this.$route.params.id, this.rating, this.comment)
        .then(console.log("reviews done"));
    }
  },
  data() {
    return {
      resto: null,
      dish: null,
      rating: null,
      comment: null
    };
  },
  created() {
    api.getResto(this.$route.params.id).then(resto => {
      this.resto = resto;
    });
  },
  components: {
    StarRating
  }
};
</script>
