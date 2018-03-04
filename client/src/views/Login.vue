
  <!-- <section> -->
    <!-- <b-form-notification type="is-danger" has-icon v-if="error">
      {{ error.error }}
    </b-form-notification>
    <form @submit.prevent="login">
      <b-form
        label="Username"
      >
          <b-form-input maxlength="30" v-model="username" required icon="account"></b-form-input>
      </b-form>

      <b-form label="Password">
          <b-form-input type="password"
            required
            v-model="password" 
            icon="lock"
            password-reveal>
          </b-form-input>
      </b-form>
      <button class="button is-primary">Login</button>
    </form>
  </section> -->

<template>
<section class="section container">
  <div  align="center" >
    <h2>Log In</h2>
    <br>
    <b-card style="width:500px">
          <p type="is-danger" has-icon v-if="error">
      {{ error.error }}
    </p>
    <b-form @submit.prevent="login" >
      <b-form-group id="exampleInputGroup1"
                    label="Username"
                    maxlength="30"
                    label-for="exampleInput1"
                 
                   >
        <b-form-input id="exampleInput1"
                      type="text"
                  icon="account"
                      v-model="username"
                      required
                      maxlength="30"
                      placeholder="Enter your username">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Password"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="password"
                      required
                      placeholder="Enter your password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" id="btn">Login</b-button>
    </b-form>
    </b-card>
  </div>
  </section>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      username: "",
      password: "",

      error: null
    };
  },
  methods: {
    login() {
      this.error = null;
      api
        .login(this.username, this.password)
        .then(user => {
          this.$root.user = user;
          this.$router.push("/");
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>