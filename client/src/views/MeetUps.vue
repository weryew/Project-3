<template>
  <div class="section container">
    <h1 align="center">Meetup List</h1>
     <div id="movie-card-list"  v-if="meetups">
    <div v-for="(meetup,i) in meetups" :key="i">
<meet-up :meetup="meetup"></meet-up>
    </div>
  </div>
  </div>
</template>

<script>
import api from "../api";
import MeetUp from "../components/MeetUp";

export default {
  data() {
    return {
      meetups: null
    };
  },

  created() {
    api.getMeetups().then(res => {
      this.meetups = res;
    });
  },
  components: {
    MeetUp
  }
};
</script>
