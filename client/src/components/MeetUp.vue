
<template>
  	<div class="movie-card" :style="{'background-image': `url(${meetup.photo})` }">
		<div class="color-overlay">
			<div class="movie-content section">
				<div class="movie-header">
					<h3 class="movie-title">{{meetup.title}}</h3>
				</div>
        <p class="movie-info">created on <span>{{ meetup.created| moment(" MMMM Do YYYY") }} </span></p>
        <br>
				<p class="movie-desc">
          <span class="	glyphicon glyphicon-map-marker"></span>
          {{meetup.address}}</p>
        <p class="movie-desc"><span class="	glyphicon glyphicon-time"></span>
        <span>{{ meetup.date| moment(" MMMM Do YYYY") }} </span>
          </p>
          <p class="movie-desc"><span class="	glyphicon glyphicon-user"></span>
          {{meetup.person}} person interested</p>
        <div align="center">
        	<button class="btn"  href="#" @click="addNew">Join Meetup</button>
          </div>
			</div>
		</div>
	</div>

	
</template>
<script>
import api from "../api";
export default {
  props: {
    meetup: Object
  },
  methods: {
    addNew() {
      api.addPerson(this.meetup._id).then(res => {
        console.log(this.meetup._id);
      });
    }
  }
};
</script>

<style>
/* body {
  background-color: #dce1e5;
  font-family: "Montserrat", helvetica, arial, sans-serif;
  font-size: 14px;
  color: #cfd6e1;
  line-height: 1.5;
  font-weight: 400;
  max-width: 100%;
  overflow-x: hidden;
} */

* {
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

/* a {
  text-decoration: none;
} */
.movie-desc {
  color: white;
}
.movie-card {
  background-size: contain;
  background-position: -40% 80%;
  background-repeat: no-repeat;
  width: 75%;
  max-width: 800px;
  height: 300px;
  display: block;
  margin: 8vh auto;
  border-radius: 8px;
  -webkit-box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.25);
}

.movie-card:nth-child(2) {
  background-position: -20% 80%;
}

.color-overlay {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  /* background: -webkit-gradient(linear, left top, right top, from(rgba(42, 159, 255, 0.2)), color-stop(60%, #212120), to(#212120)); */
  background: linear-gradient(
    to right,
    rgba(42, 159, 255, 0.2) 0%,
    #212120 60%,
    #212120 100%
  );
  background-blend-mode: multiply;
}

/* h1,
h2,
h3 {
  font-family: "Montserrat", helvetica, arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1;
  font-weight: 400;
} */

.movie-content {
  width: 43%;
  display: block;
  position: relative;
  float: right;
  padding-right: 0.5em;
}
.movie-content .movie-title {
  color: #ffffff;
  margin-bottom: 0.25em;
  opacity: 0.75;
}
.movie-content .movie-info {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8em;
  color: #2a9fff;
  line-height: 1;
  margin: 0;
  font-weight: 700;
  opacity: 0.5;
}
/* .movie-content .movie-header {
  margin-bottom: 2em;
} */
.movie-content .movie-desc {
  font-weight: 300;
  opacity: 0.84;
  /* margin-bottom: 2em; */
}

.btn {
  background-color: white;
  color: black;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #ffffff;
}

/* .btn::before {
  font-family: "Material Icons";
  content: "\e037";
  vertical-align: middle;
  font-size: 1.5em;
  padding-right: 0.5em;
} */

.btn-outline:hover {
  border-color: #2a9fff;
  color: #2a9fff;
  -webkit-box-shadow: 0px 1px 8px 0px rgba(245, 199, 0, 0.2);
  box-shadow: 0px 1px 8px 0px rgba(245, 199, 0, 0.2);
}

@media (max-width: 1000px) {
  .movie-content {
    width: 50%;
    max-width: 95%;
  }
}
@media (max-width: 800px) {
  .movie-card {
    width: 95%;
    max-width: 95%;
  }
}
@media (max-width: 600px) {
  .movie-card,
  .movie-card:nth-child(2),
  .movie-card:nth-child(3) {
    background-position: 50% 0%;
    background-size: cover;
    height: 400px;
  }

  .color-overlay {
    /* background: -webkit-gradient(linear, left top, left bottom, from(rgba(42, 159, 255, 0.2)), color-stop(60%, #212120), to(#212120)); */
    background: linear-gradient(
      to bottom,
      rgba(42, 159, 255, 0.2) 0%,
      #212120 60%,
      #212120 100%
    );
  }

  .movie-content {
    /* margin-top: 4.2em; */
    width: 90%;
  }

  .movie-share {
    display: block;
    width: 100%;
  }
}
</style>