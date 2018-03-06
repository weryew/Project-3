<template>
<section class="section container">
  <div  align="center" >
    <h2>Add a new Restaurant</h2>
    <br>
    
    <b-card style="width:500px">

    <b-form  >

      <b-form-group label="Restaurant name">
        <b-form-input type="text" v-model="name" required placeholder="Enter your restaurant name">
        </b-form-input>
      </b-form-group>                  
                      
    

      <b-form-group label="Address">    
 
      <gmap-autocomplete placeholder="enter your address" @place_changed="setPlace" required>
      </gmap-autocomplete>
   
      </b-form-group>

      <b-form-group label="Photo">                
    <input type="file" class="form-control-file"  name="photo"  :v-model="photo">  
  
      </b-form-group>
  
    <b-form-group label="URL">                
   <b-form-input maxlength="30" v-model="url" placeholder="Enter your restaurant" >
    </b-form-input>
      </b-form-group>

  

      <b-button id="btn" @click="saveResto">Save Restaurant</b-button>
    </b-form>
    </b-card>
  </div>
  </section> 
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
        .addResto({
          name: this.name,
          url: this.url,
          photo: this.photo,
          address: {
            lat: this.lat,
            lng: this.lng
          }
        })
        .then(resto => {
          this.$router.push(`/resto/${resto._id}/addDish`);
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

 
  