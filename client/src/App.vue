<template>
   <div id="app">
   <section class="section">
    <nav-bar/>
     <router-view/>
   </section>
   
   <footer class="footer">
     <div class="container">
       <div class="content has-text-centered">
         <p>
           <strong>CoolAParis</strong> </p>
       </div>
     </div>
   </footer>
   </div>
 </template>

<script>
import NavBar from "./components/NavBar";
import api from "./api";
export default {
  created() {
    const user = api.loadUser();
    if (user) this.$root.user = user;
  },
  components: { NavBar }
};
</script>