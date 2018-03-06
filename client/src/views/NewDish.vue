<template>
<section class="section container">
  <div  align="center" >
    <h2>Add Dishes to your Restaurant</h2>
    <br>
    
    <b-card style="width:500px">



      <b-form-group label="Dish name">
        <b-form-input type="text" v-model="name" required placeholder="Enter your dish name">
        </b-form-input>
      </b-form-group>                  
                      

      <b-form-group label="Photo">                
    <input type="file" class="form-control-file"  name="photo"  :v-model="photo">  
  
      </b-form-group>

    <b-form-group label="Description">
        <b-form-input type="text" v-model="description" required placeholder="Enter a description">
        </b-form-input>
      </b-form-group>  
<div v-if="firstDish">
      <b-button id="btn" @click="saveDish">Save Dish</b-button>
  </div>
  <div v-else>
     <b-button id="btn" @click="saveDish">Add Another Dish</b-button>
  </div>
    </b-card>
  </div>
  </section> 
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      firstDish: true,
      name: "",
      photo: "",
      description: ""
    };
  },
  methods: {
    saveDish() {
      this.firstDish = false;
      console.log("start");
      api
        .addDish({
          name: this.name,
          photo: this.photo,
          description: this.description
        })
        .then(res => {
          console.log(res);
          return api.addDishToResto(this.$route.params.id, res._id);
        })
        .then(resto => {
          console.log("toto", resto);
        })
        .catch(err => console.log(`hi`, err));
    }
  }
};
</script>
