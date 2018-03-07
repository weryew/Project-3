<template>
  <div class="section container">
    <div class="section">
 <h4 align="center">Comments</h4>
    <div class="card">
      <h6 class="card-header">Recipes</h6>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary" id="btn">Go somewhere</a>
      </div>
    </div>
    <br>
        <div class="card">
      <h6 class="card-header">Restaurants</h6>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary" id="btn">Go somewhere</a>
      </div>
    </div>
    </div>
    <div class="section">
     <h4 align="center">Meetups</h4>
     <div v-for="(one,i) in created" :key="i">
        <div class="card" >
          <h6 class="card-header">Meetups you have created</h6>
          <div class="card-body">
            <h5 class="card-title">{{one.title}}</h5>
            <p class="card-text">Created on <span> {{ one.created | moment(" MMMM Do YYYY") }} </span></p>
        
          </div>
        </div>
      </div>
    <br>
    <div v-for="(one,j) in joined" :key="10000+j">
        <div class="card">
      <h6 class="card-header">Meetups you have joined </h6>
      <div class="card-body">
        <h5 class="card-title">{{one.title}}</h5>
        <p class="card-text">Created on <span> {{ one.created | moment(" MMMM Do YYYY") }} by {{one.creator.name}} </span></p>
      
      </div>
    </div>
    </div>
    </div>
  </div>
</template>
<script>
import api from "../api";
export default {
  data() {
    return {
      created: null,
      joined: null
    };
  },
  created() {
    api.getCreated().then(res => {
      this.created = res;
      return api.getJoined().then(res => {
        this.joined = res;
      });
    });
  }
};
</script>
