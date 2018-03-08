<template>
  <section class="section container">
    <div align="center">
      <h2>Create a new Meetup</h2>
      <br>

      <b-card style="width:500px">

        <b-form>

          <b-form-group label="Title">
            <b-form-input type="text" v-model="title" required placeholder="Enter your Meetup title">
            </b-form-input>
          </b-form-group>


          <b-form-group label="Date">
            
              <div class="row">
                <div class="col-md-12">
                  <date-picker v-model="date" :config="config"></date-picker>
                </div>
              </div>
            


          </b-form-group>
          <b-button id="btn" @click="saveMeetup">Save Meetup</b-button>
        </b-form>
      </b-card>
    </div>
  </section>
</template>

<script>
import api from "../api";
import datePicker from "vue-bootstrap-datetimepicker";

import "eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css";
export default {
  data() {
    return {
      resto: null,
      title: null,
      date: new Date(),
      config: {
        format: "DD/MM/YYYY",
        useCurrent: false
      },
      created: new Date(),
      person: 1
    };
  },
  methods: {
    saveMeetup() {
      api
        .addMeetup(this.resto._id, {
          photo: this.resto.photo,
          title: this.title,
          address: this.resto.fullAddress,
          date: this.date,
          created: this.created,
          person: this.person,
          creator: {
            name: this.$root.user.name,
            creatorId: this.$root.user.id
          }
        })
        .then(res => {
          console.log("hiiii", res);
        });
    }
  },
  created() {
    api.getResto(this.$route.params.id).then(res => {
      this.resto = res;
    });
  },
  components: {
    datePicker
  }
};
</script>