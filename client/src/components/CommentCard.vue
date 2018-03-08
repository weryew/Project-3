<template>
  <div class="container bootstrap snippet">
    <div class="row">
      <div class="col-md-12">
        <h4 class="courgette vert"></h4>
        <div class="blog-comment">
          <br>
          <br>
          <ul class="comments">
            <li class="clearfix" v-for="(rating,index) in ratings" :key='index'>
              <!-- put the user photo instead of the avatar -->
              <!-- <figure class="image is-24x24">
              <img :src="$root.user.picture">
            </figure> -->
              <img src="https://bootdey.com/img/Content/user_1.jpg" class="avatar" alt="">
              <div class="post-comments">
                <p class="meta">
                  <span>{{ rating.date | moment(" MMMM Do YYYY") }} </span>
                  <a href="#">{{rating.name}}</a> says :
                  <i class="pull-right">
                    <a href="#">
                      <small>Reply</small>
                    </a>
                  </i>
                </p>

                <p>
                  {{rating.comment}}
                </p>
              </div>
            </li>
          </ul>
          <br>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      ratings: Array
    }
  };
</script>


<style>
  .snippet {
    background: #eee;
  }

  a {
    color: #82b440;
    text-decoration: none;
  }

  .blog-comment::before,
  .blog-comment::after,
  .blog-comment-form::before,
  .blog-comment-form::after {
    content: "";
    display: table;
    clear: both;
  }

  .blog-comment {
    padding-left: 15%;
    padding-right: 15%;
  }

  .blog-comment ul {
    list-style-type: none;
    padding: 0;
  }

  .blog-comment img {
    opacity: 1;
    filter: Alpha(opacity=100);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
  }

  .blog-comment img.avatar {
    position: relative;
    float: left;
    margin-left: 0;
    margin-top: 0;
    width: 65px;
    height: 65px;
  }

  .blog-comment .post-comments {
    border: 1px solid #eee;
    margin-bottom: 20px;
    margin-left: 85px;
    margin-right: 0px;
    padding: 10px 20px;
    position: relative;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    background: #fff;
    color: #6b6e80;
    position: relative;
  }

  .blog-comment .meta {
    font-size: 13px;
    color: #aaaaaa;
    padding-bottom: 8px;
    margin-bottom: 10px !important;
    border-bottom: 1px solid #eee;
  }

  .blog-comment ul.comments ul {
    list-style-type: none;
    padding: 0;
    margin-left: 85px;
  }

  .blog-comment-form {
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 40px;
  }

  .blog-comment h3,
  .blog-comment-form h3 {
    margin-bottom: 40px;
    font-size: 26px;
    line-height: 30px;
    font-weight: 800;
  }
</style>