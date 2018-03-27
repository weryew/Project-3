<template>
  <div class="container">

    <!-- searchbar -->
   
      <div id="accordion_search_bar_container" @keyup.enter="search">
      <input type="search" 
         id="accordion_search_bar" 
         placeholder="Find a tunisian dish"
         v-model="query"/>
  </div>
    <!-- <div class="field has-addons">
  <div class="control">
    <input class="input" type="text" placeholder="Find a tunisian dish" v-model="query">
  </div>
  <div class="control">
    <a class="button is-info" @click="search">
      Search
    </a>
  </div>
</div> -->
<!-- carousel -->
<br><br>
<div id="example">
  <carousel-3d :autoplay="true" :autoplay-timeout="3000" :display="3" :space="600" :width="600" :height="500" :border="0">
    <slide v-for="(slide, i) in slides" :index="i" :key="i">
 
     <div class="title border"></div>
        <img :src="slide.img" >
      <!-- <p>You know, being a test pilot isn't always the healthiest business in the world.</p> -->     
    </slide>
  </carousel-3d>
</div>

<!-- dishes list -->
<div  class="row">
    <div v-for="(dish,index) in results" :key="index"  class="col-md-4">
  <dish-card :name="dish.name" :photo="dish.photo" :id="dish._id">
  </dish-card>
</div>


</div>
  </div>
</template>

<script>
import api from "../api";
import DishCard from "../components/DishCard";
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  data() {
    return {
      // dishes: [],
      query: "",
      results: [],
      slides: [
        {
          img:
            "http://www.fatafeat.com/storage/recipes/NMA_S01_SH02_COUSCOUS_WITH_LAMB_IMG_6903_684166.jpg"
        },
        {
          img:
            "http://www.fatafeat.com/storage/recipes/NMA_S01_SH13_BRICK_PARTY_ASSORTED_IMG_8372_949433.jpg"
        },
        {
          img:
            "http://www.fatafeat.com/storage/recipes/NMA_S01_SH02_TUNISIAN_BOUZA_WITH_HAZELNUTS_IMG_6934_292880.jpg"
        },
        {
          img:
            "http://www.fatafeat.com/storage/recipes/NMA_S01_SH03_MEAT_BALL_WITH_PICKLES_AND_OLIVE_TUN_IMG_6986_958432.jpg"
        },
        {
          img:
            "http://www.fatafeat.com/storage/recipes/NMA_S01_SH10_TAGINE_MALSOUKA_IMG_7469_339979.jpg"
        },

        {
          img:
            "http://www.fatafeat.com/storage/recipes/NMA_S01_SH06_TUNISIAN_SALAD_WITH_TUNA_IMG_7158_244546.jpg"
        }
      ]
    };
  },
  methods: {
    search() {
      api.search(this.query).then(results => {
        this.results = results;
      });
    }
  },
  // created() {
  //   api.getAllDishes().then(dishes => {
  //     this.dishes = dishes;
  //   });
  // },
  components: {
    DishCard,
    Carousel3d,
    Slide
  }
};
</script>

<style lang="scss">
.carousel-3d-container {
  .carousel-3d-slide {
    text-align: center;
    background-color: white;
    .title {
      font-size: 22px;
      color: black;
      margin-bottom: 0;
    }
  }
}
#page_container {
  margin-top: 15px;
  margin-bottom: 15px;
}

// search input
#accordion_search_bar_container {
  position: relative;
  &:after {
    content: "\e003";
    font-family: Glyphicons Halflings;
    width: 18px;
    height: 18px;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  #accordion_search_bar {
    display: block;
    margin: 10px auto;
    width: 100%;
    padding: 7px 10px;
    border: 1px solid #cacaca;
    border-radius: 25px;
    outline: 0;
  }
}
</style>



