<template>
  <div >
     <b-card style="width:300px">
    <router-link :to="`/${id}`"  align= "center" >
    <h2 class="router" >{{name}}</h2>
    </router-link>


    <img :src="photo">
     </b-card>
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

