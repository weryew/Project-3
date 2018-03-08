<template>
   <div id="app">
   <section class="section">
     <figure align="center" class="container">
       <h1  style="color:#5d7d32">CoolAParis</h1>
        <!-- <img src="../public/logo.jpeg" alt="logo" >   -->
          </figure>
    <nav-bar/>
     <router-view/>
   </section>
   <footer class="footer">
     <div class="container">
       <div class="content has-text-centered">
         <p>
           <strong>© 2018 CoolAParis </strong> Created by Meriem BOURBIA </p>
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
<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #5d7d32;
$primary-invert: findColorInvert($primary);
$twitter: #c2d6ee;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

@import url("https://fonts.googleapis.com/css?family=Courgette");
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700");

h1,
h2,
h3,
h4,
h5 {
  font-family: "Courgette", sans-serif;
  color: #5d7d32;
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
h1 {
  font-size: 2.4em;
}
h2 {
  font-size: 2.1em;
}
h3 {
  font-size: 1.8em;
}
h4 {
  font-size: 1.6em;
}
h5 {
  font-size: 1.4em;
}
h6 {
  font-size: 1.2em;
}
p {
  font-size: 1.1em;
}
</style>


