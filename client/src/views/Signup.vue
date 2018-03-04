
  <!-- <section>
    <form @submit.prevent="signup">
        <div label="Name">
            <input v-model="name">
        </div>

        <div label="Username" :type="usernameError && 'is-danger'" :message="usernameError">
            <input maxlength="30" v-model="username" required icon="account">
        </div>

        <div label="Password">
            <input type="password"
              required
              v-model="password" 
              icon="lock"
                password-reveal>
           
        </div>
        <button class="button is-primary">Signup</button>
    </form>
  </section> -->

<template>
  <div  align="center">
    <h2>Sign Up</h2>
    <br>
    <b-card style="width:500px">
          <p type="is-danger" has-icon v-if="error">
      {{ error.error }}
    </p>
    <b-form @submit.prevent="signup" >
      <b-form-group id="exampleInputGroup1"
                    label="Name"
                    maxlength="30"
                    label-for="exampleInput1"
                 
                   >
        <b-form-input id="exampleInput1"
                      type="text"
                      v-model="name"
                      required
                      maxlength="30"
                      placeholder="Enter your name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Username" :type="usernameError && 'is-danger'" :message="usernameError"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      required
                      v-model="username" 
                      placeholder="Enter your username">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3"
                    label="Password"
                    label-for="exampleInput3">
        <b-form-input id="exampleInput3"
                      type="text"
                      v-model="password"
                      required
                      placeholder="Enter your password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Sign up</b-button>
    </b-form>
    </b-card>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",

      error: null
    };
  },
  methods: {
    signup() {
      this.error = null;
      api
        .signup({
          name: this.name,
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          this.error = err;
        });
    }
  },

  computed: {
    usernameError() {
      if (!this.error) return null;
      if (this.error.name === "UserExistsError") {
        return this.error.message;
      }
    }
  }
};
</script>