<template>
  <div>
    <section>
    <form @submit.prevent="saveResto">
        <b-field label="Restaurant name">
            <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="url" >
            <b-input maxlength="30" v-model="url" required icon="account"></b-input>
        </b-field>

        <button class="button is-primary" >Save Restaurant</button>
    </form>
  </section>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      name: "",
      address: {
        lat: "",
        lng: ""
      },
      url: "",
      _dish: ""
    };
  },
  methods: {
    saveResto() {
      api
        .addResto({
          name: this.name,
          address: this.address,
          photo: this.photo,
          url: this.url,
          _dish: this._dish
        })
        .then(resto => {
          this.$router.push(`/resto/${resto._id}`);
        });
    }
  }
};
</script>

 
  