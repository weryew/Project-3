<template>
  <div class="section container" >
    <div v-if="restos">  
      <google-map :restos="restos" ></google-map>
        <div class="section">
      <div class="row">
          <div v-for="(resto,index) in restos" :key="index" class="col-md-4">
            <resto-card :resto="resto"></resto-card>
          </div>
  </div>
        </div>
    </div>
    <div >
  
    </div>
  </div>
</template>

<script>
import api from "../api";
import RestoCard from "../components/RestoCard";
import GoogleMap from "../components/GoogleMap";
export default {
  data() {
    return {
      restos: null
    };
  },
  created() {
    api.getRestos(this.$route.params.id).then(results => {
      this.restos = results;
    });
  },
  components: {
    RestoCard,
    GoogleMap
  }
};
</script>
