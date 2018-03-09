<template>

<div id="content" role="main">
  <section class="section">
  <div class="container" >

   
      <div  v-if="resto">
        <div align="center">
    <h2  >{{resto.name}}</h2>
    <!-- star rating -->
<div class="star-ratings-sprite"><span :style="`width:${resto.average}%`" class="star-ratings-sprite-rating"></span></div>
<div class="section">
<!-- <p>{{resto.url}}</p> -->

<br>
<img :src="resto.photo">
  </div>    

<hr>
<br>
<br>
</div>

<!-- List of reviews -->
<div class="section">
<h4> Reviews </h4>
<br>
<div  v-if="reviews">
  <Comment-card :ratings="reviews"></comment-card>
</div> 
<!-- Add a review -->
<div class="section">
  <h5 >How much did you like this Restaurant?</h5>
  <br>
    <star-rating v-model="rating"  ></star-rating>
    <br>
    <br>
    <textarea style="background-color:#00000005" rows="5" class="input-block-level form-control" type="text" v-model="comment" placeholder="Add your comment here"></textarea>
    <br>
    <br>

    <div v-if="rating && comment">
      <button @click="saveReview" id="btn" >
        <span style="color:white" >save review</span>
        </button>
    </div>
</div>
</div>


<!-- meetups -->

<div v-if="meetups">
  <h5 >Meetups in {{resto.name}}  </h5>
  <div v-for="(meetup,i) in meetups" :key="i">
    <div id="movie-card-list" >
  <meet-up :meetup="meetup" > </meet-up>
  </div>
</div>
<div align="center">
<router-link :to="`/resto/${resto._id}/addMeetup`" class="button " id="btn">Create a Meetup</router-link> 
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
import MeetUp from "../components/MeetUp";
import CommentCard from "../components/CommentCard";
export default {
  data() {
    return {
      resto: null,
      meetups: null,
      rating: null,
      comment: null,
      reviews: null
    };
  },
  methods: {
    saveReview() {
      this.review = {
        value: this.rating,
        comment: this.comment,
        date: new Date(),
        name: this.$root.user.name,
        photo: this.$root.user.photo
      };
      api.addReviewResto(this.$route.params.id, this.review).then(res => {
        console.log(this.review);
      });
    }
  },
  created() {
    api.getResto(this.$route.params.id).then(resto => {
      this.resto = resto;
      console.log(this.resto._id);
    });
    api.getMeetupsResto(this.$route.params.id).then(res => {
      this.meetups = res;
    });

    api.getReviewsResto(this.$route.params.id).then(reviews => {
      this.reviews = reviews;
    });
  },
  components: {
    StarRating,
    MeetUp,
    CommentCard
  }
};
</script>
