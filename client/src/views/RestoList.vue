<template>
  <div >
    <div v-if="restos">
      <ul>
        <li v-for="(resto,index) in restos" :key="index">
          <resto-card :resto="resto"></resto-card>
        </li>
      </ul>

</div>
  </div>
</template>

<script>
import api from "../api";
import RestoCard from "../components/RestoCard";
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
    RestoCard
  }
};
</script>
