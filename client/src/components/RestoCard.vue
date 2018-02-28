<template>
<div >
    <router-link :to="`/resto/${resto._id}`">
    <h1>{{resto.name}}</h1>
    </router-link>

 <figure class="image is-128x128">
    <img :src="resto.photo">
  </figure>
  </div>
</template>


<script>
export default {
  props: {
    resto: Object
  }
};
</script>
