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
            "http://www.la-cuisine-de-mes-racines.com/wp-content/uploads/2014/05/Photo-711.jpg"
        },
        {
          img:
            "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/18382012_162185234314223_3001169700148215808_n.jpg"
        },
        {
          img:
            "https://scontent.cdninstagram.com/t51.2885-15/s320x320/sh0.08/e35/26065881_144816039562264_5080520649844195328_n.jpg"
        },
        {
          img:
            "https://scontent-sea1-1.cdninstagram.com/vp/217c482f9341a586a531c001e8bdbc83/5B11A309/t51.2885-15/s480x480/e35/c0.120.958.958/17076442_232348673894984_3196029613293699072_n.jpg?ig_cache_key=MTQ2MDE4NDA2OTMzODA5MDczNA%3D%3D.2.c"
        },
        {
          img:
            "http://i.huffpost.com/gadgets/slideshows/516662/slide_516662_7270262_compressed.jpg"
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



