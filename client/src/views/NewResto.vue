<template>
  <div>
    <section>
    <form @submit.prevent="saveResto">
        <b-field label="Restaurant name">
          <b-input v-model="name"></b-input>
        </b-field>
            
      <b-field label="Address" >
      <gmap-autocomplete
      placeholder="enter your address"
        @place_changed="setPlace" required>
      </gmap-autocomplete>
      </b-field> 
         <b-field label="Photo" >
        <b-input type="file" class="form-control-file"  name="photo" v-model="photo">   </b-input>  
      </b-field>
        <b-field label="Url" >
          <b-input maxlength="30" v-model="url" required ></b-input>
        </b-field>
   
     <b-field label="Dish" >
          <b-input  v-model="dish" required ></b-input>
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
      dishes: [],
      dish: "",
      name: "",
      url: "",
      photo: "",
      lat: "",
      lng: "",
      place: "",
      address: {
        lat: 0,
        lng: 0
      }
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
        .search(this.dish)
        .then(results => {
          if (results.length === 0) {
            console.log("empty");
            api.addDish(this.dish).then();
            return api.addResto({
              name: this.name,
              url: this.url,
              photo: this.photo,
              address: {
                lat: this.lat,
                lng: this.lng
              },
              dishes: this.dishes
            });
          } else {
            results.forEach(dish => {
              console.log(dish._id);
              this.dishes.push(dish._id);
            });

            return api.addResto({
              name: this.name,
              url: this.url,
              photo: this.photo,
              address: {
                lat: this.lat,
                lng: this.lng
              },
              dishes: this.dishes
            });
          }
        })
        .then(resto => {
          this.$router.push(`/resto/${resto._id}`);
        });
    },
    setPlace(place) {
      this.place = place;
      this.lat = place.geometry.viewport.b.b;
      this.lng = place.geometry.viewport.f.b;
    }
  },
  components: { VueGoogleAutocomplete }
};
</script>

 
  