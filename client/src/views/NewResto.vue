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
        <input type="file" class="form-control-file" ref="file" name="photo"  @change="processFile($event)" />  
  
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
import axios from "axios";
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
      },
      fullAddress: ""
    };
  },
  // mounted() {
  //   // To demonstrate functionality of exposed component functions
  //   // Here we make focus on the user input
  //   this.$refs.address.focus();
  // },
  methods: {
    processFile(event) {
      this.photo = this.$refs.file.files[0];
    },
    saveResto() {
      console.log("DEBUG this.photo", this.photo);

      let formData = new FormData();
      const address = {
        lat: this.lat,
        lng: this.lng
      };
      formData.append("photo", this.photo);
      formData.append("name", this.name);
      formData.append("url", this.url);
      formData.append("address[lat]", this.address.lat);
      formData.append("address[lng]", this.address.lng);
      api
        .addResto(formData)
        .then(resto => {
          this.$router.push(`/resto/${resto._id}/addDish`);
        })
        .catch(res => {
          console.log("FAILURE!!");
        });

      // axios.post("http://localhost:3000/api/restaurants", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   }
      // });

      // api
      //   .addResto({
      //     name: this.name,
      //     url: this.url,
      //     photo: this.photo,
      //     address: {
      //       lat: this.lat,
      //       lng: this.lng
      //     },
      //     fullAddress: this.fullAddress
      //   })
      //   .then(resto => {
      //     this.$router.push(`/resto/${resto._id}/addDish`);
      //   });
    },
    setPlace(place) {
      this.place = place;
      this.lat = place.geometry.viewport.b.b;
      this.lng = place.geometry.viewport.f.b;
      this.fullAddress = place.formatted_address;
    }
  },
  components: { VueGoogleAutocomplete }
};
</script>

 
  