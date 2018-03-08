<template>
<div >
  <b-card style="width:300px">
    <router-link :to="`/resto/${resto._id}`">
    <h2 class="router">{{resto.name}}</h2>
    </router-link>
   <figure >
    <img :src="resto.photo">
  </figure>
  </b-card>
  </div>
</template>


<script>
export default {
  props: {
    resto: Object
  }
};
</script>
