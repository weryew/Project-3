<template>
   <div id="app">
   <section class="section">
     <figure align="center" class="container">
       <h1 class="courgette" style="color:#5d7d32">CoolAParis</h1>
        <!-- <img src="../public/logo.jpeg" alt="logo" >   -->
          </figure>
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
<style>
@import url("https://fonts.googleapis.com/css?family=Courgette");
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans");

.courgette {
  font-family: "Courgette", sans-serif;
}
#btn {
  background-color: #5d7d32;
  border-color: #5d7d32;
  color: white;
}
body {
  color: #51575b;
  font-family: "Josefin Sans", sans-serif;
}
.vert {
  color: #5d7d32;
}
</style>


