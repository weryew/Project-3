<template>
  <div>
    <h1> {{rating}}</h1>
    <h2>{{comment}}</h2>

  </div>
</template>
<script>
export default {
  props: {
    comment: String,
    rating: Number
  }
};
</script>
