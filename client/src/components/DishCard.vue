<template>
  <div >
    <router-link :to="`/${id}`">
    <h1>{{name}}</h1>
    </router-link>

 <figure class="image is-128x128">
    <img :src="photo">
  </figure>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    photo: String
  }
};
</script>

