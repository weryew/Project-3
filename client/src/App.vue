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
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700");

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
.router {
  font-family: "Courgette", sans-serif;
  font-size: 1.2em;
  color: #5d7d32;
}
.star-ratings-sprite {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2605/star-rating-sprite.png")
    repeat-x;
  font-size: 0;
  height: 21px;
  line-height: 0;
  overflow: hidden;
  text-indent: -999em;
  width: 110px;
  margin: 0 auto;
}

.star-ratings-sprite-rating {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2605/star-rating-sprite.png")
    repeat-x;
  background-position: 0 100%;
  float: left;
  height: 21px;
  display: block;
}
</style>


