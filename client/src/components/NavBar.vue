<template>   
<nav class="navbar container courgette">
  <div class="navbar-brand">

    <div
      class="navbar-burger burger"
      :class="{ 'is-active': isActive }"
      @click="isActive = !isActive"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div class="navbar-menu" :class="{ 'is-active': isActive }">

    <div class="navbar-start">
          <router-link class="navbar-item " to="/">
  Home
    </router-link>
          <router-link
        class="navbar-item" to="/meetups"
        
      >
        Meetups
      </router-link>
      <router-link
        class="navbar-item" to="/about"
      
      >
        About Us
      </router-link>
    </div>

    <div class="navbar-end" v-if="!$root.user">   
            <router-link
              class="navbar-item" to="/login"
              @click.native="isActive = false"
            >
              Login
            </router-link>
    
     
            <router-link
              class="navbar-item" to="/signup"
              @click.native="isActive = false"
            >
              Signup
            </router-link>
        </div>
       
     <div class="navbar-end " v-else> 
 <router-link to="/userpage"  class="navbar-item" >
       <span class="glyphicon glyphicon-user"></span>
        </router-link>
        <router-link to="/newResto" v-if="$root.user.role===`admin`"  class="navbar-item" >
   Admin
        </router-link>
<a  class="navbar-item" @click="logout">
              Logout
            </a>
        
        </div>
      </div>
   

</nav>
</template>


<script>
import api from "../api";
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    logout() {
      api.logout();
      this.$root.user = null;
      this.$router.push("/login");
    }
  }
};
</script>
<style>
.navbar-menu {
  background-color: #5d7d32;
}
.navbar-item {
  color: white;
  font-weight: bolder;
  font-size: 1.3em;
}
</style>
