<template>
  <div class="section container">
    <div class="section">
      <h3 align="center">Comments</h3>
      <br>
      <div v-if="recipeComments.length!==0">
        <div v-for="(recipe,i) in recipeComments" :key="i">
          <div class="card">
            <h6 class="card-header">Recipes you have commented</h6>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">{{recipe._dish.name}}</p>
              <br>
              <router-link :to="`/${recipe._dish._id}/recipe`" class="btn btn-primary" id="btn">Go back to the recipe</router-link>
            </div>
          </div>
          <br>
        </div>
      </div>
        <div v-else>
          <div class="card">
            <h6 class="card-header">Recipes you have commented</h6>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">You did not comment any recipes</p>
            </div>
          </div>     
        </div>
        <br>
         <div v-if="restoComments.length!==0">
        <div v-for="(resto,i) in restoComments" :key="i">
          <div class="card">
            <h6 class="card-header">Restaurants you have commented</h6>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">{{resto.name}}</p>
              <br>
              <router-link :to="`/resto/${resto._id}`" class="btn btn-primary" id="btn">Go back to the restaurant</router-link>
            </div>
          </div>
          <br>
        </div>
      </div>
        <div v-else>
          <div class="card">
            <h6 class="card-header">Restaurants you have commented</h6>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">You did not comment any restaurants</p>
            </div>
          </div>     
        </div>
      
    </div>
    <div class="section">
      <h3 align="center">Meetups</h3>
      <br>
      <div v-if="created.length!==0">
        <div v-for="(one,i) in created" :key="i">
          <div class="card">
            <h6 class="card-header">Meetups you have created</h6>
            <div class="card-body">
              <h5 class="card-title">{{one.title}}</h5>
              <p class="card-text">Created on
                <span> {{ one.created | moment(" MMMM Do YYYY") }} </span>
              </p>
            </div>
          </div>
          <br>
        </div>
      </div>
      <div v-else>
        <div class="card">
          <h6 class="card-header">Meetups you have created</h6>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text">You did not create any Meetups
            </p>
          </div>
        </div>
      </div>
      <br>
      <div v-if="joined.length!==0">
        <div v-for="(one,j) in joined" :key="10000+j">
          <div class="card">
            <h6 class="card-header">Meetups you have joined </h6>
            <div class="card-body">
              <h5 class="card-title">{{one.title}}</h5>
              <p class="card-text">Created on
                <span> {{ one.created | moment(" MMMM Do YYYY") }} by {{one.creator.name}} </span>
              </p>

            </div>
          </div>
          <br>
        </div>
      </div>
      <div v-else>

        <div class="card">
          <h6 class="card-header">Meetups you have joined </h6>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text">You did not join any Meetups
            </p>


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
      created: [],
      joined: [],
      recipeComments: [],
      restoComments: []
    };
  },
  created() {
    api.getCreated().then(res => {
      this.created = res;
      return api.getJoined().then(res => {
        this.joined = res;
      });
    });
    api.getCommentRecipe().then(res => {
      this.recipeComments = res;
    });
    api.getCommentResto().then(res => {
      this.restoComments = res;
    });
  }
};
</script>