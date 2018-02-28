<template>
  <div class="container">
    <div class="field has-addons">
  <div class="control">
    <input class="input" type="text" placeholder="Find a tunisian dish" v-model="query">
  </div>
  <div class="control">
    <a class="button is-info" @click="search">
      Search
    </a>
  </div>
</div>
<ul>
  <li v-for="(dish,index) in results" :key="index">
    <div>
  <dish-card :name="dish.name" :photo="dish.photo" :id="dish._id">
  </dish-card>
</div>
  </li>
</ul>
  </div>
</template>

<script>
import api from "../api";
import DishCard from "../components/DishCard";
export default {
  data() {
    return {
      query: "",
      results: []
    };
  },
  methods: {
    search() {
      api.search(this.query).then(results => {
        this.results = results;
      });
    }
  },
  components: {
    DishCard
  }
};
</script>



