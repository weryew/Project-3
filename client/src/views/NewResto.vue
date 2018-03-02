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
      <b-field label="photo" >
        <b-input type="file" class="form-control-file"  name="photo" v-model="photo">   </b-input>  
      </b-field>
      <!-- find Address -->
      <b-field label="address" >
        <gmap-autocomplete ref="address"
            id="map"
            classname="form-control"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            country="sg"
        >
      </gmap-autocomplete>
      </b-field> 
      <button class="button is-primary" >Save Restaurant</button>
    </form>
    </section>
  </div>
</template>

<script>
import api from "../api";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  data() {
    return {
      name: "",
      url: "",
      photo: "",
      address: "",
      _dish: ""
    };
  },
  // mounted() {
  //   // To demonstrate functionality of exposed component functions
  //   // Here we make focus on the user input
  //   this.$refs.address.focus();
  // },
  methods: {
    saveResto() {
      api
        .addResto({
          name: this.name,
          url: this.url,
          photo: this.photo,
          address: this.address,
          _dish: this._dish
        })
        .then(resto => {
          this.$router.push(`/resto/${resto._id}`);
        });
    },
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData(addressData, placeResultData, id) {
      this.address = addressData;
    }
  },
  components: { VueGoogleAutocomplete }
};
</script>

 
  